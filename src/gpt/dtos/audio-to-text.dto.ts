import { IsOptional, IsString } from "class-validator";

export class AudioToTextDTO{
    
    @IsString()
    @IsOptional()
    readonly prompt: string;

}