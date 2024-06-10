import { IsNotEmpty, IsString } from "class-validator";
import { ProductType } from "../schema/product.schema";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly sku: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly type: ProductType;

}
