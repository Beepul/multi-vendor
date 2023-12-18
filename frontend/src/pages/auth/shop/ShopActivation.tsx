import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AppDispatch } from '../../../redux/store';
import { AxiosError } from 'axios';
import { shopActivateAsync } from '../../../redux/actions/shop';

const ShopActivation = () => {
    const {activationToken} = useParams()

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect( () => {
        if (activationToken) {
          const sendRequest = async ()  => {
            try {
              await dispatch(shopActivateAsync(activationToken))
              toast.success('User Activation Success')
              navigate('/')
            } catch (error: unknown) {
              const axiosError = error as AxiosError
              toast.error(axiosError.message || 'Error occured while activation')
              // console.log(error)
            }
          }
          sendRequest()
        }
      }, []);
  return (
    <div
        style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        }}
    >
    <div>Shop Activation Page</div>
  </div>
  )
}

export default ShopActivation