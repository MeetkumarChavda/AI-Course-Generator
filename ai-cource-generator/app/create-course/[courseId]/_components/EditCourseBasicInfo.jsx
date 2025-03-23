import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion";
import { LuPencil } from "react-icons/lu";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { CourseList } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

const EditCourseBasicInfo = ({course}) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setName(course?.courseOutput?.CourseName);
        setDescription(course?.courseOutput?.Description);
    }, [course]);

    const onUpdateHandler = async() => {
        try {
            setIsLoading(true);
            course.courseOutput.CourseName = name;
            course.courseOutput.Description = description;
            const result = await db.update(CourseList).set({
                courseOutput: course?.courseOutput
            }).where(eq(CourseList?.id, course?.id))
            .returning({id:CourseList.id});

            // Force a re-render by refreshing the page data
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating course:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <motion.div
                    className="p-1.5 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white hover:opacity-90 transition-all cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <LuPencil className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent">
                        Edit Course Basic Info
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your course information below.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4 sm:mt-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Course Title
                        </label>
                        <Input 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="text-sm sm:text-base"
                            type='text' 
                            placeholder='Enter course title'
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Course Description
                        </label>
                        <Textarea  
                            className="min-h-[120px] sm:min-h-[160px] text-sm sm:text-base resize-none"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder='Enter course description'
                        />
                    </div>
                </div>
                
                <DialogFooter className="mt-6 flex gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 sm:flex-none"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onUpdateHandler}
                        disabled={isLoading}
                        className="flex-1 sm:flex-none bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white hover:opacity-90"
                    >
                        {isLoading ? 'Updating...' : 'Update Course'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseBasicInfo