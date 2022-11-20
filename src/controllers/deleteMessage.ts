import { ObjectID } from "bson";
import { Request, Response } from "express";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { dataWrapper } from "../utils";

export default async function deleteMessage(req: Request, res: Response) {
  const { id } = req.body
  const [messages, client] = DBService(dbName, 'messages')
  try {
    const result = await messages.deleteOne({ _id: new ObjectID(id) })
    if (result) {
      res.json(dataWrapper({ code: 1, msg: 'success' }))
    } else {
      res.json(dataWrapper({ code: 0, msg: 'failed' }))
    }
  } catch (e) {
    res.json(dataWrapper(undefined, 500, 'error'))
  } finally {
    client.close()
  }

}