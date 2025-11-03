import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export interface IRequestPromptDto {
  prompt: string;
  context?: string;
}

export class RequestPromptDto implements IRequestPromptDto {
  @IsString({ message: 'El prompt debe ser un string' })
  @IsNotEmpty({ message: 'El prompt no puede estar vacío' })
  @MinLength(1, { message: 'El prompt debe tener al menos 1 caracter' })
  @MaxLength(5000, { message: 'El prompt no puede exceder 5000 caracteres' })
  prompt: string;

  @IsOptional()
  @IsString({ message: 'El contexto debe ser un string' })
  @MaxLength(10000, {
    message: 'El contexto no puede exceder 10000 caracteres',
  })
  context?: string;
}
