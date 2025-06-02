import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Base, { courseAPI } from '../api/Base';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchCourses();
    }
  }, [isFocused, userInfo]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        navigation.replace('Login');
        return;
      }
      
      // Get user courses based on role
      let response;
      if (userInfo?.role === 'teacher') {
        response = await courseAPI.getTeacherCourses();
      } else if (userInfo?.role === 'owner') {
        response = await courseAPI.getOwnerCourses();
      } else {
        // For students or any other role
        response = await courseAPI.getCourses();
      }
      
      console.log('Courses response:', response.data);
      
      // Handle different response structures based on the endpoint
      let coursesData = [];
      if (response.data.courses) {
        coursesData = response.data.courses;
      } else if (Array.isArray(response.data)) {
        coursesData = response.data;
      }
      
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCourses();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome, {userInfo?.username || 'User'}
        </Text>
        <Text style={styles.roleText}>
          Role: {userInfo?.role || 'Student'}
        </Text>
      </View>

      <View style={styles.dashboardContainer}>
        <Text style={styles.sectionTitle}>Your Dashboard</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{courses.length}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Quizzes</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Courses</Text>
        <View style={styles.coursesContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading courses...</Text>
            </View>
          ) : courses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No courses found</Text>
              <Text style={styles.emptySubText}>
                {userInfo?.role === 'teacher' 
                  ? "You haven't created any courses yet." 
                  : "You haven't enrolled in any courses yet."}
              </Text>
            </View>
          ) : (
            courses.map((course) => (
              <TouchableOpacity 
                key={course.id} 
                style={styles.courseCard}
                onPress={() => navigation.navigate('CourseDetails', { courseId: course.id })}
              >
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseInstructor}>
                  By {course.instructor || 'Unknown Instructor'}
                </Text>
                <View style={styles.courseStats}>
                  <Text style={styles.courseStat}>
                    {course.lessonCount || 0} Lessons
                  </Text>
                  <Text style={styles.courseStat}>
                    {course.quizCount || 0} Quizzes
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <Text style={styles.sectionTitle}>AI Insights</Text>
        <View style={styles.insightsContainer}>
          <Text style={styles.insightText}>
            Welcome to Thuraa! We're working on AI-powered insights for your learning journey. Stay tuned for personalized recommendations and analytics.
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    backgroundColor: '#3366FF',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  roleText: {
    fontSize: 16,
    color: '#E4E9F2',
  },
  dashboardContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222B45',
    marginTop: 20,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3366FF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  coursesContainer: {
    marginBottom: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#8F9BB3',
    fontSize: 16,
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222B45',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: '#8F9BB3',
    textAlign: 'center',
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222B45',
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#8F9BB3',
    marginBottom: 10,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseStat: {
    fontSize: 12,
    color: '#3366FF',
  },
  insightsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  insightText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#222B45',
  },
  logoutButton: {
    backgroundColor: '#FF3D71',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
