import { Router } from 'express';
const router = Router();

const authMidleware = (req, res, next) => {
    if (true) {
        next();
    }
    res.statusCode = 401;
    next('Unauthorized.');
}

const roleMidleware = (req, res, next) => {
    if (true) {
        next();
    }
    res.statusCode = 400;
    next("Not have permission.");
}

router.get('/products', authMidleware, roleMidleware, (req, res) => {
    res.status(200).json({ data: 'router 1 product' });
})

router.get('/products/:id', authMidleware, roleMidleware, (req, res) => {
    res.json({ data: 'router 1 api ' + req.params.id });
})

module.exports = router;