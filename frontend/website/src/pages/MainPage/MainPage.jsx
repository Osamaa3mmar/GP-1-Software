import { Container } from "@mui/material";
import HeroSection from "../../component/Home/HeroSection";
import FeaturedCourses from "../../component/Home/FeaturedCourses";
import CategoriesGrid from "../../component/Home/CategoriesGrid";
import TopCompanies from "../../component/Home/TopCompanies";
import LearningPaths from "../../component/Home/LearningPaths";
import UpcomingSchedule from "../../component/Home/UpcomingSchedule";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useEffect, useState } from "react";
import { use } from "react";
import axios from "axios";

const expectedCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    thumbnail:
      "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["HTML", "CSS", "JavaScript"],
      category: "Web Development",
      level: "Beginner",
      prerequisites: ["Basic Computer Skills"],
    },
    learningOutcomes:
      "By the end of this course, you will be able to create responsive websites using HTML5, CSS3, and JavaScript. You will also understand web development best practices and be able to build real-world projects.",
    learningPath:
      "This course is part of the Web Development Bootcamp. After completing this course, you can proceed to the Advanced CSS Techniques course.",
    duration: 8,
    price: 99.99,
    enrollmentNumber: 156,
    teacher: { name: "John Doe", position: "Senior Web Developer" },
    isSchedulized: true,
    schedule: [
      { day: "Mon", startTime: "10:00 AM", endTime: "12:00 PM" },
      { day: "Wed", startTime: "10:00 AM", endTime: "12:00 PM" },
    ],
    rating: { value: 4.5, count: 1200 },
  },
  {
    id: 2,
    title: "Data Science with Python",
    thumbnail:
      "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Pandas", "NumPy", "Machine Learning"],
      category: "Data Science",
      level: "Intermediate",
      prerequisites: ["Python Basics", "Statistics"],
    },
    learningOutcomes:
      "Gain the skills to analyze data, build machine learning models, and interpret results using Python libraries.",
    learningPath:
      "Follow this course with Deep Learning with TensorFlow for advanced AI topics.",
    duration: 12,
    price: 149.99,
    enrollmentNumber: 98,
    teacher: { name: "Sara Chen", position: "Data Scientist" },
    isSchedulized: true,
    schedule: [
      { day: "Tue", startTime: "2:00 PM", endTime: "4:00 PM" },
      { day: "Thu", startTime: "2:00 PM", endTime: "4:00 PM" },
    ],
    rating: { value: 4.7, count: 87 },
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    thumbnail:
      "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["User Research", "Prototyping", "Figma"],
      category: "Design",
      level: "Beginner",
      prerequisites: ["None"],
    },
    learningOutcomes:
      "Understand user-centric design, wireframing, and prototyping using modern tools like Figma.",
    learningPath:
      "Leads into UX Research Methods or Advanced Figma for Designers courses.",
    duration: 6,
    price: 89.99,
    enrollmentNumber: 210,
    teacher: { name: "Alex Morgan", position: "UI/UX Designer" },
    isSchedulized: false,
    schedule: [],
    rating: { value: 4.3, count: 200 },
  },
  {
    id: 4,
    title: "Mobile App Development with Flutter",
    thumbnail:
      "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Flutter", "Dart", "Mobile UI"],
      category: "Mobile Development",
      level: "Intermediate",
      prerequisites: ["OOP Concepts", "Basic UI Design"],
    },
    learningOutcomes:
      "Build native mobile apps for Android and iOS using a single codebase with Flutter.",
    learningPath:
      "Prepare for the Advanced Flutter Animations course after completion.",
    duration: 10,
    price: 129.99,
    enrollmentNumber: 134,
    teacher: { name: "Emily Nguyen", position: "Mobile Developer" },
    isSchedulized: true,
    schedule: [{ day: "Sat", startTime: "9:00 AM", endTime: "12:00 PM" }],
    rating: { value: 4.6, count: 110 },
  },
  {
    id: 5,
    title: "DevOps and Continuous Integration",
    thumbnail:
      "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Docker", "CI/CD", "Jenkins"],
      category: "DevOps",
      level: "Advanced",
      prerequisites: ["Software Development Experience"],
    },
    learningOutcomes:
      "Learn how to implement CI/CD pipelines and automate deployments with Docker and Jenkins.",
    learningPath: "Next steps include Kubernetes and Infrastructure as Code.",
    duration: 14,
    price: 199.99,
    enrollmentNumber: 76,
    teacher: { name: "David Lee", position: "DevOps Engineer" },
    isSchedulized: true,
    schedule: [
      { day: "Mon", startTime: "6:00 PM", endTime: "8:00 PM" },
      { day: "Wed", startTime: "6:00 PM", endTime: "8:00 PM" },
    ],
    rating: { value: 4.8, count: 65 },
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    thumbnail:
      "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Network Security", "Encryption", "Risk Management"],
      category: "Cybersecurity",
      level: "Beginner",
      prerequisites: ["Basic Networking Knowledge"],
    },
    learningOutcomes:
      "Understand the fundamentals of cybersecurity, threats, vulnerabilities, and how to protect systems.",
    learningPath:
      "After this course, consider Ethical Hacking and Penetration Testing.",
    duration: 9,
    price: 109.99,
    enrollmentNumber: 182,
    teacher: { name: "Fatima Al-Hassan", position: "Cybersecurity Analyst" },
    isSchedulized: false,
    schedule: [],
    rating: { value: 4.4, count: 95 },
  },
];

const sampleCategories = [
  { id: 1, name: "Programming", icon: CodeIcon, count: 45 },
  { id: 2, name: "Design", icon: DesignServicesIcon, count: 32 },
  { id: 3, name: "Business", icon: BusinessCenterIcon, count: 28 },
  { id: 4, name: "Marketing", icon: TrendingUpIcon, count: 39 },
];

const sampleCompanies = [
  {
    id: 1,
    name: "Tech Corp",
    logo: "https://source.unsplash.com/random/100x100?tech",
  },
  {
    id: 2,
    name: "Design Hub",
    logo: "https://source.unsplash.com/random/100x100?design",
  },
  {
    id: 3,
    name: "Business Pro",
    logo: "https://source.unsplash.com/random/100x100?business",
  },
];

const samplePaths = [
  {
    id: 1,
    title: "Frontend Developer Track",
    description: "Master modern frontend development technologies",
    courses: 6,
    progress: 35,
  },
  {
    id: 2,
    title: "UX Designer Track",
    description: "Become a professional UI/UX designer",
    courses: 5,
    progress: 15,
  },
];

const sampleSchedule = [
  {
    id: 1,
    title: "React Masterclass",
    date: "2023-08-20",
    instructor: "Emma Wilson",
    company: "React Experts",
    duration: "2 weeks",
  },
  {
    id: 2,
    title: "Digital Marketing Bootcamp",
    date: "2023-08-22",
    instructor: "James Smith",
    company: "Marketing Pro",
    duration: "1 week",
  },
];

export default function MainPage() {
  const [featuredCourses, setfeaturedCourses] = useState([]);
  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4545/course/featuredcourses"
        );
        setfeaturedCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching featured courses:", error);
        throw error;
      }
    };

    fetchFeaturedCourses();
  }, []);
  return (
    <main>
      <HeroSection />

      <Container maxWidth="lg">
        <FeaturedCourses courses={featuredCourses} />
        <CategoriesGrid categories={sampleCategories} />
        <TopCompanies companies={sampleCompanies} />
        <LearningPaths paths={samplePaths} />
        <UpcomingSchedule schedule={sampleSchedule} />
      </Container>
    </main>
  );
}
