import fetch from 'node-fetch'

export const post = (url: string, params?: Record<string, any>, auth?: string): Promise<{ status: number, data: any }> => fetch(url, {
  method: 'POST',
  body: !params ? params : JSON.stringify(params),
  headers: {
    'Content-type': 'application/json',
    'Authorization': !auth ? '' : `Bearer ${auth}`
  }
}).then(res => Promise.resolve(res.size ? res.json() : undefined).then((data) => ({ status: res.status, data })))
