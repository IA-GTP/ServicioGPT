import { IsString } from "class-validator";


export class QuestionDTO{
    @IsString()
    readonly threadId: string;

    @IsString()
    readonly question: string;
}