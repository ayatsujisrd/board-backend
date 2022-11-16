import {MongoClient} from 'mongodb'
import { uri } from '../configs/db.config'

const DBService = (db:string, collection: string) => {
    const client = new MongoClient(uri)
    const mdb = client.db(db)
    const c = mdb.collection(collection)
    return c
}

export default DBService