import { Request, Response } from "express";
import DBService from "../service/db.service";
import { dbName } from '../configs/db.config'
import { dataWrapper } from "../utils";

async function signup(req: Request, res: Response) {
  const { name, password, email } = req.body

  const [collection, client] = DBService(dbName, 'users')


  try {
    const result = await collection.insertOne({ name, password, email })
    if (result) {
      res.json(dataWrapper({ code: 1, msg: 'success' }))
    } else {
      res.json(dataWrapper({ code: 0, msg: 'failed' }))
    }
  } catch (e) {
    console.error(e)
  } finally {
    client.close()
  }
}

export default signup