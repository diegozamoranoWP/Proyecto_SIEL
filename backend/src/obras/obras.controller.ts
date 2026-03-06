import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { CreateObraDto } from './dto/create-obra.dto';

@Controller('obras')
export class ObrasController {
    constructor(private readonly obrasService: ObrasService) { }

    @Post()
    create(@Body() createObraDto: CreateObraDto) {
        return this.obrasService.create(createObraDto);
    }

    @Get()
    findAll() {
        return this.obrasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.obrasService.findOne(Number(id));
    }
}