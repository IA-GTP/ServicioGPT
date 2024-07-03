import OpenAI from "openai";

interface Options{
    prompt: string
}


export const orthographyCheckUseCase = async(openai: OpenAI,options: Options)=>{

    const {prompt} = options;
    const completion = await openai.chat.completions.create({
        messages: [ // Aquí indicas a la IA sus principales responsabilidades y su rol
            { role: "system", 
              content: `Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
                        Las palabras deben existir en la RAE
                        Debes responder en formato JSON,
                        tu tarea es corregirlos y retornar información soluciones,
                        también debes de dar un porcentaje de aciertos por el usuario,

                        si no hay errores, debes de retornar un mensaje de felicitaciones.

                        Ejemplo de salida:
                        {
                            userScore: number,
                            errors: string[], // ['error => solución']
                            message: string, // Usa emojis y texto para felicitar al usuario
                        }

                        con ese ejemplo el valor userScore debe ser un porcentaje de acierto de palabras correctas
                        en el mensaje enviado por el usuario
                        en errors deberas mostrar la colección de errores de esta forma ['error => solución']
                        `
            },
            { role: "user", content: prompt},

        ],
        model: "gpt-3.5-turbo-1106",//model: "gpt-3.5-turbo",
        temperature: 0.3,
        max_tokens: 150,
        response_format:{
            type: 'json_object' // no todos los model soportan parseo a JSON
        }
      });

      const jsonResp = JSON.parse(completion.choices[0].message.content)
      console.log(jsonResp)
  return jsonResp;
}

