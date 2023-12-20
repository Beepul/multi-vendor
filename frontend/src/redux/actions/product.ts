import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import lwpAxios from "../../config/axiosConfig";

interface ProductData {
    shopId?: string;
    name: string;
    description: string;
    category: string;
    tags?: string;
    originalPrice: number;
    discountPrice?: number;
    stock: number;

}


export const createProductAsync = createAsyncThunk('product/create',async (productData:ProductData) => {
    try {
        console.log("Before::", productData)
        const res = await lwpAxios.post('/product/create', productData, {
            withCredentials: true
        })
        console.log("After::", res)
        return res.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error('Failed to create product:' + error.response?.data.message)
        }else{
            return Promise.reject()
        }
    }
})