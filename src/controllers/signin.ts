import { Request, Response } from "express"
import { dbName } from "../configs/db.config"
import DBService from "../service/db.service"
import { dataWrapper } from '../utils'

const [collection, client] = DBService(dbName, 'users')

async function signin(req: Request, res: Response) {
  try {
    const { name, password } = req.body
    const result = await collection.findOne({
      name,
      password
    })

    if (!result) {
      res.json(dataWrapper({ code: 0, msg: 'user name or password wrong' }))
    } else {
      res.json(dataWrapper({ code: 1, msg: 'success' }))
    }
  } catch (e) {
    console.error(e)
    res.json(dataWrapper(undefined, 500, 'error'))
  }


}

export default signin