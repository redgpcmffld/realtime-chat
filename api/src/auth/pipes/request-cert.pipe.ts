import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export interface RequestCertForm {
  email?: string;
}

export class RequestCertPipe implements PipeTransform {
  private isEmailValid(email: string) {
    const re = /(\w){2,}[@](\w){4,}\.{1}(\w){2,3}/;
    return re.test(email);
  }
  private isFormValid(value: RequestCertForm) {
    return value && value.email && typeof value.email == 'string';
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isFormValid(value)) {
      throw new BadRequestException('Must Be Entered Email');
    }
    if (!this.isEmailValid(value.email)) {
      throw new BadRequestException('Invalid Email');
    }
    return value;
  }
}
