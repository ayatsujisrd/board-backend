import { Request, Response } from "express";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { dataWrapper } from "../utils";

async function messageList(req: Request, res: Response) {
  const {pageNo, pageSize} = req.body
  const [messages, client] = DBService(dbName, 'messages')

  const skip = pageSize * (pageNo - 1)
  const limit = pageSize
  try {
    const result = messages.find().sort({createTime: -1}).skip(skip).limit(limit)
    const rows = await (await result.toArray()).map((r) => ({...r,id: r._id.toString()}))
    res.json(dataWrapper(rows))
  }catch(e) {
    res.json(dataWrapper(undefined, 500, 'error'))
  }finally {
    client.close()
  }
}

export default messageList