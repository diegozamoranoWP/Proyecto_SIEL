import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    ParseIntPipe,
} from '@nestjs/common';
import { EvidenciasService } from './evidencias.service';
import { CreateEvidenciaDto } from './dto/create-evidencia.dto';
import { UpdateEvidenciaDto } from './dto/update-evidencia.dto';

@Controller('evidencias')
export class EvidenciasController {
    constructor(private readonly evidenciasService: EvidenciasService) { }

    @Post()
    create(@Body() dto: CreateEvidenciaDto) {
        return this.evidenciasService.create(dto);
    }

    @Get()
    findAll() {
        return this.evidenciasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.evidenciasService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateEvidenciaDto,
    ) {
        return this.evidenciasService.update(id, dto);
    }
}