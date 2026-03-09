import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { UpdateTaskAssignmentDto } from './dto/update-task-assignment.dto';

@Injectable()
export class TaskAssignmentsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateTaskAssignmentDto) {

        const tarea = await this.prisma.tarea.findUnique({
            where: { id: dto.task_id },
        });

        if (!tarea) {
            throw new NotFoundException('La tarea no existe');
        }

        const worker = await this.prisma.user.findUnique({
            where: { id: dto.worker_id },
        });

        if (!worker) {
            throw new NotFoundException('El trabajador no existe');
        }

        const assignedBy = await this.prisma.user.findUnique({
            where: { id: dto.assigned_by },
        });

        if (!assignedBy) {
            throw new NotFoundException('El usuario asignador no existe');
        }

        const existing = await this.prisma.taskAssignment.findFirst({
            where: {
                task_id: dto.task_id,
                worker_id: dto.worker_id,
            },
        });

        if (existing) {
            throw new BadRequestException('Ese trabajador ya está asignado a esta tarea');
        }

        return this.prisma.taskAssignment.create({
            data: dto,
        });
    }

    findAll() {
        return this.prisma.taskAssignment.findMany({
            include: {
                tarea: true,
                worker: true,
                asignadoPor: true,
            },
        });
    }

    async findOne(id: number) {

        const assignment = await this.prisma.taskAssignment.findUnique({
            where: { id },
            include: {
                tarea: true,
                worker: true,
                asignadoPor: true,
            },
        });

        if (!assignment) {
            throw new NotFoundException('La asignación no existe');
        }

        return assignment;
    }

    async update(id: number, dto: UpdateTaskAssignmentDto) {

        const assignment = await this.prisma.taskAssignment.findUnique({
            where: { id },
        });

        if (!assignment) {
            throw new NotFoundException('La asignación no existe');
        }

        if (dto.accepted === true && !dto.accepted_at) {
            dto.accepted_at = new Date().toISOString();
        }

        return this.prisma.taskAssignment.update({
            where: { id },
            data: {
                accepted: dto.accepted,
                accepted_at: dto.accepted_at
                    ? new Date(dto.accepted_at)
                    : undefined,
            },
        });
    }
}