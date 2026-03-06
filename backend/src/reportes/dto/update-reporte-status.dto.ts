import { IsString } from 'class-validator';

export class UpdateReporteStatusDto {
    @IsString()
    estado_revision: string;
}