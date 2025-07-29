// src/app/API/Model/auth.interceptor.ts
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);
  let token: string | null = null;

  if (req.url.includes('/login')) {
    return next(req);
  }

  if (isBrowser) {
    token = localStorage.getItem('token');
  }

  const clone = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(clone);
};
