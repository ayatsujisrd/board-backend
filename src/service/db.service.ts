import {Collection, Db, MongoClient} from 'mongodb'
import { uri } from '../configs/db.config'

const DBService = (db:string, collection: string):[Collection, MongoClient, Db] => {
    const client = new MongoClient(uri)
    const mdb = client.db(db)
    const c = mdb.collection(collection)
    return [c, client, mdb]
}

export default DBService