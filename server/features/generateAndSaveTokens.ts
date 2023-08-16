const UserDto = require("../dtos/user.dto");
const tokenService = require("../service/token.service");

const generateAndSaveTokens = async (user) => {
    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user}
}

export default generateAndSaveTokens