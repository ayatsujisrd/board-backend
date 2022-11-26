import { Collection, CollectionInfo, MongoClient } from "mongodb";
import { collectionMessages, collectionUsers, dbName, uri } from "../configs/db.config";

const client = new MongoClient(uri)
const db = client.db(dbName)

async function init() {
  let count = 2
  const close = () => {
    if (--count <= 0) {
      client.close()
    }
  }

  // create users collection
  const initUsers = async (users?: Collection) => {
    if (users) {
      await users.createIndex({ name: 1, email: 1 }, { unique: true })
      console.log('init index')
      close()
      return
    }
    try {
      const users = await db.createCollection(collectionUsers)
      users.createIndex({ name: 1, email: 1 }, { unique: true })
      console.log(collectionUsers + ' collection created successfully')
    } catch (e) {
      console.log(e)
    } finally {
      close()
    }


  }

  // create messages collection
  const initMessages = async (messages?: Collection) => {
    if (messages) {
      console.log('created messages')
      close()
      return
    }
    try {
      const messages = await db.createCollection(collectionMessages)
      console.log(collectionMessages + ' collection created successfully')

    } catch (e) {
      console.log(e)
    } finally {
      close()
    }
  }

  const initCollection = (collectionName: string, collections: CollectionInfo[], cb: (c?: Collection) => Promise<void>) => {
    const collection = collections.findIndex((c) => c.name === collectionName) > -1 ? db.collection(collectionName) : undefined
    cb(collection)
  }
  const collectionsResult = db.listCollections()
  const collections = await collectionsResult.toArray()


  initCollection(collectionMessages, collections, initMessages)
  initCollection(collectionUsers, collections, initUsers)

}

init()