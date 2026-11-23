
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);

  if(!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = localStorage.getItem('foro_token');

  const esLogin = req.url.includes('/auth/login');

  if(!token || esLogin) {
    return next(req);
  }

  const requestConToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return next(requestConToken);
};
