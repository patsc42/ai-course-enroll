import { UserProfile, GeneratedCoursePlan, SyllabusWeek, CohortOption } from "../types";

// STATIC CONTENT: Base definitions without specific days hardcoded in the string if possible, 
// or we replace them dynamically.
// Designed for Beginners/Intermediates to build a strong foundation in 2025.

const BASE_SYLLABUS = [
  {
    weekNumber: 1,
    title: "AI Foundations & Neural Nets",
    description: "Understanding the math and code that powers intelligence.",
    topics: [
      "{Day1}: Python for AI & The History of Machine Learning",
      "{Day2}: Neurons, Layers, and Building your first Neural Network in PyTorch"
    ]
  },
  {
    weekNumber: 2,
    title: "Computer Vision & NLP Basics",
    description: "How machines see and understand language.",
    topics: [
      "{Day1}: Convolutional Neural Networks (CNNs) & Image Classification",
      "{Day2}: Intro to NLP: Embeddings, RNNs, and the path to Transformers"
    ]
  },
  {
    weekNumber: 3,
    title: "The Generative AI Revolution",
    description: "Mastering LLMs and Image Generation models.",
    topics: [
      "{Day1}: Transformers Architecture & Large Language Models (LLMs)",
      "{Day2}: Diffusion Models & Generating Art with Code"
    ]
  },
  {
    weekNumber: 4,
    title: "Building Real-World Apps",
    description: "From theory to production-ready applications.",
    topics: [
      "{Day1}: Prompt Engineering & RAG (Retrieval Augmented Generation)",
      "{Day2}: Capstone Project: Building a Chatbot with API Integration"
    ]
  }
];

export const getCoursePreview = (): { week: number; title: string; description: string }[] => {
  return BASE_SYLLABUS.map(w => ({
    week: w.weekNumber,
    title: w.title,
    description: w.description
  }));
};

export const getCourseSyllabus = async (user: UserProfile): Promise<GeneratedCoursePlan> => {
  // Minimal delay to smooth UI transition
  await new Promise(resolve => setTimeout(resolve, 800));

  const firstName = user.name.split(' ')[0];
  
  // Determine days based on cohort choice
  const isWeekend = user.cohort === CohortOption.WEEKEND_MORNING;
  const day1 = isWeekend ? "Saturday" : "Tuesday";
  const day2 = isWeekend ? "Sunday" : "Thursday";

  // Generate dynamic syllabus
  const dynamicWeeks: SyllabusWeek[] = BASE_SYLLABUS.map(week => ({
    ...week,
    topics: week.topics.map(topic => 
      topic.replace("{Day1}", day1).replace("{Day2}", day2)
    )
  }));

  const timeString = isWeekend ? "Mornings (10am - 12pm)" : "Evenings (7pm - 9pm)";

  return {
    welcomeMessage: `Welcome, ${firstName}! You've secured your spot in the ${user.cohort} cohort. Get ready for 4 weeks of intensive learning, every ${day1} and ${day2} ${timeString}.`,
    weeks: dynamicWeeks
  };
};
