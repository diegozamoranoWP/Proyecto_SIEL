import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTareaDto {
    @IsOptional()
    @IsString()
    titulo?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsNumber()
    precio_trato?: number;

    @IsOptional()
    @IsString()
    estado?: string;

    @IsOptional()
    @IsInt()
    partida_id?: number;
}