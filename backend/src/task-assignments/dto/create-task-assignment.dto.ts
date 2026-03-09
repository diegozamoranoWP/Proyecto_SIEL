import { IsInt } from 'class-validator';

export class CreateTaskAssignmentDto {
    @IsInt()
    task_id: number;

    @IsInt()
    worker_id: number;

    @IsInt()
    assigned_by: number;
}