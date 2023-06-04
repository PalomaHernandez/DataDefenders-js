import type Model from '@/types/Model'
import type Major from '@/types/Major'

export default interface Department extends Model {
	name: string,
	majors: Major[],
}