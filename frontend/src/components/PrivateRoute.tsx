
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface Props {
	children:  JSX.Element | JSX.Element[] | React.ReactElement | React.ReactElement[] | string
}

const PrivateRoute = ({children}: Props) => {

    const {user, isAuthenticated} = useSelector((state: RootState) => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        console.log("EFFECT:: ",user)
        if(!isAuthenticated || !user){
            navigate('/login')
        }
    },[user, isAuthenticated ,navigate])

    return (<>{children}</>)
}

export default PrivateRoute