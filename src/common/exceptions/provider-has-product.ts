
import { HttpException, HttpStatus } from "@nestjs/common";

export class ProviderAlreadyHasProduct extends HttpException {

    constructor() {
        super('Provider already has that product in his list of products', HttpStatus.BAD_REQUEST)
    }
}