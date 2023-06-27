import dayjs from 'dayjs'
import type ErrorResponse from '@/types/ErrorResponse'
import ApplicationStatus from '@/types/ApplicationStatus'

export const handleErrors: (error: ErrorResponse) => Promise<string> = async ({response}: ErrorResponse):Promise<string> => {
	return new Promise<string>(async (resolve, reject):Promise<void> => {
		if(response.status === 401){
			resolve('Oops! You are not authorized to perform this action!')
		} else if(response.status === 403){
			resolve('Oops! You do not have access to this feature!')
		} else if(response.status === 404){
			resolve('Oops! We could not find this page!')
		} else if(response.status === 410){
			resolve('Oh no! You waited too long, this content is gone!')
		} else if(response.status === 419){
			reject('login')
		} else if(response.status === 422){
			let attrErrors = response.data.errors
			for(const attr in attrErrors){
				let messages = Array.from(attrErrors[attr as keyof typeof attrErrors])
				for(let i = 0; i < messages.length; i++){
					if(document.getElementById(attr)){
						let tag = document.getElementById(attr)
						if(tag){
							if(tag.tagName.toLowerCase() === 'div'){
								let firstChild = tag.children.item(0)
								if(firstChild){
									firstChild.classList.add('is-invalid')
								}
							} else {
								tag.classList.add('is-invalid')
							}
						}
					}
					let errorElement = document.getElementById(`${attr}-error`)
					if(errorElement){
						errorElement.innerText = messages[i] as string
					}
				}
			}
			resolve('Please fill all the required information!')
		} else if(response.status === 500){
			resolve('The server could not process your request! Please try again later.')
		} else if(response.status === 503){
			resolve('The server is under maintenance! Please try again later.')
		} else if(response.status === 504){
			resolve('Your request was too large for our server to handle! Please try again later or contact us.')
		}
	})
}

export function clearValidationErrors(): void{
	let invalidTags:HTMLCollectionOf<Element> = document.getElementsByClassName('is-invalid')
	for(let invalidTag of invalidTags){
		invalidTag.classList.remove('is-invalid')
	}
	let invalidTextTags:HTMLCollectionOf<Element> = document.getElementsByClassName('is-invalid-text')
	for(let invalidText of invalidTextTags){
		(invalidText as HTMLElement).innerText = ''
	}
}

export function printDate(timestamp: string|null): string{
	if(timestamp){
		return dayjs(timestamp).format('MM/DD/YYYY')
	}
	return dayjs().format('MM/DD/YYYY')
}

export function printDateTime(timestamp: string|null): string{
	if(timestamp){
		return dayjs(timestamp).format('MM/DD/YYYY HH:mm')
	}
	return dayjs().format('MM/DD/YYYY HH:mm')
}

export function checkFileSizes(files: FileList):boolean {
	let pass: boolean = true
	for(let i: number = 0; pass && i < files.length; i++){
		pass = files[i].size <= 8 * 1024 * 1024
	}
	return pass
}

export function isAccepted(status: string):boolean{
	return status === ApplicationStatus.Accepted
}

export function isPayment(status: string):boolean{
	return status === ApplicationStatus.Payment
}

export function isPending(status: string):boolean{
	return status === ApplicationStatus.Pending
}

export function isDocumentation(status: string):boolean{
	return status === ApplicationStatus.Documentation
}

export function isRejected(status: string):boolean{
	return status === ApplicationStatus.Rejected
}