import { Request, Response } from "express";
import DBService from "../service/db.service";
import { dbName } from '../configs/db.config'
import { dataWrapper } from "../utils";
import { WriteError } from 'mongodb'

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
    if ((e as WriteError).code == 11000) {
      res.json(dataWrapper(undefined, 500, 'duplicate user or email'))
    } else {
      res.json(dataWrapper(undefined, 500, 'failed'))
    }
  } finally {
    client.close()
  }
}

export default signup