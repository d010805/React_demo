import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

axios.interceptors.request.use((config)=>{
  let data=config.data
  if (data&&data instanceof Object) {
    config.data=qs.stringify(data)
  }
  return config
})

axios.interceptors.response.use(
  response=>{
    return response.data
  },
  error=>{
    message.error('请求出错:'+error.message)
    return new Promise(()=>{})
  }
  )

  export default axios