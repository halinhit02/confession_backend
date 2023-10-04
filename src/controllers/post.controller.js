import PostModel from '../models/post.model.js';
import UserModel from '../models/user.model.js';

const createPost = async (req, res, next) => {
    const { authorId, content } = req.body;
    if (!authorId || isNaN(authorId) || !content || content.trim() == '') {
        return next(400);
    }
    try {
        const author = await UserModel.findById(authorId);
        if (!author || author.length < 1) {
            return res.status(400).json({
                statusCode: 400,
                message: "Author not found.",
            });
        }
        const postModel = new PostModel(authorId, content);
        const result = await postModel.create();
        if (result) {
            const data = await PostModel.getById(result.insertId);
            return res.status(201).json({
                statusCode: 201,
                message: "Create new post successful.",
                data: PostModel.respose(data[0]),
            });
        }
        return res.status(201).json({
            statusCode: 201,
            message: "Create new post successful."
        });
    } catch (err) {
        console.log('Error while creating new post.', err.message);
        next(err);
    }
}

const getPostById = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        next(400);
    }
    try {
        const post = await PostModel.getById(id);
        if (!post || post.length < 1) {
            return res.status(200).json({
                statusCode: 200,
                message: "Post not exists.",
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Successfully retrieved the post.",
            data: post[0],
        });
        return
    } catch (err) {
        console.log('Error while getting post by id.', err.message);
        next(err);
    }
}

const deletePost = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        next(400);
    }
    try {
        const post = await PostModel.getById(id);
        if (!post || post.length < 1) {
            return res.status(400).json({
                statusCode: 400,
                message: "Post not exists.",
            });
        }
        await PostModel.delete(id);
        return res.status(200).json({
            statusCode: 200,
            message: "Delete post successful.",
        });
    } catch (err) {
        console.log('Error while deleting the post.', err.message)
        next(err);
    }
}

export {
    createPost,
    getPostById,
    deletePost,
}