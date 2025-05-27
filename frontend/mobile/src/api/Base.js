import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: "https://c547-45-147-66-172.ngrok-free.app",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token to requests
apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API endpoints
export const authAPI = {
    login: (email, password) => apiClient.post('/auth/login', { email, password }),
    signup: (userData) => apiClient.post('/auth/signup', userData),
    verifyEmail: (id) => apiClient.put('/email/send/verify', { id }),
    sendConfirmationEmail: (id) => apiClient.put('/email/send/confirm', { id }),
};

export const courseAPI = {
    getCourses: () => apiClient.get('/course/getall'),
    getCourseById: (id) => apiClient.get(`/course/getdetailedinfo/${id}`),
    getTeacherCourses: () => apiClient.get('/course/teacher'),
    getOwnerCourses: () => apiClient.get('/course/owner/courses'),
};

export const lessonAPI = {
    getLessons: () => apiClient.get('/lesson'),
    getLessonById: (id) => apiClient.get(`/lesson/${id}`),
};

export default apiClient;