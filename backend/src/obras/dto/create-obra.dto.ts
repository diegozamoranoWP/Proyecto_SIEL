import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateObraDto {
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsInt()
    created_by: number;
}