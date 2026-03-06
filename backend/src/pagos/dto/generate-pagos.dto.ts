import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class GeneratePagosDto {
    @IsOptional()
    @IsInt()
    worker_id?: number;

    @IsDateString()
    periodo_inicio: string;

    @IsDateString()
    periodo_fin: string;
}