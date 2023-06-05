import type Model from '@/types/Model'
import type Major from '@/types/Major'
import type Department from '@/types/Department'
import type Application from '@/types/Application'

export default interface Offer extends Model {
	title: string,
	description: string,
	requirements: string,
	is_scholarship_offer: boolean,
	is_job_offer: boolean,
	has_applied: boolean,
	applications: Application[],
	accepted_applications: Application[],
	pending_applications: Application[],
	documentation_applications: Application[],
	rejected_applications: Application[],
}

export interface JobOffer extends Offer {
	benefits: string,
	interview_at: string,
	department_id: number,
	department: Department,
}

export interface ScholarshipOffer extends Offer {
	starts_at: string,
	ends_at: string,
	majors: Major[],
}

export interface OffersResponse {
	data: Offer[],
}

export interface OfferResponse {
	data: Offer,
}