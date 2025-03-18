import React, { useContext } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { UserInputContext } from '@/app/_context/UserInputContext';

export const TopicDescription = () => {
  const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);
  
  const handleInputChange = (fieldName , value) =>{
    setUserCourseInput(prevState => ({...prevState, [fieldName]: value }));
  }
  
  return (
    <div>
        {/* Input Topice */}
        <div className='mt-5'>
            <label>Write the topic for which you want to generate a course</label>
            <Input placeholder={'Topic'} className='h-14 text-xl'
            defaultValue={userCourseInput?.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
            />
        </div>

        {/* Text area desc  */}
       <div className='mt-5'>
            <label>Write a brief description about the topic , what you want to include (Optional)</label>
            <Textarea placeholder={'Description'} 
            defaultValue={userCourseInput?.description}
            className='h-24 text-xl'
             onChange={(e) => handleInputChange('description', e.target.value)}
            />
        </div>
      
    </div>
  )
}
