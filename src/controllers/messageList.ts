import { Request, Response } from "express";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { dataWrapper } from "../utils";

async function messageList(req: Request, res: Response) {
  const { pageNo, pageSize, search } = req.query
  const { category } = req.params
  const [messages, client] = DBService(dbName, 'messages')

  const skip = Number(pageSize) * (Number(pageNo) - 1)
  const limit = Number(pageSize)
  const query = { category }
  if (search) {
    Object.assign(query, { content: { $regex: new RegExp(search as string, 'i') } })
  }
  try {
    const total = await messages.countDocuments({})
    const result = messages.find(query).sort({ createTime: -1 }).skip(skip).limit(limit)
    const rows = await (await result.toArray()).map((r) => ({ ...r, id: r._id.toString() }))
    res.json(dataWrapper({ pageSize: Number(pageSize), pageNo: Number(pageNo), data: rows, total }))
  } catch (e) {
    console.log(e)
    res.json(dataWrapper(undefined, 500, 'error'))
  } finally {
    client.close()
  }
}

export default messageList