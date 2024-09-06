import { ConflictException, InternalServerErrorException } from '@nestjs/common'

export class ErrorHandlerService {
	static handleError(error: any, message?: string): never {
		if (error.code === 'P2002') {
			// Уникальное ограничение
			throw new ConflictException(message || 'Такая запись уже существует')
		} else {
			// Ловим остальные ошибки
			throw new InternalServerErrorException(message || 'Ошибка на сервере')
		}
	}
}
