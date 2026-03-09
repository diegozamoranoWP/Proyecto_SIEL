import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    ParseIntPipe,
} from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteStatusDto } from './dto/update-reporte-status.dto';

@Controller('reportes')
export class ReportesController {
    constructor(private readonly reportesService: ReportesService) { }

    @Post()
    create(@Body() createReporteDto: CreateReporteDto) {
        return this.reportesService.create(createReporteDto);
    }

    @Get()
    findAll() {
        return this.reportesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reportesService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateReporteStatusDto: UpdateReporteStatusDto,
    ) {
        return this.reportesService.update(id, updateReporteStatusDto);
    }
}