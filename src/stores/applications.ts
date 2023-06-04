import axios from 'axios'
import router from '@/router'
import {defineStore} from 'pinia'
import OfferType from '@/types/OfferType'
import {apiUrl, axiosApiInstance} from '@/api'
import type Application from '@/types/Application'
import {type ApplicationResponse, type ApplicationsResponse} from '@/types/Application'
import type PdfResponse from '@/types/PdfResponse'
import type ErrorResponse from '@/types/ErrorResponse'
import ApplicationStatus from '@/types/ApplicationStatus'
import type DocumentationFile from '@/types/DocumentationFile'
import {type DocumentationFilesResponse} from '@/types/DocumentationFile'
import {checkFileSizes, clearValidationErrors, handleErrors} from '@/helpers'

export const useApplicationStore = defineStore('application', {
	state: (): {
		type: OfferType,
		status: ApplicationStatus,
		applications: Application[],
		application: Application | null,
		documentationFile: string | null,
		loading: boolean,
		filtering: boolean,
		fetching: boolean,
		fetchingComments: boolean,
		fetchingDocumentationFile: boolean,
		uploading: boolean
	} => ({
		type: OfferType.All,
		status: ApplicationStatus.All,
		applications: [],
		application: null,
		documentationFile: null,
		loading: false,
		filtering: false,
		fetching: false,
		fetchingComments: false,
		fetchingDocumentationFile: false,
		uploading: false,
	}),
	actions: {
		async switchType(type: OfferType): Promise<void>{
			this.type = type
			this.toggleFiltering()
			await this.load()
		},
		async switchStatus(status: ApplicationStatus): Promise<void>{
			this.status = status
			this.toggleFiltering()
			await this.load()
		},
		toggleFiltering(){
			this.filtering = !this.filtering
		},
		async load(): Promise<void>{
			clearValidationErrors()
			if(!this.loading){
				this.loading = true
				let url: string|null = null
				if(this.type === OfferType.Job){
					url = `applications/job/${this.status}`
				} else if(this.type === OfferType.Scholarship){
					url = `applications/scholarship/${this.status}`
				} else if(this.type === OfferType.All){
					url = `applications/${this.status}`
				}
				if(url){
					axiosApiInstance.get(url).then(({data}: ApplicationsResponse): void => {
						this.applications = data
					}).catch((error: ErrorResponse): void => {
						this.applications = []
						handleErrors(error).then((message: string): void => {
							alert(message)
						}).catch((routeName: string): void => {
							router.push({name: routeName})
						})
					}).finally((): void => {
						this.loading = false
					})
				} else {
					alert('Oops! Something went wrong!')
				}
			}
		},
		async get(applicationId: string): Promise<void>{
			let id: number = parseInt(applicationId)
			let found: boolean = false
			for(let i: number = 0; !found && i < this.applications.length; i++){
				found = this.applications[i].id === id
				if(found){
					this.application = this.applications[i]
				}
			}
			if(!found){
				await this.fetch(id)
			}
		},
		async fetch(id: number | null = null): Promise<void>{
			clearValidationErrors()
			if(!this.fetching){
				if(id || this.application){
					if(!id && this.application){
						id = this.application.id
					}
					this.fetching = true
					axiosApiInstance.get(`applications/${id}/find`).then(({data}: ApplicationResponse): void => {
						this.application = data
					}).catch((error: ErrorResponse): void => {
						this.application = null
						handleErrors(error).then((message: string): void => {
							alert(message)
						}).catch((routeName: string): void => {
							router.push({name: routeName})
						})
					}).finally((): void => {
						this.fetching = false
					})
				} else {
					alert('No application has been selected.')
				}
			}
		},
		async getDocumentationFile(documentationFileId: string): Promise<void>{
			let found: boolean = false
			this.documentationFile = null
			if(this.application){
				for(let i: number = 0; !found && i < this.application.documentation_files.length; i++){
					found = this.application.documentation_files[i].id === parseInt(documentationFileId)
					if(found){
						await this.fetchDocumentationFile(this.application.documentation_files[i].id.toString())
					}
				}
			}
			if(!found){
				await this.fetchDocumentationFile(documentationFileId)
			}
		},
		async fetchDocumentationFile(id: string): Promise<void>{
			this.documentationFile = null
			clearValidationErrors()
			if(!this.fetchingDocumentationFile){
				this.fetchingDocumentationFile = true
				await axios.get(`${apiUrl}/api/applications/files/${id}/stream`, {
					headers: {
						Accept: 'application/pdf'
					},
					withCredentials: true,
				}).then(({data}: PdfResponse): void => {
					this.documentationFile = URL.createObjectURL(new Blob([data], {
						type: 'application/pdf'
					}))
				}).catch((error: ErrorResponse): void => {
					handleErrors(error).then((message: string): void => {
						alert(message)
					}).catch((routeName: string): void => {
						router.push({name: routeName})
					})
				}).finally(() => {
					this.fetchingDocumentationFile = false
				})
			}
		},
		async upload(files: FileList): Promise<void>{
			if(!this.uploading && this.application){
				if(checkFileSizes(files)){
					this.uploading = true
					axiosApiInstance.post(`applications/${this.application.id}/review`, {
						files: files
					}, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}).then(async ({data}: DocumentationFilesResponse): Promise<void> => {
						if(data.res && this.application){
							this.application.status = ApplicationStatus.Pending
							let file: DocumentationFile
							for(file of data.files){
								this.application.documentation_files.unshift(file)
							}
							alert(data.text)
							await router.push({name: 'applications.show', params: {id: this.application.id}})
						} else {
							alert(data.text)
						}
					}).catch((error: ErrorResponse): void => {
						handleErrors(error).then((message: string): void => {
							alert(message)
						}).catch((routeName: string): void => {
							router.push({name: routeName})
						})
					}).finally((): void => {
						this.uploading = false
					})
				} else {
					alert('Please select files of 8MB or less.')
				}
			}
		},
	}
})
