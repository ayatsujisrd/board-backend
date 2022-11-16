import { Request, Response } from "express";
import { send } from "process";
import { dataWrapper } from "../utils";

async function sendEmail(str: string) {
  console.log(str)
}
async function forget(req: Request, res: Response) {
  const { email } = req.body
  // send email
  try {
    await sendEmail(email)
    res.json(dataWrapper({code: 1, msg: 'send email successfully'}))
  } catch (e) {
    res.json(dataWrapper({code: 0, msg: 'failed to send email'}))
  }

}

export default forget