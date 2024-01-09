import { UsersService } from '../users.service';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const {userId} = request.session;
    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user; //then we get it in decorator (because there are another way to get user in decorator)
    }

    return next.handle();
  }
}
