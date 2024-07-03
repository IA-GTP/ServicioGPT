import { Injectable, NotFoundException } from '@nestjs/common';
import {
    audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyCheckUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './uses-cases';
import { AudioToTextDTO, ImageGenerationDTO, ImageVariationDTO, OrthographyDTO, ProsConsDiscusserDto, TextToAudioDto, TranslateDTO } from './dtos';
import OpenAI from 'openai';

// Para manejos de files
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDTO: OrthographyDTO) {
    console.log(this.openai);
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDTO.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }
 
  async translateText({ prompt, lang }: TranslateDTO) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter( fileId: string){
    const filePath = path.resolve(__dirname, '../../generated/audios/',`${fileId}.mp3`);
    const wasFound = fs.existsSync(filePath);
    if(!wasFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;
  }

  async audioToText( audioFile: Express.Multer.File, audioToTextDTO: AudioToTextDTO){
    const{prompt} = audioToTextDTO;
    return await audioToTextUseCase(this.openai, {audioFile, prompt});
  }

  async imageGeneration(imageGenerationDTO: ImageGenerationDTO){
    return imageGenerationUseCase(this.openai, {... imageGenerationDTO});
  }

  getGeneratedImage(fileName: string){
    const filePath = path.resolve('./','./generated/images/', fileName);
    const exists = fs.existsSync( filePath );

    if (!exists) {
      throw new NotFoundException('File not found');
    }
    console.log(filePath)
    return filePath;
  }

  async generatedImageVariation({baseImage}: ImageVariationDTO){
    return imageVariationUseCase( this.openai, { baseImage });
  }

}
