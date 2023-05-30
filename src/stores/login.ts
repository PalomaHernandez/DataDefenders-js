import router from '@/router'
import {defineStore} from 'pinia'
import {axiosLoginInstance, axiosApiInstance} from '@/api'
import type SuccessfulResponse from '@/types/SuccessfulResponse'
import {clearValidationErrors, handleErrors} from '@/helpers'
import type ErrorResponse from "@/types/ErrorResponse";

export const useLoginStore = defineStore('login', {
    state: () => ({
        authenticated: false,
        loggingIn: false,
        loggingOut: false,
    }),
    actions: {
        async login(credentials: {email: string, password: string}):Promise<void> {
            clearValidationErrors()
            if(!this.loggingIn){
                this.loggingIn = true
                return axiosLoginInstance.get('sanctum/csrf-cookie').then(() => {
                    return axiosApiInstance.post('login', credentials).then(({data}: SuccessfulResponse):void => {
                        if(data.res){
                            this.authenticated = true
                            this.loggingIn = false
                            router.push({name: 'home'})
                        } else {
                            alert(data.text)
                        }
                    }).catch(error => {
                        throw error
                    })
                }).catch((error: ErrorResponse):void => {
                    handleErrors(error).then((message: string):void => {
                        alert(message)
                    }).catch((routeName: string):void => {
                        router.push({name: routeName})
                    })
                }).finally(():void => {
                    this.loggingIn = false
                })
            }
        },
        async logout():Promise<void> {
            clearValidationErrors()
            if(!this.loggingOut){
                this.loggingOut = true
                return axiosApiInstance.post('logout').then(():void => {
                    this.authenticated = false
                    this.loggingOut = false
                    router.push({name: 'login'})
                }).catch((error: ErrorResponse):void => {
                    handleErrors(error).then((message: string):void => {
                        alert(message)
                    }).catch((routeName: string):void => {
                        router.push({name: routeName})
                    })
                }).finally(():void => {
                    this.loggingOut = false
                })
            }
        }
    }
})
