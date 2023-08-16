module.exports = class UserDto {
    username;
    email;
    id;
    isActivatedMail;

    constructor(model) {
        this.username = model.username
        this.email = model.email
        this.id = model._id
        this.isActivatedMail = model.isActivatedMail
    }
}