import { query } from '../../config/database.js'

class UserModel {
    constructor(name, image, deviceId) {
        this._name = name;
        this._image = image;
        //this._intro = intro;
        //this._profile = profile;
        //this._phone = phone;
        //this._email = email;
        //this._passwordHash = passwordHash;
        this._deviceId = deviceId;
        //this._isDeleted = isDeleted;
        //this._isBlocked = isBlocked;
        //this._registedAt = registedAt;
        //this._deleteAt = deleteAt;
        //this._lastLogin = lastLogin;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (!name) throw new Error('Invalid name value.');
        name = name.trim();
        if (name === '') throw new Error('Invalid name value.');
        this._name = name;
    }

    get image() {
        return this._image;
    }

    set image(image) {
        this._image = image;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(deviceId) {
        if (!deviceId) throw new Error('Invalid device id value.');
        deviceId = deviceId.trim();
        if (deviceId === '') throw new Error('Invalid device id value.');
        this._deviceId = deviceId;
    }

    async create() {
        const sql = 'INSERT INTO user (name, image, deviceId) VALUES (?, ?, ?)';
        const res = await query(sql, [this.name, this.image, this.deviceId]);
        return res;
    }

    static async find(limit = 0) {
        var sql = 'SELECT * FROM user';
        if (limit > 0) {
            sql += ' LIMIT ' + limit;
        }
        const res = await query(sql);
        return res;
    }

    static async findByDeviceId(deviceId) {
        const sql = 'SELECT * FROM user WHERE deviceId = ?';
        const res = await query(sql, [deviceId]);
        return res;
    }

    static async findById(id) {
        const sql = 'SELECT * FROM user WHERE id = ?';
        const res = await query(sql, [id]);
        return res;
    }

    static async findByName(name) {
        const sql = 'SELECT * FROM user WHERE name = ?';
        const res = await query(sql, [name]);
        return res;
    }

    static async findByIdAndDelete(id) {
        const sql = 'UPDATE user SET deleted = true WHERE id = ?';
        await query(sql, [id]);
    }

    static response(data) {
        if (data instanceof Array) {
            return data.map((value,) => {
                return {
                    "id": value.id,
                    "name": value.name,
                    "image": value.image,
                    "intro": value.intro,
                    "profile": value.profile,
                    "phone": value.phone,
                    "email": value.email,
                    "registedAt": value.registedAt,
                };
            })
        }
        return {
            "id": data.id,
            "name": data.name,
            "image": data.image,
            "intro": data.intro,
            "profile": data.profile,
            "phone": data.phone,
            "email": data.email,
            "registedAt": data.registedAt,
        };
    }
}

export default UserModel;