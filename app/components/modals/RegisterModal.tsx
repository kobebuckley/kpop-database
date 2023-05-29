'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {useCallback, useState} from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal'

const RegisterModal = () => {
    const RegisterModal = useRegisterModal() 
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })



    return (
        <div></div>
    )
}

export default RegisterModal