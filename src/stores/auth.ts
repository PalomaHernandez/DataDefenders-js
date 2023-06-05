import router from '@/router'
import {defineStore} from 'pinia'
import type Account from '@/types/Account'
import type ErrorResponse from '@/types/ErrorResponse'
import {axiosApiInstance, axiosLoginInstance} from '@/api'
import {clearValidationErrors, handleErrors} from '@/helpers'
import {type AccountConfirmed, type AccountResponse} from '@/types/Account'

export const useAuthStore = defineStore('auth', {
	state: (): {
		authenticated: boolean,
		loggingIn: boolean,
		loggingOut: boolean,
		registering: boolean,
		currentAccount: Account | null,
		updating: boolean,
		success: string|null,
		error: string|null,
		info: string|null,
	} => ({
		authenticated: false,
		loggingIn: false,
		loggingOut: false,
		registering: false,
		currentAccount: null,
		updating: false,
		success: null,
		error: null,
		info: null,
	}),
	actions: {
		clearMessages(): void{
			this.info = null
			this.success = null
			this.error = null
		},
		showError(message: string): void{
			this.clearMessages()
			this.error = message
		},
		async register(account: AccountConfirmed): Promise<void>{
			clearValidationErrors()
			if(!this.registering){
				this.registering = true
				this.clearMessages()
				this.info = 'Registering your new account...'
				return axiosLoginInstance.get('sanctum/csrf-cookie').then(() => {
					return axiosApiInstance.post('register', account).then((): void => {
						this.authenticated = false
						this.registering = false
						this.clearMessages()
						this.success = 'Your account has been created successfully!'
						router.push({name: 'login'})
					}).catch(error => {
						throw error
					})
				}).catch((error: ErrorResponse): void => {
					handleErrors(error).then((message: string): void => {
						this.clearMessages()
						this.error = message
					}).catch((routeName: string): void => {
						router.push({name: routeName})
					})
				}).finally((): void => {
					this.registering = false
				})
			}
		},
		async updateAccount(): Promise<void>{
			clearValidationErrors()
			if(this.currentAccount && !this.updating){
				this.updating = true
				this.clearMessages()
				this.info = 'Updating your account...'
				return axiosApiInstance.patch(`account/update/${this.currentAccount.id}`, this.currentAccount).then((): void => {
					this.clearMessages()
					this.success = 'The account was updated successfully.'
				}).catch((error: ErrorResponse): void => {
					handleErrors(error).then((message: string): void => {
						this.clearMessages()
						this.error = message
					}).catch((routeName: string): void => {
						router.push({name: routeName})
					})
				}).finally((): void => {
					this.updating = false
				})
			}
		},
		async login(credentials: { email: string, password: string }): Promise<void>{
			clearValidationErrors()
			if(!this.loggingIn){
				this.loggingIn = true
				this.clearMessages()
				this.info = 'Logging in...'
				return axiosLoginInstance.get('sanctum/csrf-cookie').then(() => {
					return axiosApiInstance.post('login', credentials).then(({data}: AccountResponse): void => {
						this.clearMessages()
						if(data.res){
							this.authenticated = true
							this.loggingIn = false
							this.currentAccount = data.user
							router.push({name: 'home'})
						} else {
							this.error = data.text
						}
					}).catch(error => {
						throw error
					})
				}).catch((error: ErrorResponse): void => {
					handleErrors(error).then((message: string): void => {
						this.clearMessages()
						this.error = message
					}).catch((routeName: string): void => {
						router.push({name: routeName})
					})
				}).finally((): void => {
					this.loggingIn = false
				})
			}
		},
		async logout(): Promise<void>{
			clearValidationErrors()
			if(!this.loggingOut){
				this.loggingOut = true
				this.clearMessages()
				this.info = 'Logging out...'
				return axiosApiInstance.post('logout').then((): void => {
					this.authenticated = false
					this.loggingOut = false
					this.clearMessages()
					this.success = 'You have logged out successfully!'
					router.push({name: 'login'})
				}).catch((error: ErrorResponse): void => {
					handleErrors(error).then((message: string): void => {
						this.clearMessages()
						this.error = message
					}).catch((routeName: string): void => {
						router.push({name: routeName})
					})
				}).finally((): void => {
					this.loggingOut = false
				})
			}
		}
	}
})
