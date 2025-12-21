import { IsNotEmpty, IsString } from "class-validator";

export class SaveDto {
    @IsNotEmpty()
    @IsString()
    postId: string
}