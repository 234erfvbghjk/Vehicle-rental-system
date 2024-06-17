
const Borrow = require("../../models/borrowModel");

const BorrowService = {
    async create({ id, userId }) {
        const existingBorrow = await Borrow.findOne({ where: { CarId: id, userId } });

        if (existingBorrow) {
            return { alreadyRented: true };
        }

        await Borrow.create({ CarId: id, userId });
        return { alreadyRented: false };
    },
    async update({ id, userId, updateData }) {
        return await Borrow.update(updateData, {
            where: {
                CarId: id,
                userId: userId
            }
        });
    },
    async findAllByUserId(userId) {
        try {
            const rentals = await Borrow.findAll({ where: { userId } });
            return rentals;
        } catch (error) {
            console.error('Error finding rentals by userId:', error); // 打印错误日志
            throw new Error('Error finding rentals by userId');
        }
    }
};

module.exports = BorrowService;
