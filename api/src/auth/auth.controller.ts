import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestCertForm, RequestCertPipe } from './pipes/request-cert.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/send')
  sendCert(@Body(RequestCertPipe) requestCertForm: RequestCertForm) {
    return this.authService.sendCert(requestCertForm);
  }

  @Post('/confirm')
  certConfirm(@Body('email') email: string, @Body('cert') cert: number) {
    return this.authService.certConfirm(email, cert);
  }
}
