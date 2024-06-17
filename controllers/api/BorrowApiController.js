const BorrowService = require("../../services/api/BorrowApiService");
const { secret } = require("../../config/token");
const jwt = require("jsonwebtoken");

const BorrowController = {
    async create(req, res) {
        try {
            console.dir(req.headers);
            console.log("Authorization header:", req.headers.authorization);

            const { id } = req.params; // 获取车辆ID
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                console.error("没有headers.authorization");
                return res.status(401).send({ error: "没有headers.authorization" });
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                console.error("请求格式问题");
                return res.status(401).send({ error: "检查参数值是不是没有加 （Bearer）" });
            }

            const token = parts[1];

            if (!token) {
                console.error("token的请求头");
                return res.status(401).send({ error: "token的问题" });
            }

            const user = jwt.verify(token, secret);
            const result = await BorrowService.create({ id: parseInt(id), userId: +user.userId });

            if (result.alreadyRented) {
                return res.status(400).send({ error: "您已经租赁该车辆了" });
            }

            res.send(id);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                console.error("令牌无效", error.message);
                return res.status(401).send({ error: "令牌没有用" });
            }
            console.error("别的服务报错了啊:", error);
            res.status(500).send({ error: "错了啊" });
        }
    },
    async update(req, res) {
        try {
            console.dir(req.headers);
            console.log("Authorization header:", req.headers.authorization);

            const { id } = req.params; // 获取车辆ID
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                console.error("没有headers.authorization");
                return res.status(401).send({ error: "没有headers.authorization" });
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                console.error("请求格式问题");
                return res.status(401).send({ error: "检查参数值是不是没有加 （Bearer）" });
            }

            const token = parts[1];

            if (!token) {
                console.error("token的请求头");
                return res.status(401).send({ error: "token的问题" });
            }

            const user = jwt.verify(token, secret);
            const updateData = req.body; // 获取需要更新的数据

            await BorrowService.update({ id: parseInt(id), userId: +user.userId, updateData });
            res.send({ message: "更新成功" });
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                console.error("令牌无效", error.message);
                return res.status(401).send({ error: "令牌没有用" });
            }
            console.error("别的服务报错了啊:", error);
            res.status(500).send({ error: "错了啊" });
        }
    },
    async findAll(req, res) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                console.error("没有headers.authorization");
                return res.status(401).send({ error: "没有headers.authorization" });
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                console.error("请求格式问题");
                return res.status(401).send({ error: "检查参数值是不是没有加 （Bearer）" });
            }

            const token = parts[1];

            if (!token) {
                console.error("token的请求头");
                return res.status(401).send({ error: "token的问题" });
            }

            const user = jwt.verify(token, secret);
            const userId = user.userId; // 从验证后的 token 中获取 userId

            const rentals = await BorrowService.findAllByUserId(userId);

            if (rentals.length === 0) {
                res.json({ message: '您尚且没有租赁信息' });
            } else {
                res.json(rentals);
            }
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                console.error("令牌无效", error.message);
                return res.status(401).send({ error: "令牌没有用" });
            }
            console.error('Error retrieving rentals:', error); // 打印错误日志
            res.status(500).json({ message: 'Error retrieving rentals' });
        }
    }
};

module.exports = BorrowController;