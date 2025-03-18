import React from 'react'
import CategoryList from '../_shared/CategoryList'
import Image from 'next/image'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { useContext } from 'react'


const SelectCategory = () => {

    const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);

    const handleCategoryChange = (category) => {
        setUserCourseInput(prev => ({...prev,category:category}))
    }

  return (
    <div className='px-10 md:px-20'>
    <h2 className='text-2xl font-bold'>Select the Course Category</h2>

    <div className='grid grid-cols-3 gap-10 '>
        {CategoryList.map((item,index)=> (
            <div 
            className={`${userCourseInput?.category == item.name && 'bg-blue-300 border-gray-600'} flex flex-col p-5 border items-center rounded-xl hover:bg-blue-100 hover:border-gray-500 cursor-pointer`}
            onClick={()=>handleCategoryChange(item.name)}
            key={index}>
                <Image src={`${item.icon}`} alt={item.name} width={50} height={50} />
                <h3>{item.name}</h3>
            </div>
        ))}
    </div>
    </div>
  )
}

export default SelectCategory;