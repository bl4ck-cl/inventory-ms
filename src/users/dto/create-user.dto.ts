import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsEmail()
    readonly email: string;
    
    @IsString()
    @IsEmail()
    readonly password: string;

}
