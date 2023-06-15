import router from '@/router'
import {defineStore} from 'pinia'
import {axiosApiInstance} from '@/api'
import type Offer from '@/types/Offer'
import type ErrorResponse from '@/types/ErrorResponse'
import OfferType from '@/types/OfferType'
import {checkFileSizes, clearValidationErrors, handleErrors} from '@/helpers'
import {type OfferResponse, type OffersResponse} from '@/types/Offer'
import type SuccessfulResponse from '@/types/SuccessfulResponse'

export const useOfferStore = defineStore('offer', {
	state: (): {
		offers: Offer[],
		type: OfferType|null,
		offer: Offer | null,
		loading: boolean,
		fetching: boolean,
		selecting: boolean,
		applying: boolean,
		success: string|null,
		error: string|null,
		info: string|null,
	} => ({
		offers: [],
		type: null,
		offer: null,
		loading: false,
		fetching: false,
		selecting: true,
		applying: false,
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
		async changeType(type: OfferType): Promise<void>{
			this.type = type
			this.selecting = false
			await this.load()
		},
		toggleSelecting(): void{
			this.selecting = !this.selecting
		},
		async load(): Promise<void>{
			clearValidationErrors()
			if(!this.loading){
				this.loading = true
				this.clearMessages()
				let url: string|null = null
				if (this.type === OfferType.Job){
					this.info = 'Loading job offers...'
					url = 'offers/job'
				}
				else if(this.type === OfferType.Scholarship){
					this.info = 'Loading scholarship offers...'
					url = 'offers/scholarship'
				}
				if(url){
					axiosApiInstance.get(url).then(({data}: OffersResponse): void => {
						this.offers = data
						this.clearMessages()
					}).catch((error: ErrorResponse): void => {
						this.offers = []
						handleErrors(error).then((message: string): void => {
							this.clearMessages()
							this.error = message
						}).catch((routeName: string): void => {
							router.push({name: routeName})
						})
					}).finally((): void => {
						this.loading = false
					})
				}
			}
		},
		async get(offerId: string): Promise<void>{
			let id: number = parseInt(offerId)
			let found: boolean = false
			for(let i: number = 0; !found && i < this.offers.length; i++){
				found = this.offers[i].id === id
				if(found){
					this.offer = this.offers[i]
				}
			}
			if(!found){
				await this.fetch(id)
			}
		},
		async fetch(id: number|null = null): Promise<void>{
			clearValidationErrors()
			if(!this.fetching){
				if(id || this.offer){
					if(!id && this.offer){
						id = this.offer.id
					}
					let url: string|null = null
					if (this.type === OfferType.Job){
						url = `offers/job/${id}/find`
					}
					else if(this.type === OfferType.Scholarship){
						url = `offers/scholarship/${id}/find`
					}
					if(url){
						this.fetching = true
						this.clearMessages()
						this.info = 'Reloading the offer...'
						axiosApiInstance.get(url).then(({data}: OfferResponse): void => {
							this.offer = data
							this.clearMessages()
							this.success = 'The offer has been reloaded.'
						}).catch((error: ErrorResponse): void => {
							this.offer = null
							handleErrors(error).then((message: string): void => {
								this.clearMessages()
								this.error = message
							}).catch((routeName: string): void => {
								router.push({name: routeName})
							})
						}).finally((): void => {
							this.fetching = false
						})
					}
				} else {
					this.clearMessages()
					this.error = 'No offer has been selected.'
				}
			}
		},
		async apply(files: FileList, comments: string|null = null, majorId: number|null = null): Promise<void>{
			clearValidationErrors()
			if(!this.applying && this.offer){
				if(checkFileSizes(files)){
					let url: string|null = null
					if (this.type === OfferType.Job){
						url = `offers/job/${this.offer.id}/apply`
					}
					else if(this.type === OfferType.Scholarship){
						url = `offers/scholarship/${this.offer.id}/apply`
					}
					if(url){
						this.applying = true
						this.clearMessages()
						this.info = 'Applying...'
						axiosApiInstance.post(url, {
							files: files,
							comments: comments,
							major_id: majorId,
						}, {
							headers: {
								'Content-Type': 'multipart/form-data'
							},
							withCredentials: true
						}).then(({data}: SuccessfulResponse): void => {
							this.clearMessages()
							if(data.res){
								if(this.offer){
									this.offer.has_applied = true
								}
								this.success = data.text
								if (this.type === OfferType.Job){
									router.push({name: 'offers.job'})
								} else if(this.type === OfferType.Scholarship){
									router.push({name: 'offers.scholarship'})
								}
							} else {
								this.error = data.text
							}
						}).catch((error: ErrorResponse): void => {
							handleErrors(error).then((message: string): void => {
								this.clearMessages()
								this.error = message
							}).catch((routeName: string): void => {
								router.push({name: routeName})
							})
						}).finally((): void => {
							this.applying = false
						})
					}	
				} else {
					this.clearMessages()
					this.error = 'Please select files of 8MB or less.'
				}
			}
		},
	}
})