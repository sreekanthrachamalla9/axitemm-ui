import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
 const isBrowser = isPlatformBrowser(platformId);
 let token: any;
  if(req.url.includes('/login')) {
    return next(req);
  }
  if(isBrowser){

     token  = localStorage.getItem('token');
  }
  console.log('test token', token)

  let clone  = req;
  if(token) {
    clone = req.clone({
      setHeaders:{
        Authorization : `Bearer ${token}`
      }
    })
  }
  return next(clone);
  
};
