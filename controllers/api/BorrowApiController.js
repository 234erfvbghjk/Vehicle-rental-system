const BorrowService = require("../../services/api/BorrowApiService");
const {secret} = require("../../config/token");
const jwt = require("jsonwebtoken");

const BorrowController = {
    async create(req, res) {
        try {
            console.dir(req.headers);
            console.log("Authorization header:", req.headers.authorization);

            const {id} = req.params; // 获取车辆ID
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                console.error("没有headers.authorization");
                return res.status(401).send({error: "没有headers.authorization"});
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                console.error("请求格式问题");
                return res.status(401).send({error: "检查参数值是不是没有加 （Bearer）"});
            }

            const token = parts[1];

            if (!token) {
                console.error("token的请求头");
                return res.status(401).send({error: "token的问题"});
            }

            const user = jwt.verify(token, secret);
            await BorrowService.create({id: parseInt(id), userId: +user.userId});
            res.send(id);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                console.error("令牌无效", error.message);
                return res.status(401).send({error: "令牌没有用"});
            }
            console.error("别的服务报错了啊:", error);
            res.status(500).send({error: "错了啊"});
        }
    },
    async update(req, res) {
        try {
            console.dir(req.headers);
            console.log("Authorization header:", req.headers.authorization);

            const {id} = req.params; // 获取车辆ID
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                console.error("没有headers.authorization");
                return res.status(401).send({error: "没有headers.authorization"});
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                console.error("请求格式问题");
                return res.status(401).send({error: "检查参数值是不是没有加 （Bearer）"});
            }

            const token = parts[1];

            if (!token) {
                console.error("token的请求头");
                return res.status(401).send({error: "token的问题"});
            }

            const user = jwt.verify(token, secret);
            const updateData = req.body; // 获取需要更新的数据

            await BorrowService.update({id: parseInt(id), userId: +user.userId, updateData});
            res.send({message: "更新成功"});
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                console.error("令牌无效", error.message);
                return res.status(401).send({error: "令牌没有用"});
            }
            console.error("别的服务报错了啊:", error);
            res.status(500).send({error: "错了啊"});
        }
    }
};

module.exports = BorrowController;