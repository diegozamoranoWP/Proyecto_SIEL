import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareasService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createTareaDto: CreateTareaDto) {
        const obra = await this.prisma.obra.findUnique({
            where: { id: createTareaDto.obra_id },
        });

        if (!obra) {
            throw new NotFoundException('La obra no existe');
        }

        const partida = await this.prisma.partida.findUnique({
            where: { id: createTareaDto.partida_id },
        });

        if (!partida) {
            throw new NotFoundException('La partida no existe');
        }

        const creador = await this.prisma.user.findUnique({
            where: { id: createTareaDto.created_by },
        });

        if (!creador) {
            throw new NotFoundException('El usuario creador no existe');
        }

        return this.prisma.tarea.create({
            data: createTareaDto,
        });
    }

    findAll() {
        return this.prisma.tarea.findMany({
            include: {
                obra: true,
                partida: true,
                creador: true,
            },
        });
    }

    async findOne(id: number) {
        const tarea = await this.prisma.tarea.findUnique({
            where: { id },
            include: {
                obra: true,
                partida: true,
                creador: true,
            },
        });

        if (!tarea) {
            throw new NotFoundException('La tarea no existe');
        }

        return tarea;
    }

    async update(id: number, updateTareaDto: UpdateTareaDto) {
        const tareaExistente = await this.prisma.tarea.findUnique({
            where: { id },
        });

        if (!tareaExistente) {
            throw new NotFoundException('La tarea no existe');
        }

        if (updateTareaDto.partida_id) {
            const partida = await this.prisma.partida.findUnique({
                where: { id: updateTareaDto.partida_id },
            });

            if (!partida) {
                throw new NotFoundException('La partida no existe');
            }
        }

        if (
            updateTareaDto.estado === 'pagada' &&
            tareaExistente.estado !== 'aprobada'
        ) {
            throw new BadRequestException(
                'Solo una tarea aprobada puede pasar a estado pagada',
            );
        }

        return this.prisma.tarea.update({
            where: { id },
            data: updateTareaDto,
        });
    }
}