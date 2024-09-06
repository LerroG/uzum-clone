import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoryDto } from './dto/category.dto'
import { SubcategoryDto } from './dto/subcategory.dto'
import { ErrorHandlerService } from 'src/utils/errorHandler'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	// Categories
	async getAllCategories() {
		return this.prisma.category.findMany()
	}

	async getCategoryById(id: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			}
		})

		if (!category) throw new NotFoundException('Категория не найдена')

		return category
	}

	async createCategory(dto: CategoryDto) {
		return this.prisma.category
			.create({
				data: {
					title: dto.title
				}
			})
			.catch(error => {
				ErrorHandlerService.handleError(
					error,
					'Категория с таким названием уже существует'
				)
			})
	}

	async updateCategory(id: string, dto: CategoryDto) {
		await this.getCategoryById(id)

		return this.prisma.category
			.update({
				where: { id },
				data: {
					title: dto.title
				}
			})
			.catch(error => {
				ErrorHandlerService.handleError(
					error,
					'Категория с таким названием уже существует'
				)
			})
	}

	async deleteCategory(id: string) {
		await this.getCategoryById(id)

		return this.prisma.category.delete({
			where: { id }
		})
	}

	// Subcategory
	async getAllSubcategories(categoryId: string) {
		return this.prisma.subcategory.findMany({
			where: { categoryId }
		})
	}

	async getSubcategoryById(id: string) {
		const subcategory = await this.prisma.subcategory.findUnique({
			where: {
				id
			}
		})

		if (!subcategory) throw new NotFoundException('Подкатегория не найдена')

		return subcategory
	}

	async createSubcategory(categoryId: string, dto: SubcategoryDto) {
		await this.getCategoryById(categoryId)

		return this.prisma.subcategory
			.create({
				data: {
					title: dto.title,
					categoryId
				}
			})
			.catch(error => {
				ErrorHandlerService.handleError(
					error,
					'Подкатегория с таким названием уже существует'
				)
			})
	}

	async updateSubcategory(subcategoryId: string, dto: SubcategoryDto) {
		await this.getSubcategoryById(subcategoryId)

		return this.prisma.subcategory.update({
			where: { id: subcategoryId },
			data: dto
		})
	}

	async deleteSubcategory(id: string) {
		await this.getSubcategoryById(id)

		return this.prisma.subcategory.delete({
			where: { id }
		})
	}
}
