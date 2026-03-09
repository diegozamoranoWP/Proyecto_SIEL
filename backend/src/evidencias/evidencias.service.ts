import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEvidenciaDto } from './dto/create-evidencia.dto';
import { UpdateEvidenciaDto } from './dto/update-evidencia.dto';

@Injectable()
export class EvidenciasService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateEvidenciaDto) {
        const reporte = await this.prisma.reporte.findUnique({
            where: { id: dto.reporte_id },
        });

        if (!reporte) {
            throw new NotFoundException('El reporte no existe');
        }

        return this.prisma.evidencia.create({
            data: dto,
        });
    }

    findAll() {
        return this.prisma.evidencia.findMany({
            include: {
                reporte: true,
            },
        });
    }

    async findOne(id: number) {
        const evidencia = await this.prisma.evidencia.findUnique({
            where: { id },
            include: {
                reporte: true,
            },
        });

        if (!evidencia) {
            throw new NotFoundException('La evidencia no existe');
        }

        return evidencia;
    }

    async update(id: number, dto: UpdateEvidenciaDto) {
        const evidencia = await this.prisma.evidencia.findUnique({
            where: { id },
        });

        if (!evidencia) {
            throw new NotFoundException('La evidencia no existe');
        }

        return this.prisma.evidencia.update({
            where: { id },
            data: dto,
        });
    }
}