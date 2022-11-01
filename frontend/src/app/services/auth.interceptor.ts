import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq=req;
        const token = this.loginService.getToken();
        if(token!=null){
            authReq = authReq.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            });
        }
       return next.handle(authReq);
    }
}