import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
const router = express.Router();

const authRouter = (app) => {
    router.post('/sign-in', signIn);
    router.post('/sign-up', signUp);

    app.use('/api/v1', router);
}

export default authRouter;