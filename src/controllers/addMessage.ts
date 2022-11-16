import { Request, Response } from "express";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { dataWrapper, getCurrent } from "../utils";

async function addMessage(req:Request, res: Response) {
  const {message, name} = req.body
  const [messages, client] = DBService(dbName, 'messages')
  const createTime = getCurrent()
  try {
    const result = await messages.insertOne({
      name,
      message,
      createTime,
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