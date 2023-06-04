import type Model from '@/types/Model'
import type Offer from '@/types/Offer'
import type Account from '@/types/Account'
import type UserComment from '@/types/Comment'
import type DocumentationFile from '@/types/DocumentationFile'
import type ApplicationStatus from '@/types/ApplicationStatus'

export default interface Application extends Model {
	user_id: number,
	offer_id: number,
	offer_type: string,
	status: ApplicationStatus,
	user: Account,
	offer: Offer,
	comments: UserComment[],
	documentation_files: DocumentationFile[],
	is_job: boolean,
	is_scholarship: boolean,
}

export interface ApplicationsResponse {
	data: Application[],
}

export interface ApplicationResponse {
	data: Application,
}