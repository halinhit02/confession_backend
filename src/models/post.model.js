import { query } from '../../config/database.js';

class PostModel {
    constructor(authorId, content) {
        this._authorId = authorId,
            this._content = content;
    }

    get authorId() {
        return this._authorId;
    }

    get content() {
        return this._content;
    }


    async create() {
        const sql = 'INSERT INTO post (authorId, content) VALUES (?, ?)';
        const res = await query(sql, [this.authorId, this.content]);
        return res;
    }

    static async getById(id) {
        const sql = 'SELECT * FROM post WHERE id = ? AND published = 1 LIMIT 0,1';
        const res = await query(sql, [id]);
        return res;
    }

    static async delete(id) {
        const sql = 'UPDATE post SET published = 0 WHERE id = ? AND published = 1';
        await query(sql, [id]);
    }

    static respose(data) {
        if (Array.isArray(data)) {
            return data.map((value,) => {
                return {
                    id: value.id,
                    authorId: value.authorId,
                    content: value.content,
                    createdAt: value.createdAt,
                    publishedAt: value.publishedAt,
                };
            })
        }
        return {
            id: data.id,
            authorId: data.authorId,
            content: data.content,
            createdAt: data.createdAt,
            publishedAt: data.publishedAt,
        }
    }
}

export default PostModel;