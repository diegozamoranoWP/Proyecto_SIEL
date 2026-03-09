import { IsIn, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTareaDto {
    @IsOptional()
    @IsString()
    titulo?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    precio_trato?: number;

    @IsOptional()
    @IsIn([
        'pendiente',
        'asignada',
        'en_progreso',
        'en_revision',
        'aprobada',
        'rechazada',
        'pagada',
    ])
    estado?: string;

    @IsOptional()
    @IsInt()
    partida_id?: number;
}