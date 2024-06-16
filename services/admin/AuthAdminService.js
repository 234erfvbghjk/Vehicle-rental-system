const user = require('../../models/usersModel')

const AuthAdminService = {
  // 查看所有用户
  findAll:async ()=>{
    const row =await user.findAll()
    return row
  },

  // 注册
  async create(params) {
    const row = await user.create(params)
    return row
  },

  query: async (username) => {
   const result =  await user.findOne({where:{ username }})
   return result
  },
  async check(username) {
    const res = await user.findOne({
      where: {
        username
      }
    })
    return !res
  },

  // 登录
  async login(params) {
    const row = await user.findOne({
      where: {
        username: params.username,
      }
    })
    if (row) {
      if (row.username === params.username) {
        return row
      } else {
        return false
      }

    }
  },
//   修改
  update: async (id, data) => {
    const [updatedRowsCount] = await user.update(data, { where: { userId: id } });
    return updatedRowsCount > 0;
  },
  // 删除
  delete:async ({id})=>{
    const row = await user.destroy( {where: {userId: id}})
    return row
  }


}

module.exports = AuthAdminService