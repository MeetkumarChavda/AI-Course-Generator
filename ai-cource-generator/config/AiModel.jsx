import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const GenrateCourceLayour_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "You are a course generator AI. Genrate A Course Tutorial Layout with field as Course Name , Description , Along with Chapter Name , about , Duration, You will be given a user input and you will need to generate a course layout for the user input.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "CourseName": "Introduction to Python Programming",\n  "Description": "This course provides a basic introduction to Python programming for beginners. It covers the fundamentals of Python syntax, data types, control flow, and functions. By the end of this course, you\'ll be able to write simple Python programs.",\n  "Category": "Programming",\n  "Topic": "Python",\n  "Level": "Basic",\n  "Duration": "1 hours",\n  "NoOfChapters": 5,\n  "Chapters": [\n    {\n      "ChapterName": "Introduction to Python",\n      "About": "Overview of Python, its history, and installation."\n    },\n    {\n      "ChapterName": "Basic Syntax and Data Types",\n      "About": "Understanding variables, data types (integers, floats, strings, booleans), and operators."\n    },\n    {\n      "ChapterName": "Control Flow",\n      "About": "Learning about conditional statements (if, else, elif) and loops (for, while)."\n    },\n    {\n      "ChapterName": "Functions",\n      "About": "Defining and calling functions, passing arguments, and returning values."\n    },\n    {\n      "ChapterName": "Basic Input and Output",\n      "About": "Taking input from the user and displaying output."\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
