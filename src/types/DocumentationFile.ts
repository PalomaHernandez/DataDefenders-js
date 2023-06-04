import type Model from '@/types/Model'
import type Application from '@/types/Application'

export default interface DocumentationFile extends Model {
	path: string,
	application_id: number,
	application: Application,
}

export interface DocumentationFilesResponse {
	data: {
		res: boolean,
		text: string,
		files: DocumentationFile[]
	}
}

export interface DocumentationFileResponse {
	data: DocumentationFile
}