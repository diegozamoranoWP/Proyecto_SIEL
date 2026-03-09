import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteStatusDto } from './dto/update-reporte-status.dto';

@Injectable()
export class ReportesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createReporteDto: CreateReporteDto) {
        const tarea = await this.prisma.tarea.findUnique({
            where: { id: createReporteDto.task_id },
        });

        if (!tarea) {
            throw new NotFoundException('La tarea no existe');
        }

        const worker = await this.prisma.user.findUnique({
            where: { id: createReporteDto.worker_id },
        });

        if (!worker) {
            throw new NotFoundException('El trabajador no existe');
        }

        const asignacion = await this.prisma.taskAssignment.findFirst({
            where: {
                task_id: createReporteDto.task_id,
                worker_id: createReporteDto.worker_id,
            },
        });

        if (!asignacion) {
            throw new BadRequestException(
                'El trabajador no está asignado a esta tarea',
            );
        }

        return this.prisma.reporte.create({
            data: createReporteDto,
        });
    }

    findAll() {
        return this.prisma.reporte.findMany({
            include: {
                tarea: true,
                worker: true,
                evidencias: true,
            },
        });
    }

    async findOne(id: number) {
        const reporte = await this.prisma.reporte.findUnique({
            where: { id },
            include: {
                tarea: true,
                worker: true,
                evidencias: true,
            },
        });

        if (!reporte) {
            throw new NotFoundException('El reporte no existe');
        }

        return reporte;
    }

    async update(id: number, updateReporteStatusDto: UpdateReporteStatusDto) {
        const reporte = await this.prisma.reporte.findUnique({
            where: { id },
        });

        if (!reporte) {
            throw new NotFoundException('El reporte no existe');
        }

        return this.prisma.reporte.update({
            where: { id },
            data: updateReporteStatusDto,
        });
    }
}