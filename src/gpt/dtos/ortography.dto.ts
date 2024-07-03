import { IsInt, IsOptional, IsString } from "class-validator";

export class OrthographyDTO{
    @IsString()
    readonly prompt: string;
    
    @IsInt()
    @IsOptional()
    readonly maxTokens?:number;
}