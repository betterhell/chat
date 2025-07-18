import mongoose from "mongoose";
import generateAndSaveTokens from "../features/generateAndSaveTokens";

const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const Token = require("../models/token");
const User = require("../models/user");
const Avatar = require("../models/avatar");

const ApiError = require("../exeptions/api.error");

const mailService = require("./mail.service");
const tokenService = require("./token.service");

class UserService {
  async registration(username, email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) throw ApiError.BadRequest("User is already registered!");

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.VITE_API_URL}/activate/${activationLink}`
    );

    return await generateAndSaveTokens(user);
  }

  async getUser(username) {
    const user = await User.findOne({ username });
    if (!user) {
      throw ApiError.BadRequest("User not found.");
    }

    return user;
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest("Not correct activate link!");
    }
    user.isActivatedMail = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User does not exist or incorrect email.");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("User does not exist or incorrect password.");
    }

    user.isOnline = true;
    await user.save();
    return await generateAndSaveTokens(user);
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.Unauthorized();
    }

    const user = await User.findById(userData.id);
    return await generateAndSaveTokens(user);
  }

  async delete(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw ApiError.BadRequest("Not valid id.");
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    await Token.findOneAndDelete({ user: userId });

    return deletedUser;
  }

  async update(userId, userInfo) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw ApiError.BadRequest("Not valid id.");
    }

    await Avatar.findOneAndDelete({ userId });

    const updatedAvatar = await Avatar.create({
      userId,
      initialName: userInfo.avatar.initialName,
      name: userInfo.avatar.name,
    });
    await updatedAvatar.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { 
        username: userInfo.username,
        avatar: userInfo.avatar 
      }, 
      { new: true }
    );
    await updatedUser.save();

    return updatedUser;
  }

  async users() {
    const users = await User.find();
    if (!users) {
      throw ApiError.BadRequest("Users not found.");
    }

    return users;
  }

  async toFriend(friend, currentUserToken) {
    const newFriend = await this.getUser(friend.username);
    const userToken = await tokenService.findToken(currentUserToken);
    const user = await User.findById(userToken.user);

    if (user.friends.includes(newFriend._id)) {
      throw ApiError.BadRequest("User already in friends.");
    }

    user.friends.push(newFriend);
    newFriend.friends.push(user);

    await user.save();
    await newFriend.save();
    return newFriend;
  }
}

export default UserService;
