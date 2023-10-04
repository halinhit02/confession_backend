import UserModel from '../models/user.model.js';

const getUsers = async (req, res, next) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = -1;
    }
    try {
        const users = await UserModel.find(limit);
        return res.status(200).json({
            statusCode: 200,
            message: 'Successfully retrieved all the users.',
            data: UserModel.response(users),
        });
    } catch (err) {
        console.error('Error while getting users', err.message);
        next(err);
    }
}

const getUserById = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return next(400);
    }
    try {
        const users = await UserModel.findById(id);
        if (!users || users.length < 1) {
            return res.status(200).json({
                statusCode: 200,
                message: 'User not found.',
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: 'Successfully retrieved the user.',
            data: UserModel.response(users),
        });
    } catch (err) {
        console.error('Error while getting user by userId', err.message);
        next(err);
    }
}

const getUserByDeviceId = async (req, res, next) => {
    const { deviceId } = req.body;
    if (!deviceId) {
        return next(400);
    }
    try {
        const users = await UserModel.findByDeviceId(deviceId);
        if (!users || users.length < 1) {
            return res.status(200).json({
                statusCode: 200,
                message: 'User not found.'
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Successfully retrieved the user.",
            data: UserModel.response(users),
        });

    } catch (err) {
        console.error('Error while getting user by deviceId', err.message);
        next(err);
    }

}

export {
    getUsers,
    getUserById,
    getUserByDeviceId
}