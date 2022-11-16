import { Request, Response } from "express";
import { dbName } from "../configs/db.config";
import DBService from "../service/db.service";
import { dataWrapper } from "../utils";


async function reset(req: Request, res: Response) {
  const { name, password } = req.body
  const [users, client] = DBService(dbName, 'users')

  try {
    const result = await users.updateOne({
      name
    }, { $set: { password } })

    if (result) {
      res.json(dataWrapper({ code: 1, msg: 'reset password successfully' }))
    } else {
      res.json(dataWrapper({ code: 0, msg: 'failed to reset password' }))
    }
  } catch (e) {
    res.json(dataWrapper(undefined, 500, 'error'))

  } finally {
    client.close()
  }

}

export default reset