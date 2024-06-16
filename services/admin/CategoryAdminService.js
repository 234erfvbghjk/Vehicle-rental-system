const sequelize = require('../../config/database.js')

const Category = require('../../models/categoryModel')
const Car = require('../../models/CarModel')

const CategoryAdminService = {
    create: async (name) => {
        const row = await Category.create({name})
        return row
    },
    findAll: async () => {
        const row = await Category.findAll()
        return row
    },
    update: async ({id, name, sort}) => {
        const row = await Category.update({name, sort}, {where: {cid: id}})
        return row
    },
    // 这是删除分类表里面的所有数据但不删除该分类
    // delete: async ({ id }) => {
    //     const transaction = await sequelize.transaction();
    //     console.dir(sequelize.transaction());
    //     try {
    //         // 删除与分类相关的所有 CarModel 记录
    //         await Car.destroy({ where: { CId: id }, transaction });
    //
    //         // 软删除分类记录
    //         const row = await Category.update(
    //             { is_deleted: true },
    //             { where: { cid: id }, transaction }
    //         );
    //         await transaction.commit();
    //         return row;
    //     } catch (error) {
    //         await transaction.rollback();
    //         throw error;
    //     }
    // }
    //     这是删除分类以及该分类的所有数据
    delete: async ({ id }) => {
        const transaction = await sequelize.transaction();
        try {
            // 删除与分类相关的所有 Car 记录
            await Car.destroy({ where: { cid: id }, transaction });

            // 删除分类记录
            const row = await Category.destroy(
                { where: { cid: id }, transaction }
            );

            await transaction.commit();
            return row;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
module.exports = CategoryAdminService
