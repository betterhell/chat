module.exports = class MessageDto {
    message;
    id;

    constructor(model) {
        this.message = model.message
        this.id = model._id
    }
}