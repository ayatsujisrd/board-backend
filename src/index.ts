import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import router from './router'

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('listening on ' + port)
})