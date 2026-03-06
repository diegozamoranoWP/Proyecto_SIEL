import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTareaDto {
    @IsInt()
    obra_id: number;

    @IsInt()
    partida_id: number;

    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNumber()
    precio_trato: number;

    @IsInt()
    created_by: number;
}