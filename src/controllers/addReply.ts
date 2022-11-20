import { ObjectID } from "bson";
import { Request, Response } from "express";
import { ClientRequest } from "http";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { dataWrapper, getCurrent } from "../utils";

async function addReply(req: Request, res: Response) {
  const { reply, id, replier } = req.body
  const createTime = getCurrent()

  const [messages, client] = DBService(dbName, 'messages')
  try {
    const idObj = new ObjectID(id)
    const replyId = new ObjectID()
    const result = await messages.updateOne({ _id: idObj }, { $push: { replies: { _id: replyId, content: reply, name: replier, createTime } } })
    if (result) {
      res.json(dataWrapper({ id: replyId, createTime }))
    } else {
      res.json(dataWrapper(undefined))
    }
  } catch (e) {
    res.json(dataWrapper(undefined, 500, 'error'))
  } finally {
    client.close()
  }
}

export default addReply