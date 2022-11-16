import { Request, Response } from "express";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { getCurrent } from "../utils";

async function addReply(req: Request, res: Response) {
  const {reply, id, name} = req.body
  const createTime = getCurrent()

  const [messages, client] = DBService(dbName, 'messages')

}

export default addReply