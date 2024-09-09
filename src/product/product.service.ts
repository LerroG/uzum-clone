import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.getSearchTermFilter(searchTerm)

		return this.prisma.product.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				subcategory: true
			}
		})
	}

	private async getSearchTermFilter(searchTerm: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
			include: {
				subcategory: true
			}
		})
	}

	async getByStoreId(storeId: string) {
		return this.prisma.product.findMany({
			where: {
				storeId
			},
			include: {
				subcategory: true,
				colors: true
			}
		})
	}

	async getById(id: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
			include: {
				subcategory: true,
				colors: true,
				reviews: {
					include: {
						user: true
					}
				}
			}
		})

		if (!product) throw new NotFoundException('Товар не найден')

		return product
	}

	async getBySubcategory(subcategoryId: string) {
		const products = await this.prisma.product.findMany({
			where: {
				subcategory: {
					id: subcategoryId
				}
			},
			include: {
				subcategory: true
			}
		})

		if (!products) throw new NotFoundException('Товары не найдены')

		return products
	}

	async getByCategory(categoryId: string) {
		const allSubcategoryAndProducts = await this.prisma.category.findUnique({
			where: {
				id: categoryId
			},
			include: {
				subcategories: {
					include: {
						products: true
					}
				}
			}
		})

		if (!allSubcategoryAndProducts)
			throw new NotFoundException('Товары не найдены')

		const products = allSubcategoryAndProducts.subcategories.flatMap(
			subcategory => subcategory.products
		)

		return products
	}

	async getMostPopular() {
		const mostPopularProducts = await this.prisma.orderItem.groupBy({
			by: ['productId'],
			_count: {
				id: true
			},
			orderBy: {
				_count: {
					id: 'desc'
				}
			}
		})

		const productIds = mostPopularProducts.map(item => item.productId)

		const products = await this.prisma.product.findMany({
			where: {
				id: {
					in: productIds
				}
			},
			include: {
				subcategory: true
			}
		})

		return products
	}

	async getSimilar(id: string) {
		const currentProduct = await this.getById(id)

		if (!currentProduct) throw new NotFoundException('Текущий товар не найден')

		const products = await this.prisma.product.findMany({
			where: {
				subcategory: {
					title: currentProduct.subcategory.title
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				subcategory: true
			}
		})

		return products
	}

	async create(storeId: string, dto: ProductDto) {
		return this.prisma.product.create({
			data: {
				title: dto.title,
				description: dto.description,
				price: dto.price,
				images: dto.images,
				subcategoryId: dto.subcategoryId,
				colors: { connect: dto.colors },
				storeId
			}
		})
	}

	async update(id: string, dto: ProductDto) {
		return this.prisma.product.update({
			where: { id },
			data: {
				title: dto.title,
				description: dto.description,
				price: dto.price,
				images: dto.images,
				subcategoryId: dto.subcategoryId,
				colors: { connect: dto.colors }
			}
		})
	}

	async delete(id: string) {
		return this.prisma.product.delete({
			where: { id }
		})
	}
}
