import axios from 'axios'
import router from '@/router'
import {defineStore} from 'pinia'
import {apiUrl, axiosApiInstance} from '@/api'
import type Offer from '@/types/Offer'
import type ErrorResponse from '@/types/ErrorResponse'
import OfferType from '@/types/OfferType'
import {checkFileSizes, clearValidationErrors, handleErrors} from '@/helpers'
import {type OfferResponse, type OffersResponse, type ScholarshipOffer, type JobOffer} from '@/types/Offer'
import type SuccessfulResponse from '@/types/SuccessfulResponse'

export const useOfferStore = defineStore('offer', {
	state: (): {
		offers: Offer[],
		type: OfferType,
		offer: Offer | null,
		loading: boolean,
		fetching: boolean,
		selecting: boolean,
		applying: boolean,
	} => ({
		offers: [],
		type: OfferType.Job,
		offer: null,
		loading: false,
		fetching: false,
		selecting: true,
		applying: false,
	}),
	actions: {
		changeType(type: OfferType): void{
			this.type = type
			this.selecting = false
			this.load()
		},
		async load(): Promise<void>{
			clearValidationErrors()
			if(!this.loading){
				this.loading = true
				let url: string|null = null
				if (this.type === OfferType.Job){
					url = 'offers/job'
				}
				else if(this.type === OfferType.Scholarship){
					url = 'offers/scholarship'
				}
				if(url){
					axiosApiInstance.get(url).then(({data}: OffersResponse): void => {
						this.offers = data
					}).catch((error: ErrorResponse): void => {
						this.offers = []
						handleErrors(error).then((message: string): void => {
							alert(message)
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
						axiosApiInstance.get(url).then(({data}: OfferResponse): void => {
							console.log(data)
							this.offer = data
						}).catch((error: ErrorResponse): void => {
							this.offer = null
							handleErrors(error).then((message: string): void => {
								alert(message)
							}).catch((routeName: string): void => {
								router.push({name: routeName})
							})
						}).finally((): void => {
							this.fetching = false
						})
					}
				} else {
					alert('No offer has been selected.')
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
						axiosApiInstance.post(url, {
							files: files,
							comments: comments,
							major_id: majorId,
						}, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}).then(({data}: SuccessfulResponse): void => {
							if(data.res){
								alert(data.text)
							}
						}).catch((error: ErrorResponse): void => {
							this.offer = null
							handleErrors(error).then((message: string): void => {
								alert(message)
							}).catch((routeName: string): void => {
								router.push({name: routeName})
							})
						}).finally((): void => {
							this.applying = false
						})
					}	
				} else {
					alert('Please select files of 8MB or less.')
				}
			}
		},
	}
})