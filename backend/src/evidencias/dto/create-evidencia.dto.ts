import { IsInt, IsString } from 'class-validator';

export class CreateEvidenciaDto {
    @IsInt()
    reporte_id: number;

    @IsString()
    image_url: string;

    @IsString()
    tipo: string;
}