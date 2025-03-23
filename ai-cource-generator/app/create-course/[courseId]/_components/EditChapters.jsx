'use client'
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuPencil } from "react-icons/lu";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import { CourseList } from "@/config/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { db } from "@/config/db";


const EditChapters = ({ index, course }) => {
  const router = useRouter();
  const Chapters = course?.courseOutput?.Chapters;
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Chapters && Chapters[index]) {
      setName(Chapters[index].ChapterName || "");
      setAbout(Chapters[index].About || "");
    }
  }, [Chapters, index]);

  const onUpdateHandler = async () => {
    if (!course?.courseOutput?.Chapters) return;
    
    try {
      setIsLoading(true);
      course.courseOutput.Chapters[index].ChapterName = name;
      course.courseOutput.Chapters[index].About = about;

      const result = await db
        .update(CourseList)
        .set({
          courseOutput: course?.courseOutput,
        })
        .where(eq(CourseList?.id, course?.id))
        .returning({ id: CourseList.id });

      router.refresh();
      setOpen(false); // Close the dialog after successful update
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!Chapters || !Chapters[index]) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          className="p-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white hover:opacity-90 transition-all shadow-sm cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LuPencil className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 sm:mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Chapter Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm sm:text-base"
              type="text"
              placeholder="Enter course title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Chapter About
            </label>
            <Textarea
              value={about}
              className="min-h-[120px] sm:min-h-[160px] text-sm sm:text-base resize-none"
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Enter AboutChapter"
            />
          </div>
        </div>
        
        <DialogFooter className="mt-6 flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onUpdateHandler}
            disabled={isLoading}
            className="flex-1 sm:flex-none bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white hover:opacity-90"
          >
            {isLoading ? "Updating..." : "Update Course"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapters; 