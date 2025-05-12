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

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/owner/courses");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses(staticCourses); // Fallback to static data
      }
    };

    fetchCourses();
  }, []);

  const displayCourses = courses.length > 0 ? courses : staticCourses;

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
