import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateTaskAssignmentDto {
    @IsOptional()
    @IsBoolean()
    accepted?: boolean;

    @IsOptional()
    @IsDateString()
    accepted_at?: string;
}