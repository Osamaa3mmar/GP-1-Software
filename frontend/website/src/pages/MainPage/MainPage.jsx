import { Container } from "@mui/material";
import HeroSection from "../../component/Home/HeroSection";
import FeaturedCourses from "../../component/Home/FeaturedCourses";
import CategoriesGrid from "../../component/Home/CategoriesGrid";
import TopCompanies from "../../component/Home/TopCompanies";
import LearningStats from "../../component/Home/LearningStats";
import ContinueLearning from "../../component/Home/ContinueLearning";
import TopStudents from "../../component/Home/TopStudents";
import { useEffect, useState } from "react";
import axios from "axios";

// Category Icons
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import ComputerIcon from "@mui/icons-material/Computer";
import LanguageIcon from "@mui/icons-material/Language";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PaletteIcon from "@mui/icons-material/Palette";
import WorkIcon from "@mui/icons-material/Work";
import QuizIcon from "@mui/icons-material/Quiz";
import ChildCareIcon from "@mui/icons-material/ChildCare";

// Sample data removed to fix linter errors

// Category icon mapping
const categoryIconMap = {
  "Technology & Programming": CodeIcon,
  "Mathematics & Science": ScienceIcon,
  "Business & Entrepreneurship": BusinessCenterIcon,
  "IT & Software Tools": ComputerIcon,
  "Design & Creativity": DesignServicesIcon,
  "Language & Communication": LanguageIcon,
  "Health & Wellness": FitnessCenterIcon,
  "Art & Culture": PaletteIcon,
  "Career & Personal Development": WorkIcon,
  "School & University Subjects": SchoolIcon,
  "Test Preparation": QuizIcon,
  "Kids & Teens": ChildCareIcon,
};

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
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    // Fetch featured courses
    const fetchFeaturedCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4545/course/featuredcourses"
        );
        setFeaturedCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      }
    };

    // Fetch top categories
    const fetchTopCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4545/course/topcategories"
        );
        
        // Transform the API response to match the format expected by CategoriesGrid
        const formattedCategories = response.data.categories.map((item, index) => {
          return {
            id: index + 1,
            name: item.category,
            icon: categoryIconMap[item.category] || CodeIcon, // Default to CodeIcon if not found
            count: item.count
          };
        });
        
        setTopCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching top categories:", error);
        // Fallback to empty array if API fails
        setTopCategories([]);
      }
    };

    fetchFeaturedCourses();
    fetchTopCategories();
  }, []);

  return (
    <main>
      <HeroSection />

      <Container maxWidth="lg">
        <LearningStats/>
        <ContinueLearning/>
        <FeaturedCourses courses={featuredCourses} />
        <CategoriesGrid categories={topCategories} />
        {/* <TopStudents/> */}
        <TopCompanies/>
        {/* <LearningPaths paths={samplePaths} />
        <UpcomingSchedule schedule={sampleSchedule} /> */}
      </Container>
    </main>
  );
}
