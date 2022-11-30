import { Request, Response } from "express";
import fetch from "node-fetch";
import { adminAuth } from "../service/auth.service";
import { dataWrapper } from "../utils";
import { post } from "../utils/request";
import dotenv from 'dotenv'

dotenv.config()

const realm = process.env.REALM || 'board'
const baseURL = process.env.AUTH_URL

export default function signup(req: Request, res: Response) {
  try {
    const { name, password, email } = req.body
    adminAuth().then((token) => {
      const params = {
        email,
        credentials: [{
          type: "password",
          value: password
        }],
        username: name,
        enabled: true
      }
      const url = `http://${baseURL}/admin/realms/${realm}/users`
      return post(url, params, token).then((msg) => {
        if (msg.status != 201) {
          res.status(msg.status).json(dataWrapper(msg.data?.errorMessage, 500, 'failed'))
          return
        }
        res.status(msg.status).json(dataWrapper({ code: 1, msg: 'success' }))
      }).catch((e) => {
        console.error(e)
        res.json(dataWrapper(undefined, 500, 'failed'))
      })
    })

  } catch (e) {
    console.error(e)
    res.json(dataWrapper(undefined, 500, 'failed'))
  }

}