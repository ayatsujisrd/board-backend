import dayjs from 'dayjs'
export const dataWrapper = (data: any, code:number = 200, msg:string = 'ok') => ({
  status: code,
  msg,
  data
})

export const getCurrent = () => dayjs().format('YYYY-MM-DD HH:mm:ss')
