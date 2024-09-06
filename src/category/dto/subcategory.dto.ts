import { IsString } from 'class-validator'

export class SubcategoryDto {
	@IsString({ message: 'Название обязательно' })
	title: string
}
