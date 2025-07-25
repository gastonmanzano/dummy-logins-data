import { Model, Document, PopulateOptions } from 'mongoose';

interface PaginationOptions {
	/**
	 * Página actual de los resultados.
	 *
	 * @default 1
	 */
	page?: number;

	/**
	 * Número de resultados por página.
	 *
	 * @default 10
	 */
	limit?: number;

	/**
	 * Orden de los resultados. Un objeto donde las claves son los campos
	 * y los valores son 1 para orden ascendente y -1 para descendente.
	 *
	 * Ejemplo: { createdAt: -1, price: 1 }
	 */
	sort?: Record<string, 1 | -1>;

	/**
	 * Filtros dinámicos a aplicar a la consulta. Un objeto donde las claves son los campos a filtrar
	 * y los valores son los valores a buscar. Se pasa directamente a `model.find()` de Mongoose.
	 *
	 * Ejemplo: { isActive: true }
	 */
	filter?: Record<string, any>;

	/**
	 * Nombre de coleccion para popular campos dentro del modelo.
	 *
	 * Ejemplo: 'collectionName'
	 */
	populate?: string;
}

interface PaginatedResult<T> {
	/**
	 * Los datos obtenidos según los filtros y la paginación.
	 */
	data: T[];

	/**
	 * El total de registros que coinciden con los filtros aplicados.
	 */
	total: number;

	/**
	 * La página actual que se está mostrando.
	 */
	page: number;

	/**
	 * El número total de páginas basado en el número de registros y el límite.
	 */
	totalPages: number;
}

/**
 * Realiza una consulta paginada en un modelo de Mongoose, aplicando filtros y ordenamiento.
 *
 * Este método combina dos consultas: una para obtener los datos según los filtros y otra
 * para obtener el conteo total de los documentos. Ambas consultas se ejecutan de manera paralela
 * para optimizar el rendimiento.
 *
 * @param {Model<T & Document>} model - El modelo de Mongoose sobre el cual se hará la consulta.
 * @param {PaginationOptions} options - Las opciones para realizar la paginación, ordenamiento y filtrado.
 *
 * @returns {Promise<PaginatedResult<T>>} - Los datos de la consulta paginada junto con metadatos como el número total de resultados y páginas.
 */
export const paginate = async <T>(
	model: Model<T & Document>,
	{ page = 1, limit = 10, sort = {}, filter = {}, populate }: PaginationOptions
): Promise<PaginatedResult<T>> => {
	const total = await model.countDocuments(filter).exec();
	const totalPages = Math.max(Math.ceil(total / limit), 1);

	page = Math.min(page, totalPages);

	// Calcular cuántos documentos se deben saltar
	const skip = (page - 1) * limit;

	let query = model.find(filter).sort(sort).skip(skip).limit(limit);

	if (populate) {
		query = query.populate(populate);
	}

	const data = await query.exec();
	return {
		data,
		total,
		page,
		totalPages: Math.ceil(total / limit), // Calcular el número total de páginas
	};
};