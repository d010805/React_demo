import ajax from './ajax';

export const reqLogin = (username, password) => ajax(
  {
    method:'POST',
    url:'/login',
    data:{username,password}
  }
)