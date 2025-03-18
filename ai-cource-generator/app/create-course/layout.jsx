'use client'
import React, { useState } from 'react'
import { DashboardHeader } from '../dashboard/_components/DashboardHeader'
import { UserInputContext } from '../_context/UserInputContext'

const CreateCourseLayout = ({children}) => {
  
  const [userCourseInput ,setUserCourseInput] = useState([]);
  return (
    <div className='pt-4'>
      <UserInputContext.Provider value={{userCourseInput,setUserCourseInput}}>
        <>
        <DashboardHeader />
        {children}
        </>
        </UserInputContext.Provider>
    </div>
  )
}

export default CreateCourseLayout