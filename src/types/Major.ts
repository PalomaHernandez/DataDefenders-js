import type Model from '@/types/Model'
import type Department from '@/types/Department'

export default interface Major extends Model {
	name: string,
	department_id: number,
	department: Department
}