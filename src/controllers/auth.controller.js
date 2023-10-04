import UserModel from "../models/user.model.js";

const signIn = async (req, res, next) => {
    const deviceId = req.body.deviceId;
    if (!deviceId) {
        return next(400);
    }
    try {
        const users = await UserModel.findByDeviceId(deviceId);
        if (!users || users.length < 1) {
            return res.status(400).json({
                statusCode: 400,
                message: 'User not found.',
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: 'Sign in successful.',
            data: UserModel.response(users[0]),
        })
    } catch (err) {
        console.error('Error while signing in', err.stack);
        next(err);
    }
}

const signUp = async (req, res, next) => {
    const { name, image, deviceId } = req.body;
    if (!name || name.trim() == '' || !deviceId || deviceId.trim() == '') {
        next(400);
    }
    try {
        var users = await UserModel.findByDeviceId(deviceId);
        if (users && users.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'The name or device id is exsisted.',
            });
        } else {
            users = await UserModel.findByName(name);
            if (users && users.length > 0) {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'The name or device id is exsisted.',
                });
            }
        }
        const userModel = new UserModel(name, image, deviceId);
        await userModel.create();
        users = await UserModel.findByDeviceId(deviceId);
        return res.status(201).json({
            statusCode: 201,
            message: 'Sign up successful.',
            data: UserModel.response(users[0]),
        });
    } catch (err) {
        console.error('Error while signing up', err.message);
        next(err);
    }
}

export {
    signIn,
    signUp
}