"use client";
import { Button } from "@/components/ui/button";
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

const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

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
    if (activeIndex == 0 &&(userCourseInput?.category == null ||userCourseInput?.category?.length == 0)) {
      return true;
    }
    if (activeIndex == 1 &&(userCourseInput?.topic == undefined ||userCourseInput?.topic?.length == 0)) {
      return true;
    }
    else if (activeIndex == 2 &&(userCourseInput?.level == undefined ||userCourseInput?.duration == undefined ||userCourseInput?.displayVideo == undefined ||userCourseInput?.noOfChapters == undefined)) {
      return true;
    }
    return false;
  };

  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 /> },
    { id: 2, name: "Topic", icon: <HiLightBulb /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck /> },
  ];

  const categories = [
    { id: 1, name: "Programming" },
    { id: 2, name: "Health" },
    { id: 3, name: "Creative" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col items-center space-y-6 mb-12">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= index ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                    activeIndex - 1 >= index && "bg-gray-900"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Main Content */}
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : activeIndex == 2 ? (
          <SelectOption />
        ) : null}

        {/* Navigation Buttons */}

        <div className="flex justify-between mt-8">
          <Button
            disabled={activeIndex == 0}
            // variant='outlined'
            onClick={() => setActiveIndex(activeIndex - 1)}
            className="mt-8"
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
            
              disabled={ checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="mt-8"
            >
              Next
            </Button>
          )}

          {activeIndex == 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="mt-8"
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
