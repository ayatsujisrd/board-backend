import { Request, Response } from "express";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { dataWrapper, getCurrent } from "../utils";

async function addMessage(req:Request, res: Response) {
  const {content, user, category} = req.body
  const [messages, client] = DBService(dbName, 'messages')
  const createTime = getCurrent()
  try {
    const result = await messages.insertOne({
      user,
      content,
      createTime,
      category,
      replies: []
    })
    if(result) {
      res.json(dataWrapper({id: result.insertedId.toString(), createTime}))
    }else {
      res.json(dataWrapper(undefined, 200, 'failed'))
    }
  }catch(e) {
    res.json(dataWrapper(undefined, 500, 'error'))
  }finally {
    client.close()
  }
}

export default addMessage