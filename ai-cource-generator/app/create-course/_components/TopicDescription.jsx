import React, { useContext } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const { theme } = useTheme();

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-6 sm:mt-12"
    >
      <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          02.
        </span>{" "}
        Course Content
      </h2>

      <div className="space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
          <label className="block text-sm sm:text-base font-medium text-foreground">
            Course Topic
          </label>
          <Input
            placeholder="Enter course topic"
            className="h-9 sm:h-11 rounded-lg border-input bg-card focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-sm sm:text-base"
            defaultValue={userCourseInput?.topic}
            onChange={(e) => handleInputChange("topic", e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="space-y-2"
        >
          <div className="flex justify-between">
            <label className="block text-sm sm:text-base font-medium text-foreground">
              Course Description
            </label>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Optional
            </span>
          </div>
          <Textarea
            placeholder="Enter course description"
            className="min-h-[120px] sm:min-h-[160px] rounded-lg border-input bg-card resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-sm sm:text-base"
            defaultValue={userCourseInput?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Provide details about what the course should cover and who it's for
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
