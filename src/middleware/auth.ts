import { Request, Response } from "express";
import { checkAuth } from "../service/auth.service";
import { dataWrapper } from "../utils";

export default function auth(req: Request, res: Response, next: (() => void)) {
  const token = req.headers.authorization || ''
  checkAuth(token).then(() => next()).catch((e) => {
    res.status(401).json(dataWrapper(undefined, 401))
  })
}