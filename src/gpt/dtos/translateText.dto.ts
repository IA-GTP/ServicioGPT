import { IsString } from "class-validator";

export class TranslateDTO{
    
    @IsString()
    readonly prompt: string;
    
    @IsString()
    readonly lang: string;
}