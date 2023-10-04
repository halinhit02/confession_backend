import express from 'express';
import 'dotenv/config.js';
import bodyParser from 'body-parser';

//router
import userRouter from './src/routers/user.routers.js';
import authRouter from './src/routers/auth.router.js';
import postRouter from './src/routers/post.router.js';

//middleware
import appMiddleware from './src/middlewares/app.middleware.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

authRouter(app);
userRouter(app);
postRouter(app);

app.use(appMiddleware);


app.listen(port, () => {

});