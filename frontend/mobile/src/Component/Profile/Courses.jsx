import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Button } from "react-native-paper"

export default function Courses({courses}) {
  console.log(courses,"sds");
  const courseData = [
    {
      id: "1",
      title: "Advanced Web Development",
      image: "https://res.cloudinary.com/dta649b70/image/upload/v1744663360/uxsnaz5cux0ho2zhes7p.jpg",
      progress: 75,
      lessons: 24,
      duration: "8 weeks",
    },
    {
      id: "2",
      title: "Mobile App Development with React Native",
      image: "https://res.cloudinary.com/dta649b70/image/upload/v1744663360/uxsnaz5cux0ho2zhes7p.jpg",
      progress: 45,
      lessons: 32,
      duration: "10 weeks",
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      image: "https://res.cloudinary.com/dta649b70/image/upload/v1744663360/uxsnaz5cux0ho2zhes7p.jpg",
      progress: 90,
      lessons: 18,
      duration: "6 weeks",
    },
  ]

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.courseCard}>
      <Image source={{ uri: item.course.thumbnail }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{item.course.title}</Text>

        <View style={styles.courseDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lessons</Text>
            <Text style={styles.detailValue}>20</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{item.course.duration}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{item.progress}%</Text>
        </View>

        <Button mode="contained" style={styles.continueButton} labelStyle={styles.continueButtonLabel}>
          Continue Learning
        </Button>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>My Courses</Text>
        <Button mode="text" labelStyle={styles.viewAllLabel}>
          View All
        </Button>
      </View>
{courses?.length>0?
      <FlatList
      horizontal
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.coursesList}
      />
:<Text>No Enrolled Course Yet</Text>}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  viewAllLabel: {
    color: "rgba(102, 94, 223, 1)",
    fontWeight: "600",
  },
  coursesList: {
    gap: 20,
  },
  courseCard: {
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courseImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  courseContent: {
    padding: 16,
    
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    width:250
  },
  courseDetails: {
    flexDirection: "row",
    marginBottom: 15,
  },
  detailItem: {
    marginRight: 24,
  },
  detailLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "rgba(102, 94, 223, 1)",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(102, 94, 223, 1)",
  },
  continueButton: {

    borderRadius: 8,
    backgroundColor: "rgba(102, 94, 223, 1)",
    marginTop: 5,
  },
  continueButtonLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
})
