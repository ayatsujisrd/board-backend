import dayjs from "dayjs";
import { Request, Response } from "express";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { dataWrapper } from "../utils";


async function reset(req: Request, res: Response) {
  const { email, password, token } = req.body
  const [users, client, db] = DBService(dbName, 'users')
  const tokens = db.collection('tokens')

  try {
    const tokenResult = await tokens.findOne({ token })
    if (!tokenResult) {
      res.json(dataWrapper({ code: 0, msg: 'wrong token' }))
    }
    const createTime = tokenResult!.createTime
    if (!dayjs().subtract(1, 'hours').isBefore(dayjs(createTime))) {
      res.json(dataWrapper({ code: 0, msg: 'token expired' }))
      return
    }
    const result = await users.updateOne({
      email
    }, { $set: { password } })

    if (result) {
      res.json(dataWrapper({ code: 1, msg: 'reset password successfully' }))
    } else {
      res.json(dataWrapper({ code: 0, msg: 'failed to reset password' }))
    }
  } catch (e) {
    res.json(dataWrapper(undefined, 500, 'error'))

  } finally {
    client.close()
  }

}

export default reset