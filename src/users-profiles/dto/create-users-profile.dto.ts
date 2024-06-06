import { IsDate, IsOptional, IsString } from "class-validator";
import { Date } from "mongoose";

export class CreateUsersProfileDto {
    @IsOptional()
    @IsString()
    readonly name: string;
    
    @IsOptional()
    @IsString()
    readonly lastname: string;

    @IsOptional()
    @IsDate()
    readonly birthdate: Date;
}
