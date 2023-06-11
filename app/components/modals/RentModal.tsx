'use client'

import useRentModal from "@/app/hooks/useRentModal"

import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/Categoryinputs"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import Head from "next/head"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    YEAR = 5
}

const RentModal = () => {
    const router = useRouter()
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            trainingCount: 1,
            memberCount: 1, 
            songCount: 1,
            imageSrc: '',
            age: '',
            title: '',
            description: ''
        }
    })

    const category = watch('category');
    const location = watch('location');
    const trainingCount = watch('trainingCount');
    const memberCount = watch('memberCount');
    const songCount = watch('songCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
      }), [location]);
      
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.YEAR) {
            return onNext()
    }

    setIsLoading(true)

    axios.post('/api/listings', data)
    .then(() => {
        toast.success('Listing Created!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose() 
    })
    .catch(() => {
        toast.error('Something went wrong')
    }).finally(() => {
        setIsLoading(false)
    })
}

    const actionLabel = useMemo(() => {
        if(step === STEPS.YEAR) {
            return 'Create'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'

    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
              title="Which of these groups is the member a part of?"
              subtitle="Pick a group" 
            />
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
              "
            >
                {categories.map((item) => (
                    <div key = {item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => 
                                setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}

            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = ( 
            <div className="flex flex-col gap-8">
                <Heading
                  title="What country was your member born in?"
                  subtitle="Help fans find your member profile!" 
                />
                <CountrySelect
                  value={location}
                  onChange={(value) => setCustomValue('location',value)}                   
                />
                <Map
                  center={location?.latlng}
                 />
            </div>
        )
    }


    if ( step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                  title="Share some basic info about your member"
                  subtitle="Please use the Plus and Minus buttons" 
                />
                <Counter 
                  title="Training"
                  subtitle="How many months of training did they have?"
                  value={trainingCount}
                  onChange={(value) => setCustomValue('trainingCount', value)}
                  />
                  <hr />
        
                <Counter 
                  title="Fellow Members"
                  subtitle="How many other members are in their group??"
                  value={memberCount}
                  onChange={(value) => setCustomValue('memberCount', value)}
                  />
                  <hr />
   
                <Counter 
                  title="Songs"
                  subtitle="How many songs are they a part of?"
                  value={songCount}
                  onChange={(value) => setCustomValue('songCount', value)}
                  />
                  <hr />
            </div>
        )
    }

    if ( step === STEPS.IMAGES ) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                  title="Add a photo of your member"
                  subtitle="Show us your favorite photo of the member" 
                />
                <ImageUpload
                  value={imageSrc}
                  onChange={(value) => setCustomValue('imageSrc', value)} 
                /> 
            </div>
        )
    }

    if ( step === STEPS.DESCRIPTION ) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                  title="How would you describe your member?"
                  subtitle="Simple summary works best here" 
                />
                <Input
                  id="title"
                  label="Title"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required 
                />
                <hr />
                <Input
                  id="description"
                  label="Description"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required 
                />
            </div>
        )
    }

    if ( step === STEPS.YEAR) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                  title="(PLACEHOLDER - instead of net worth ... ) Now enter your member's net worth"
                  subtitle="What is you estimate of this member's net worth?" 
                /> 
                <Input
                  id="networth"
                  label="Networth"
                  formatPrice={true}
                  type="number"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
            </div>
        )
    }


    return (
        <Modal 
           isOpen={rentModal.isOpen}
           onClose={rentModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           actionLabel={actionLabel}
           secondaryActionLabel={secondaryActionLabel}
           secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
           title="Add Member Profiles!"
           body={bodyContent}
        />
    )
}

export default RentModal
