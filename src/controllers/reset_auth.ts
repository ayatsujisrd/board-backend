import { dataWrapper } from "../utils";
import { Request, Response } from 'express'
import { get, put } from "../utils/request";
import dotenv from 'dotenv'
import { adminAuth } from "../service/auth.service";
import DBService from "../service/db.service";
import dayjs from 'dayjs'
import { dbName } from "../configs/db.config";

dotenv.config()

const baseURL = 'http://' + process.env.AUTH_URL
const realm = process.env.REALM

async function reset(req: Request, res: Response) {
  const { email, password, token } = req.body
  const url = `${baseURL}/admin/realms/${realm}/users`
  const [tokens, client] = DBService(dbName, 'tokens')

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
    
    let adminToken = await adminAuth()
    let users = await get(url + `?email=${email}`, adminToken)
    if (!users.data.length) {
      res.json(dataWrapper({ code: 0, msg: 'failed to reset password' }))
      return
    }
    const [{ id }] = users.data
    let result = await put(`${url}/${id}`, {
      email,
      credentials: [{
        type: 'password',
        value: password
      }]
    }, adminToken)
    if (result.status === 204) {

      res.json(dataWrapper({ code: 1, msg: 'reset password successfully' }))
    } else {
      res.json(dataWrapper({ code: 0, msg: 'failed to reset password' }))
    }
    
  } catch (e) {
    console.log(e)
    res.json(dataWrapper(undefined, 500, 'error'))

  } finally {
    client.close()
  }

}

export default reset