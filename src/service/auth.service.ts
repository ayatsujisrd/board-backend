import fetch from 'node-fetch'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const baseURL = process.env.AUTH_URL
const realm = process.env.REALM || 'board'
const client = process.env.CLIENT || 'helloid'
const client_secret = process.env.SECRET
const admin_secret = process.env.ADMIN_SECRET
const admin_client = process.env.ADMIN_CLIENT
const publicKey = process.env.PUBLIC_KEY
const cert = `-----BEGIN PUBLIC KEY-----
${publicKey}
-----END PUBLIC KEY-----`

const url = `http://${baseURL}/realms/${realm}/protocol/openid-connect/token`

let access_token = ''

type UserInfo = { username: string, password: string }
export const auth = (params: UserInfo) => {
  const json: Record<string, any> = {
    client_id: client,
    grant_type: 'password',
    client_secret,
    ...params
  }
  const searchParam = new URLSearchParams()
  Object.keys(json).forEach((key) => {
    searchParam.append(key, json[key])
  })
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: searchParam.toString()
  }).then(res => res.json()).then((res) => {
    access_token = res.access_token
  })

}
export const adminAuth = () => {
  const params: Record<string, any> = {
    grant_type: 'client_credentials',
    client_id: admin_client,
    client_secret: admin_secret
  }
  const searchParam = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    searchParam.append(key, params[key])
  })
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },

    body: searchParam.toString()

  }).then(res => res.json()).then((res) => res.access_token)
}

export const getAccessToken = () => access_token

export const checkAuth = (token: string) =>
  new Promise((resolve, reject) => JWT.verify(token, cert, { algorithms: ['RS256'] }, (err, decode) => {
    if (err) {
      reject(err)
      return
    }
    resolve(decode)
  })
  )
