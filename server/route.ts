import {Router} from "express"
import {Request, Response} from "express";

const router = Router();

export default router.get("/", (req: Request, res: Response) => {
    res.send("Hello worssld!")
})
