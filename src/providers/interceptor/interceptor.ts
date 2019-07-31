import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import 'rxjs/'
import 'rxjs/add/operator/map';

/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(private storage: Storage) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

    console.log('gw intersep ahahhahahah');
    const headersConfig = {
      //'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    let promise = this.storage.get('accessToken');
          return Observable.fromPromise(promise)
          .mergeMap(token => {
    if(token) {
      headersConfig['Authorization'] = `bearer ${token}`
    }
    const _req = request.clone({ setHeaders: headersConfig });
    return next.handle(_req)
}


          )}
}
      
      
//       let promise = this.storage.get('accessToken');
//       return Observable.fromPromise(promise)
//       .mergeMap(token => {
//           let clonedReq = this.addToken(request, token);
//           console.log("coba intersep"+token)
//           return next.handle(clonedReq)
         
//       })
//   }

//   private addToken(request: HttpRequest<any>,  next: HttpHandler,token: any){
//     const headersConfig = {
//         //'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       }    
//     if (token){
//         headersConfig['Authorization'] = `bearer ${token}`
//     }
//     const _req = request.clone({ setHeaders: headersConfig });
//     return next.handle(_req)


        
//          // let clone: HttpRequest<any>;
//         //   clone = request.clone({
              
//         //       setHeaders: {
//         //           'Accept': 'application/json', 
//         //         //   'Content-Type': `application/json`, 
//         //           Authorization: `Bearer ${token}`,
//         //       }
//         //   });
//         //   return clone;
//   }
//       }
//  //     return request;
  

