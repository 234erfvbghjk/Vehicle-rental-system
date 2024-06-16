const Borrow = require("../../models/borrowModel");

const BorrowService = {
    async create({id, userId}) {
        return await Borrow.create({CarId: id, userId});
    },
    async update({id, userId, updateData}) {
        return await Borrow.update(updateData, {
            where: {
                CarId: id,
                userId: userId
            }
        });
    }
};

module.exports = BorrowService;
