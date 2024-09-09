import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'
import { SubcategoryDto } from './dto/subcategory.dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	// Category
	@Get()
	async getAllCategories() {
		return this.categoryService.getAllCategories()
	}

	@Get(':id')
	async getCategoryById(@Param('id') id: string) {
		return this.categoryService.getCategoryById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createCategory(@Body() dto: CategoryDto) {
		return this.categoryService.createCategory(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.updateCategory(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteCategory(@Param('id') id: string) {
		return this.categoryService.deleteCategory(id)
	}

	// Subcategory
	@Get(':categoryId/subcategories')
	async getAllSubcategories(@Param('categoryId') categoryId: string) {
		return this.categoryService.getAllSubcategories(categoryId)
	}

	@Get('subcategories/:subcategoryId')
	async getSubcategoryById(@Param('subcategoryId') subcategoryId: string) {
		return this.categoryService.getSubcategoryById(subcategoryId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(':categoryId')
	@Auth()
	async createSubcategory(
		@Param('categoryId') categoryId: string,
		@Body() dto: SubcategoryDto
	) {
		return this.categoryService.createSubcategory(categoryId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('subcategories/:subcategoryId')
	@Auth()
	async updateSubcategory(
		@Param('subcategoryId') subcategoryId: string,
		@Body() dto: CategoryDto
	) {
		return this.categoryService.updateSubcategory(subcategoryId, dto)
	}

	@HttpCode(200)
	@Delete('subcategories/:subcategoryId')
	@Auth()
	async deleteSubcategory(@Param('subcategoryId') subcategoryId: string) {
		return this.categoryService.deleteSubcategory(subcategoryId)
	}
}
