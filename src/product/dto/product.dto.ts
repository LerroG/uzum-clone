import {
	ArrayMinSize,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	ValidateIf
} from 'class-validator'
import { ColorDto } from 'src/color/dto/color.dto'

export class ProductDto {
	@IsString({
		message: 'Название обязательно'
	})
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	title: string

	@IsString({ message: 'Описание обязательно' })
	@IsNotEmpty({ message: 'Описание не может быть пустым' })
	description: string

	@IsNumber({}, { message: 'Цена должна быть числом' })
	@IsNotEmpty({ message: 'Цена не может быть пустой' })
	price: number

	@IsString({
		message: 'Укажите хотя бы одну картинку',
		each: true
	})
	@ArrayMinSize(1, { message: 'Должна быть хотя бы одна картинка' })
	@IsNotEmpty({
		each: true,
		message: 'Путь к картинке не может быть пустым'
	})
	images: string[]

	@IsOptional()
	@ValidateIf(o => o.specs !== null)
	@IsObject()
	specs?: Record<string, any>

	@IsString({
		message: 'Укажите хотя бы один цвет',
		each: true
	})
	@ArrayMinSize(1, { message: 'Должен быть хотя бы один цвет' })
	@IsNotEmpty({
		each: true,
		message: 'Цвет не может быть пустым'
	})
	colors: ColorDto[]

	@IsString({
		message: 'Категория обязательна'
	})
	@IsNotEmpty({ message: 'ID категории не может быть пустым' })
	subcategoryId: string
}
