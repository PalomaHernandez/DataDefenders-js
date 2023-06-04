import type Model from '@/types/Model'
import type Application from '@/types/Application'
import type Account from "@/types/Account";

export default interface UserComment extends Model {
	text: string,
	application_id: number,
	application: Application,
	user_id: number,
	user: Account,
}