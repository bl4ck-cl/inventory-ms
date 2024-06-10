import { IsNotEmpty, IsString } from "class-validator";
import { ProviderType } from "../schemas/provider.schema";

export class CreateProviderDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly type: ProviderType;
}
