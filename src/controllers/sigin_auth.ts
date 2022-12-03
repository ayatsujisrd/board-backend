import { Request, Response } from "express";
import { auth, getAccessToken } from "../service/auth.service";
import { dataWrapper } from "../utils";

export default async function signin(req: Request, res: Response) {
  try {

    const { name, password } = req.body
    auth({ username: name, password }).then(() => {
      const accessToken = getAccessToken()
      if(accessToken) {

        res.json(dataWrapper({ code: 1, msg: 'success', accessToken }))
      }else {
        res.json(dataWrapper({ code: 0, msg: 'user or password wrong', accessToken }))
      }
    }).catch((e) => res.json(dataWrapper({ code: 0, msg: e?.message })))
  } catch (e) {
    res.json(dataWrapper(undefined, 500, 'error'))
  }
}