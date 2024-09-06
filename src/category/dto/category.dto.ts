import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'
import { SubcategoryDto } from './subcategory.dto'
import { Type } from 'class-transformer'

export class CategoryDto {
	@IsString({ message: 'Название обязательно' })
	title: string

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SubcategoryDto)
	subcategories: SubcategoryDto[]
}
