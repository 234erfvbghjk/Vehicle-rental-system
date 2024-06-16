const Borrow = require('../../models/borrowModel')
const User = require('../../models/usersModel')
const Car = require('../../models/CarModel')

const BorrowAdminService = {
    async findAll() {
        return await Borrow.findAll({
            include: [{ model: User }, { model: Car }],
        });
    },
    async update(id) {
        try {
            const result = await Borrow.update({ status: 1 }, { where: { id } });
            return result;
        } catch (error) {
            console.error("更新失败:", error);
            throw error;
        }
    },
    async delete(id) {
        return await Borrow.destroy({ where: { id } });
    },
};

module.exports=BorrowAdminService