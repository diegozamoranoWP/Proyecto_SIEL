import { Body, Controller, Get, Param, Post, Patch, Put, ParseIntPipe, } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

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
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.obrasService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateObraDto: UpdateObraDto,
    ) {
        return this.obrasService.update(id, updateObraDto);
    }
}