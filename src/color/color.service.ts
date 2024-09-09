import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ColorDto } from './dto/color.dto'

@Injectable()
export class ColorService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.color.findMany()
	}

	async getById(id: string) {
		const color = await this.prisma.color.findUnique({
			where: {
				id
			}
		})

		if (!color) throw new NotFoundException('Цвет не найден')

		return color
	}

	async create(dto: ColorDto) {
		return this.prisma.color.create({
			data: {
				name: dto.name,
				value: dto.value
			}
		})
	}
	
	async update(id: string, dto: ColorDto) {
		return this.prisma.color.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		return this.prisma.color.delete({
			where: { id }
		})
	}
}
