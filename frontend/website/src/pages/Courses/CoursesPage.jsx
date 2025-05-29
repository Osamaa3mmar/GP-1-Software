import { useEffect, useState } from "react";
import axios from "axios";
import { useCourses } from '../../Context/CourseContext';
import { CourseHeader, CourseSearchFilter, CourseList } from '../../component/CoursesPage';
import { Container, Box } from '@mui/material';

const staticCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    thumbnail:
      "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    price: 99.99,
    teacher: { username: "John Doe" },
    duration: 8,
    enrollmentNumber: 156,
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    price: 89.99,
    teacher: { username: "Jane Smith" },
    duration: 6,
    enrollmentNumber: 200,
  },
  {
    id: 3,
    title: "JavaScript Essentials",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    price: 79.99,
    teacher: { username: "Emily Johnson" },
    duration: 10,
    enrollmentNumber: 180,
  },
  {
    id: 4,
    title: "React for Beginners",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    price: 109.99,
    teacher: { username: "Michael Brown" },
    duration: 12,
    enrollmentNumber: 220,
  },
  {
    id: 5,
    title: "Node.js and Express.js",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    price: 94.99,
    teacher: { username: "Jessica White" },
    duration: 8,
    enrollmentNumber: 160,
  },
  {
    id: 6,
    title: "Database Design and SQL",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    price: 74.99,
    teacher: { username: "David Wilson" },
    duration: 7,
    enrollmentNumber: 140,
  },
];

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
    schedule: [
      { day: "Mon", startTime: "10:00 AM", endTime: "12:00 PM" },
      { day: "Wed", startTime: "10:00 AM", endTime: "12:00 PM" },
    ],
    rating: { value: 4.5, count: 1200 },
  },
  {
    id: 2,
    title: "Data Science with Python",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
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
    schedule: [
      { day: "Tue", startTime: "2:00 PM", endTime: "4:00 PM" },
      { day: "Thu", startTime: "2:00 PM", endTime: "4:00 PM" },
    ],
    rating: { value: 4.7, count: 87 },
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
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
    schedule: [],
    rating: { value: 4.3, count: 200 },
  },
  {
    id: 4,
    title: "Mobile App Development with Flutter",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
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
    schedule: [
      { day: "Sat", startTime: "9:00 AM", endTime: "12:00 PM" },
    ],
    rating: { value: 4.6, count: 110 },
  },
  {
    id: 5,
    title: "DevOps and Continuous Integration",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Docker", "CI/CD", "Jenkins"],
      category: "DevOps",
      level: "Advanced",
      prerequisites: ["Software Development Experience"],
    },
    learningOutcomes:
      "Learn how to implement CI/CD pipelines and automate deployments with Docker and Jenkins.",
    learningPath:
      "Next steps include Kubernetes and Infrastructure as Code.",
    duration: 14,
    price: 199.99,
    enrollmentNumber: 76,
    teacher: { name: "David Lee", position: "DevOps Engineer" },
    schedule: [
      { day: "Mon", startTime: "6:00 PM", endTime: "8:00 PM" },
      { day: "Wed", startTime: "6:00 PM", endTime: "8:00 PM" },
    ],
    rating: { value: 4.8, count: 65 },
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
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
    schedule: [],
    rating: { value: 4.4, count: 95 },
  },
];

export default function CoursesPage() {
  const { courses } = useCourses();
  const [categories, setCategories] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:4545/category");
        // Ensure categories is an array before setting state
        const categoriesData = response.data || [];
        // Check if categoriesData is an array, if not, try to extract it from the response
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else if (categoriesData.categories && Array.isArray(categoriesData.categories)) {
          // If the API returns an object with a categories property that is an array
          setCategories(categoriesData.categories);
        } else if (typeof categoriesData === 'object') {
          // If it's an object, convert object values to array
          const categoriesArray = Object.values(categoriesData).filter(item => item !== null && typeof item === 'object');
          setCategories(categoriesArray);
        } else {
          // Fallback to empty array if nothing works
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback categories in case the API fails
        setCategories([
          { id: 1, name: "Web Development" },
          { id: 2, name: "Data Science" },
          { id: 3, name: "Design" },
          { id: 4, name: "Mobile Development" },
          { id: 5, name: "DevOps" },
          { id: 6, name: "Cybersecurity" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter courses based on category and search query
  useEffect(() => {
    const displayCourses = courses.length > 0 ? courses : expectedCourses;
    
    let filtered = displayCourses;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => 
        course.tags?.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);
  }, [courses, selectedCategory, searchQuery]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          padding: { xs: '1rem', md: '2rem' }, 
          backgroundColor: 'white' 
        }}
      >
        <CourseHeader 
          title="Explore Our Courses" 
          subtitle="Discover a wide range of courses designed to help you achieve your learning goals" 
        />
        
        <CourseSearchFilter 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />
        
        <CourseList 
          courses={filteredCourses}
          isLoading={isLoading}
        />
      </Box>
    </Container>
  );
}
