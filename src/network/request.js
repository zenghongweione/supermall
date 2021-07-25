import axios from 'axios'
export function request(config,UrlState) {
  let setBaseURL;
  if (UrlState == 1) {
    setBaseURL = 'http://123.207.32.32:8000';
  }else if(UrlState == 2){
    setBaseURL = 'http://152.136.185.210:7878/api/m5';
  }
  const instance = axios.create({
    baseURL:setBaseURL,
    timeout:5000
  })
//interceptors是请求拦截器
  instance.interceptors.request.use(config=>{
    return config;
  },err=>{
    console.log(err);
  })
  //  2.2响应拦截器
  instance.interceptors.response.use(res =>{
    // console.log(res);
    return res.data;
  },err=>{
    console.log(err);
  }); 
  
  // 3.发送真正的网络请求
  return instance(config)
}