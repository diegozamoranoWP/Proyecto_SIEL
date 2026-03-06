import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateReporteDto {
    @IsInt()
    task_id: number;

    @IsInt()
    worker_id: number;

    @IsOptional()
    @IsString()
    comentario?: string;
}