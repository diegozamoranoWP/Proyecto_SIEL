import { IsInt, IsNumber, IsOptional, IsString, Min, IsNotEmpty } from 'class-validator';

export class CreateTareaDto {
    @IsInt()
    obra_id: number;

    @IsInt()
    partida_id: number;

    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNumber()
    @Min(0)
    precio_trato: number;

    @IsInt()
    created_by: number;
}