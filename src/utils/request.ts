import fetch from 'node-fetch'

export const post = (url: string, params?: Record<string, any>, auth?: string): Promise<{ status: number, data: any }> => fetch(url, {
  method: 'POST',
  body: !params ? params : JSON.stringify(params),
  headers: {
    'Content-type': 'application/json',
    'Authorization': !auth ? '' : `Bearer ${auth}`
  }
}).then(res => Promise.resolve(res.json().catch(() => undefined)).then((data) => ({ status: res.status, data })))

export const get = (url: string, auth?: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': !auth ? '' : `Bearer ${auth}`
    },
  }).then(res => Promise.resolve(res.json().catch(() => undefined)).then((data) => ({ status: res.status, data })))
}

export const put = (url: string, params?: Record<string, any>, auth?: string) => {
  return fetch(url, {
    method: 'PUT',
    body: !params ? params : JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
      'Authorization': !auth ? '' : `Bearer ${auth}`
    }
  }).then(res => Promise.resolve(res.json().catch(() => undefined)).then((data) => ({ status: res.status, data })))
}
