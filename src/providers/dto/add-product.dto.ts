import { IsNotEmpty, IsString } from "class-validator";

export class AddProductToProviderDto {
    @IsString()
    @IsNotEmpty()
    readonly providerId: string;

    @IsString()
    @IsNotEmpty()
    readonly productId: string;
}
