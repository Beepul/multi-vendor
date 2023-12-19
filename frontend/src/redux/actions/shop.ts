import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import lwpAxios from "../../config/axiosConfig";

interface LoginData {
    email: string;
    password: string;
    rememberMe?: Boolean;
}

interface RegistrationData {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    zipCode: string;
    password: string
}

export const shopLoginAsync = createAsyncThunk('shop/login', async (loginData: LoginData) => {
    try {
        const res = await lwpAxios.post('/shop/login', loginData, {
            withCredentials: true
        })
        return res.data 
    } catch (error: unknown) {
        if(error instanceof AxiosError){
            throw new Error('Login failed:' + error.response?.data.message)
        }else{
            return Promise.reject()
        }
    }
})


export const shopRegisterAsync = createAsyncThunk('shop/register',async (data: RegistrationData) => {
    try {
        const res = await lwpAxios.post('/shop/create', data)
        return res.data
    } catch (error: unknown) {
        if(error instanceof AxiosError){
            throw new Error('Registration faild:' + error.response?.data.message)
        }else{
            return Promise.reject()
        }
    }
})


export const shopActivateAsync = createAsyncThunk('shop/activation', async (token: string) => {
    try {
        const res = await lwpAxios.get(`/shop/activation/${token}`)
        return res.data
    } catch (error: unknown) {
        if(error instanceof AxiosError){
            throw new Error('Registration faild:' + error.response?.data.message)
        }else{
            return Promise.reject()
        }
    }
})


export const autoShopLoginAsync = createAsyncThunk('shop/autoLogin',async () => {
    try {
        const response = await lwpAxios.get('/shop', {
            withCredentials: true
        })
        return response.data
    } catch (error: unknown) {
        if(error instanceof AxiosError){
            throw new Error('Login failed: ' + error.response?.data.message)
        }else{
            return Promise.reject()
        }
    }
})