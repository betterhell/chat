import {Router} from "express";
import {body} from "express-validator";

const authMiddleware = require("../middlewares/auth.middleware")

const router = Router()
const {
    createMessage,
    deleteMessage,
    updateMessage,
    getAllMessage,
} = require("../controllers/messageController")

router.get('/messages', getAllMessage)
router.post('/message', authMiddleware, createMessage)
router.delete('/message/:id', deleteMessage)
router.patch('/message/:id', updateMessage)

module.exports = router