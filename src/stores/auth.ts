import router from '@/router'
import {defineStore} from 'pinia'
import {type AccountConfirmed} from '@/types/Account'
import type ErrorResponse from '@/types/ErrorResponse'
import {axiosLoginInstance, axiosApiInstance} from '@/api'
import {clearValidationErrors, handleErrors} from '@/helpers'
import type SuccessfulResponse from '@/types/SuccessfulResponse'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loggingIn: false,
        loggingOut: false,
        registering: false,
    }),
    actions: {
        async register(account: AccountConfirmed):Promise<void> {
            clearValidationErrors()
            if(!this.registering){
                this.registering = true
                return axiosLoginInstance.get('sanctum/csrf-cookie').then(() => {
                    return axiosApiInstance.post('register', account).then(():void => {
                        this.authenticated = false
                        this.registering = false
                        router.push({name: 'login'})
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
                    this.registering = false
                })
            }
        },
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
