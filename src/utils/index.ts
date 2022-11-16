export const dataWrapper = (data: any, code:number = 200, msg:string = 'ok') => ({
  code,
  msg,
  data
})

