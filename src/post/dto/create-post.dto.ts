import { IsNotEmpty, IsString, Max } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @Max(200)
    title: string;

}