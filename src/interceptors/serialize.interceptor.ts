import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // run something before  a request  is handled by the request handler
    console.log('1 before the handler')
    return next.handle().pipe(
      map((data) => {
        //run something before the response is sent out
        console.log('3 before response is sent out')
        return  data;
      })
    )
  }
}
