import type Model from '@/types/Model'

export default interface Account extends Model {
	first_name: string,
	middle_name: string|null,
	last_name: string,
	email: string,
	password: string,
	phone: string,
	address_line_1: string,
	address_line_2: string|null,
	city: string,
	region: string,
	country: string,
	postal_code: string,
	id_card: string,
}

export interface AccountConfirmed extends Account {
	password_confirmation: string,
}

export interface AccountResponse {
    data: {
		res: boolean,
		text: string,
		user: Account,
	},
}