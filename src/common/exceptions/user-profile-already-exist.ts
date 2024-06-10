import { HttpException, HttpStatus } from "@nestjs/common";

export class UserProfileAlreadyExistsException extends HttpException {

  constructor() {
    super('User Profiel already exists', HttpStatus.BAD_REQUEST)
  }
}