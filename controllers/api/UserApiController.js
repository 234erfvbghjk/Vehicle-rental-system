const UserService = require("../../services/api/UserApiService");
const {secret, expiresIn} = require("../../config/token");
const jwt = require("jsonwebtoken");

const UserController = {
    // async login(req, res) {
    //     const {username, password} = req.body;
    //     if (!username && !password) {
    //         res.json({code: -1, msg: "请输入完整的信息"});
    //     }
    //     const row = await UserService.findOne(username);
    //     // tom == tom1;
    //     if (!(password == row.password)) {
    //         res.json({
    //             code: -1,
    //             msg: "密码错误",
    //         });
    //     }
    //     if (!(username == row.username)) {
    //         res.json({
    //             code: -1,
    //             msg: "密码错误",
    //         });
    //     }
    //     // token
    //     const userinfo = {userId: row.userId, username, role: row.role};
    //     const token = jwt.sign(userinfo, secret, {expiresIn});
    //
    //     res.json({code: 1, token});
    // },
    async login(req, res) {
        const { username, password } = req.body;

        // 检查用户名和密码是否为空
        if (!username || !password) {
            return res.json({ code: -1, msg: "请输入完整的信息" });
        }

        // 查找用户
        const row = await UserService.findOne(username);

        // 检查用户是否存在
        if (!row) {
            return res.json({ code: -1, msg: "用户不存在" });
        }

        // 检查密码是否正确
        if (password !== row.password) {
            return res.json({ code: -1, msg: "密码错误" });
        }

        // 生成 token
        const userinfo = { userId: row.userId, username, role: row.role };
        const token = jwt.sign(userinfo, secret, { expiresIn });

        // 返回成功响应
        return res.json({ code: 1, token });
    },
    async register(req, res) {
        const {username, password} = req.body;
        if (!username && !password) {
            res.json({code: -1, msg: "请输入完整的信息"});
        }
        const result = await UserService.create(req.body);
        if (!result) {
            res.json({code: -1, msg: "注册失败"});
        }
        res.json({code: 1, msg: "注册成功"});
    },
};
module.exports = UserController;
