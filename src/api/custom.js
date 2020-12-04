import axios from 'axios'
import Store  from '../redux/store'
import { message} from 'antd';
import {deluserinfoaction} from "../redux/actions/login_action"





const instance  = axios.create({
    baseURL: "http://103.40.242.182"
})


instance.interceptors.request.use(function (config) {
    let {token} = Store.getState().userinfo
    if (token) { config.headers.Authorization = token }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });



instance.interceptors.response.use(function (response) {
    return response.data
  }, function (error) {
    if(error.response.status === 401)  {
      message.warning("会话token已经过期,请重新登录!")
      Store.dispatch(deluserinfoaction())   
      let json = JSON.parse('{"status":"401","data":{"msg":"token过期"}}')  
      return Promise.resolve(json);
    } else {
      let json = JSON.parse('{"status":"5xx","data":{"msg":"登录异常"}}')
      return Promise.resolve(json);
    }
   
  });


export  default  instance  