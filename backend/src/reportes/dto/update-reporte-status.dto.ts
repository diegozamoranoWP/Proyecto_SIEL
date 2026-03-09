import { IsIn } from 'class-validator';

export class UpdateReporteStatusDto {
    @IsIn(['pendiente', 'aprobado', 'rechazado'])
    estado_revision: string;
}