import { IsOptional, IsString } from 'class-validator';

export class UpdateObraDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;
}