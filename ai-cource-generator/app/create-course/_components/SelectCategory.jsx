import React, { useContext } from "react";
import CategoryList from "../_shared/CategoryList";
import Image from "next/image";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const { theme } = useTheme();

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category: category }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          01.
        </span>{" "}
        Select Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {CategoryList.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className={`
              relative px-4 sm:px-5 py-4 sm:py-6 rounded-xl
              ${
                userCourseInput?.category === item.name
                  ? `bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 dark:from-pink-500/20 dark:via-purple-500/20 dark:to-blue-500/20 
                   ring-1 ring-pink-500/30 dark:ring-pink-500/50`
                  : `bg-background/50 dark:bg-gray-800/50 hover:bg-background/70 dark:hover:bg-gray-800/70 
                   border border-border/5 dark:border-white/5`
              }
              backdrop-blur-sm transition-all duration-200 cursor-pointer
            `}
            onClick={() => handleCategoryChange(item.name)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative w-8 sm:w-10 h-8 sm:h-10 flex-shrink-0 rounded-full overflow-hidden bg-background/80 dark:bg-gray-900/80 p-1.5 ring-1 ring-border/10 dark:ring-white/10">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm sm:text-base font-medium text-foreground/90">
                {item.name}
              </span>
            </div>

            {userCourseInput?.category === item.name && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/50"
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SelectCategory;
