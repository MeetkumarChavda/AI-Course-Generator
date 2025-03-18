import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  HiAcademicCap,
  HiClock,
  HiVideoCamera,
  HiDocumentText,
} from "react-icons/hi2";

export default function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const { theme } = useTheme();

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const options = [
    {
      id: "level",
      label: "Difficulty Level",
      icon: <HiAcademicCap />,
      type: "select",
      placeholder: "Select difficulty",
      options: [
        { value: "Beginner", label: "Beginner" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Advance", label: "Advanced" },
      ],
    },
    {
      id: "duration",
      label: "Course Duration",
      icon: <HiClock />,
      type: "select",
      placeholder: "Select duration",
      options: [
        { value: "1 hour", label: "1 Hour" },
        { value: "2 Hours", label: "2 Hours" },
        { value: "More than 3 hours", label: "More than 3 Hours" },
      ],
    },
    {
      id: "displayVideo",
      label: "Include Video Content",
      icon: <HiVideoCamera />,
      type: "select",
      placeholder: "Select option",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
    },
    {
      id: "noOfChapters",
      label: "Number of Chapters",
      icon: <HiDocumentText />,
      type: "input",
      placeholder: "Enter number of chapters",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-6 sm:mt-12"
    >
      <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
          03.
        </span>{" "}
        Course Details
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <div className="w-full sm:w-1/3">
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-full mr-2 sm:mr-3 bg-card shadow-sm">
                  {React.cloneElement(option.icon, {
                    size: 16,
                    className: `${
                      index === 0
                        ? "text-pink-500"
                        : index === 1
                        ? "text-purple-500"
                        : index === 2
                        ? "text-blue-500"
                        : "text-indigo-500"
                    }`,
                  })}
                </span>
                <label className="text-sm sm:text-base font-medium text-foreground">
                  {option.label}
                </label>
              </div>
            </div>

            <div className="w-full sm:w-2/3">
              {option.type === "select" ? (
                <Select
                  defaultValue={userCourseInput?.[option.id]}
                  onValueChange={(value) => handleInputChange(option.id, value)}
                >
                  <SelectTrigger className="h-9 sm:h-11 rounded-lg border-input bg-card focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-sm sm:text-base">
                    <SelectValue placeholder={option.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {option.options.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="text-sm sm:text-base"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type="number"
                  defaultValue={userCourseInput?.[option.id]}
                  className="h-9 sm:h-11 rounded-lg border-input bg-card focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-sm sm:text-base"
                  placeholder={option.placeholder}
                  onChange={(e) => handleInputChange(option.id, e.target.value)}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
