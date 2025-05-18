import { useEffect, useState } from "react";
import CourseCard from "../../component/Courses/CourseCard";
import axios from "axios";

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
// const expectedCourses = [
//   {
//     id: 1,
//     title: "Web Development Fundamentals",
//     thumbnail:
//       "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
//     tags:{
//       topics : ["HTML", "CSS", "JavaScript"],
//       category: "Web Development",
//       level: "Beginner",
//       prerequisites: ["Basic Computer Skills"],
//     },
//     learningOutcomes: "By the end of this course, you will be able to create responsive websites using HTML5, CSS3, and JavaScript. You will also understand web development best practices and be able to build real-world projects.",
//     learningPath: "This course is part of the Web Development Bootcamp. After completing this course, you can proceed to the Advanced CSS Techniques course.",
//     duration: 8,
//     price: 99.99,
//     enrollmentNumber: 156,
//     teacher: { name: "John Doe" , position : "Senior Web Developer" },
//     schedule: [
//       { day: "Mon", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { day: "Wed", startTime: "10:00 AM", endTime: "12:00 PM" },
//     ],
//     rating:{value : 4.5, count: 120},
//   }
// ]
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
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // const response = await axios.get("http://localhost:4545/course/getall");
        const response = await axios.get("");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses(expectedCourses); // Fallback to static data
      }
    };

    fetchCourses();
  }, []);

  const displayCourses = courses.length > 0 ? courses : expectedCourses;

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {displayCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

