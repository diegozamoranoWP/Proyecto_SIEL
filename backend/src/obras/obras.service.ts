import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateObraDto } from './dto/create-obra.dto';

@Injectable()
export class ObrasService {
    constructor(private readonly prisma: PrismaService) { }

    create(createObraDto: CreateObraDto) {
        return this.prisma.obra.create({
            data: createObraDto,
        });
    }

    findAll() {
        return this.prisma.obra.findMany();
    }

    findOne(id: number) {
        return this.prisma.obra.findUnique({
            where: { id },
        });
    }
}