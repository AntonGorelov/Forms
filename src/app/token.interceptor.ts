import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifyRequest = req.clone({
      headers: req.headers.set('StepperToken', 'valueNameToken')
    });

    return next.handle(modifyRequest);
  }
}
