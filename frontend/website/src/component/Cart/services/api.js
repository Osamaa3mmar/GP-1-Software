// services/api.js
export const fetchCartCourses = () => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: cartCourses // Import from mock data
  }), 500));
};

export const fetchSuggestedCourses = () => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: suggestedCourses // Import from mock data
  }), 500));
};