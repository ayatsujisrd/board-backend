import { Request, Response } from "express";
import { dataWrapper } from "../utils";
import stringRandom from "string-random";
import DBService from "../service/db.service";
import { dbName } from "../configs/db.config";
import dayjs from "dayjs";

async function sendEmail(str: string) {
  console.log(str)
}
async function forget(req: Request, res: Response) {
  const { email } = req.body
  // send email
  try {
    const [tokens, client] = DBService(dbName, 'tokens')
    const token = stringRandom(16)
    // token should have been sent to email box
    // but we don not have email server
    tokens.insertOne({token: token, createTime: new Date().getTime()})
    await sendEmail(email)
    res.json(dataWrapper({ code: 1, msg: 'send email successfully', token }))
  } catch (e) {
    res.json(dataWrapper({ code: 0, msg: 'failed to send email' }))
  }

}

export default forget