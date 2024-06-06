import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateUsersProfileDto } from "src/users-profiles/dto/create-users-profile.dto";
import { UserProfile } from "src/users-profiles/schemas/user-profile.schema";

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

    @IsOptional()
    @ValidateNested()
    readonly userProfile?: CreateUsersProfileDto;

}
