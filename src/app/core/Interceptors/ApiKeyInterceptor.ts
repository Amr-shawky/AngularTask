import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const apiKeyInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  // Clone the request and add the x-api-key header
  const modifiedReq = req.clone({
    setHeaders: {
      'x-api-key': '1234'
    }
  });

  // Pass the modified request to the next handler
  return next(modifiedReq);
};