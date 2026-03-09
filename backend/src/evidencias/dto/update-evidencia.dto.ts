import { IsOptional, IsString } from 'class-validator';

export class UpdateEvidenciaDto {
    @IsOptional()
    @IsString()
    image_url?: string;

    @IsOptional()
    @IsString()
    tipo?: string;
}