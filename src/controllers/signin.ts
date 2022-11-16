import { Request, Response } from "express"
import DBService from "../service/db.service"
import { dataWrapper } from '../utils'

const [collection, client] = DBService('board', 'users')

async function signin(req: Request, res: Response) {
    // res.send(req.body)

    try {
        const { name, password } = req.body
        const result = await collection.findOne({
          name,
          password
        })

        if (!result) {
            res.json(dataWrapper({ code: 0, msg: 'user name or password wrong' }))
        } else {
            res.json(dataWrapper({ code: 1, msg: 'success' }))
        }
    } finally {
        client.close()
    }


}

export default signin