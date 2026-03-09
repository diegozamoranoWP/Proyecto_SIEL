import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    ParseIntPipe,
} from '@nestjs/common';
import { TaskAssignmentsService } from './task-assignments.service';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { UpdateTaskAssignmentDto } from './dto/update-task-assignment.dto';

@Controller('task-assignments')
export class TaskAssignmentsController {
    constructor(
        private readonly taskAssignmentsService: TaskAssignmentsService,
    ) { }

    @Post()
    create(@Body() dto: CreateTaskAssignmentDto) {
        return this.taskAssignmentsService.create(dto);
    }

    @Get()
    findAll() {
        return this.taskAssignmentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.taskAssignmentsService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTaskAssignmentDto,
    ) {
        return this.taskAssignmentsService.update(id, dto);
    }
}