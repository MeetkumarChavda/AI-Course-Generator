"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import { TopicDescription } from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { GenrateCourceLayour_AI } from "../../configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";

const CreateCourse = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  /*
   * Used to check Next Button Enable or Disable Status
   */
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category == null ||
        userCourseInput?.category?.length == 0)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic == undefined ||
        userCourseInput?.topic?.length == 0)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChapters == undefined)
    ) {
      return true;
    }
    return false;
  };

  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 size={20} /> },
    { id: 2, name: "Topic", icon: <HiLightBulb size={20} /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck size={20} /> },
  ];

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT = `Generate A Course Tutorial on Following Detail with field as Course Name , Description , Along with Chapter Name , about , Duration : `;

    const USER_INPUT_PROMPT = `Category : ${userCourseInput?.category} , Topic : ${userCourseInput?.topic} , Level : ${userCourseInput?.level} , Duration : ${userCourseInput?.duration} , No Of Chapters : ${userCourseInput?.noOfChapters} in JSON Format`;

    const PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT}`;

    const result = await GenrateCourceLayour_AI.sendMessage(PROMPT);
    console.log(result.response?.text());
    console.log(JSON.parse(result.response?.text()));
    setLoading(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8">
      <div className="flex flex-col items-center mb-8 sm:mb-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <h2 className="bg-clip-text bg-gradient-to-r text-3xl text-transparent font-bold from-purple-500 sm:text-4xl to-blue-500">
            Create Your AI Course
          </h2>
          <p className="text-muted-foreground/80 text-sm mt-3 sm:mt-4 sm:text-base">
            Design a comprehensive learning experience in just three steps
          </p>
        </motion.div>

        {/* Enhanced Stepper */}
        <div className="flex justify-center w-full mt-6 px-4 sm:mt-10">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col w-[40px] duration-300 items-center md:w-[120px] sm:w-[50px] transition-all">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => index < activeIndex && setActiveIndex(index)}
                  className={`p-2 sm:p-4 rounded-full transition-colors duration-300 flex items-center justify-center cursor-pointer ${
                    activeIndex >= index
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/10"
                      : "bg-background dark:bg-gray-800/80 text-muted-foreground hover:bg-background/80 dark:hover:bg-gray-800/60"
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    size: window.innerWidth < 640 ? 16 : 20,
                  })}
                </motion.div>
                <h2 className="text-muted-foreground/80 text-xs font-medium hidden md:block mt-2 sm:mt-3 sm:text-sm">
                  {item.name}
                </h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-[2px] w-[30px] sm:w-[50px] md:w-[120px] rounded-full lg:w-[180px] transition-colors duration-500 ${
                    activeIndex > index
                      ? "bg-gradient-to-r from-purple-500 to-blue-500"
                      : "bg-border dark:bg-gray-800"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-4"
      >
        <Card className="bg-background/40 border-0 rounded-xl shadow-xl backdrop-blur-sm dark:bg-gray-900/40 overflow-hidden relative sm:rounded-2xl">
          {/* Subtle border gradient */}
          <div className="bg-gradient-to-br rounded-xl absolute from-purple-500/10 inset-0 sm:rounded-2xl to-blue-500/10" />

          {/* Progress bar */}
          <div
            className="bg-gradient-to-r h-1 duration-300 from-purple-500 relative to-blue-500 transition-all z-10"
            style={{ width: `${((activeIndex + 1) / 3) * 100}%` }}
          />

          <CardContent className="bg-background/30 p-4 backdrop-blur-md dark:bg-gray-900/30 md:p-8 relative sm:p-6 z-10">
            <div className="lg:px-20 mb-4 md:px-12 mt-2 px-2 sm:mb-8 sm:mt-4 sm:px-4">
              {/* Main Content */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px] sm:min-h-[350px]"
              >
                {activeIndex == 0 ? (
                  <SelectCategory />
                ) : activeIndex == 1 ? (
                  <TopicDescription />
                ) : activeIndex == 2 ? (
                  <SelectOption />
                ) : null}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between lg:px-20 md:px-12 mt-6 px-2 sm:mt-8 sm:px-4 sm:space-x-4 space-x-3">
              <motion.button
                disabled={activeIndex == 0}
                onClick={() => setActiveIndex(activeIndex - 1)}
                whileHover={activeIndex !== 0 ? { scale: 1.02 } : {}}
                whileTap={activeIndex !== 0 ? { scale: 0.98 } : {}}
                className={`
                  relative px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg font-medium text-sm sm:text-base
                  ${
                    activeIndex == 0
                      ? "opacity-50 cursor-not-allowed bg-background/50 dark:bg-gray-800/50 text-muted-foreground"
                      : "bg-background dark:bg-gray-800/80 hover:bg-background/90 dark:hover:bg-gray-800/60 text-foreground"
                  }
                `}
              >
                Previous
              </motion.button>

              {activeIndex < 2 ? (
                <motion.button
                  disabled={checkStatus()}
                  onClick={() => setActiveIndex(activeIndex + 1)}
                  whileHover={!checkStatus() ? { scale: 1.02 } : {}}
                  whileTap={!checkStatus() ? { scale: 0.98 } : {}}
                  className={`
                    relative px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg font-medium text-sm sm:text-base text-white
                    ${
                      checkStatus()
                        ? "opacity-50 cursor-not-allowed bg-gray-500/50"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 shadow-lg shadow-purple-500/10"
                    }
                  `}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  disabled={checkStatus()}
                  onClick={() => GenerateCourseLayout()}
                  whileHover={!checkStatus() ? { scale: 1.02 } : {}}
                  whileTap={!checkStatus() ? { scale: 0.98 } : {}}
                  className={`
                    relative px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg font-medium text-sm sm:text-base text-white whitespace-nowrap
                    ${
                      checkStatus()
                        ? "opacity-50 cursor-not-allowed bg-gray-500/50"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 shadow-lg shadow-purple-500/10"
                    }
                  `}
                >
                  <span className="flex gap-2 items-center">
                    Generate Course
                  </span>
                </motion.button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <div className="flex sm:space-x-4 space-x-3">
          {[0, 1, 2].map((step) => (
            <motion.div
              key={step}
              whileHover={{ scale: 1.2 }}
              onClick={() => step < activeIndex && setActiveIndex(step)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full cursor-pointer transition-all duration-300 ${
                step <= activeIndex
                  ? "bg-gradient-to-r from-purple-500 to-blue-500"
                  : "bg-border dark:bg-gray-800"
              }`}
            />
          ))}
        </div>
      </div>

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCourse;
