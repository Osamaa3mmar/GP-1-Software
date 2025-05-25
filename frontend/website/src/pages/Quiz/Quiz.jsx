import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Alert,
  Fade,
  Chip,
  useTheme
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

export default function Quiz() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { quizId } = useParams();
  
  // Redirect to quizzes page if no quiz ID is provided
  useEffect(() => {
    if (!quizId) {
      navigate('/quizzes');
    }
  }, [quizId, navigate]);
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizNotFound, setQuizNotFound] = useState(false);
  const [quizInfo, setQuizInfo] = useState({
    title: "Quiz",
    totalMarks: 0,
    timeLimit: 30, // minutes
  });
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Check if quiz exists by trying to fetch its questions
  const checkQuizExists = async () => {
    try {
      // Make sure we have a quiz ID
      if (!quizId) {
        setQuizNotFound(true);
        return false;
      }
      
      // Use the questions endpoint to check if the quiz exists
      const { data } = await axios.get(`http://localhost:4545/qustion/getall/${quizId}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      
      // Check if the response contains any questions
      if (!data.qustions || data.qustions.length === 0) {
        setError("This quiz doesn't have any questions yet.");
        return false;
      }
      
      // The quiz exists and has questions
      setQuizInfo({
        id: quizId,
        title: "Quiz #" + quizId,
        description: "Take this quiz to test your knowledge",
        timeLimit: 30, // Default time limit
        totalMarks: data.qustions.reduce((sum, q) => sum + (parseInt(q.marks) || 0), 0)
      });
      
      // Initialize timer based on default settings
      setTimeRemaining(30 * 60); // 30 minutes in seconds
      
      // Set the questions
      setQuestions(data.qustions);
      
      return true;
    } catch (error) {
      console.error("Error checking quiz:", error);
      
      // Check the specific error
      if (error.response) {
        // If we get a 404 or 500 status, the quiz doesn't exist in the database
        if (error.response.status === 404 || error.response.status === 500) {
          console.log("Quiz not found in database");
          setQuizNotFound(true);
          return false;
        }
      }
      
      // For other errors, show a general error message
      setError("Failed to load quiz. Please try again.");
      return false;
    }
  }

  // Fetch questions for this quiz
  const getQuestions = async () => {
    try {
      setLoading(true);
      
      // Check if quiz exists and fetch questions in one step
      const quizExists = await checkQuizExists();
      if (!quizExists) {
        // If quiz doesn't exist or has no questions, the checkQuizExists function
        // will have already set the appropriate error state
        setLoading(false);
        return;
      }
      
      // No need to fetch questions again since checkQuizExists already did that
      setError(null);
    } catch (error) {
      console.error("Error fetching questions:", error);
      
      // Error handling is already done in checkQuizExists
      if (!error.response || error.response.status !== 404) {
        setError("Failed to load quiz questions. Please try again.");
        toast.error("Failed to load quiz");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerChange = (event) => {
    const value = event.target.value;
    setAnswers({
      ...answers,
      [currentQuestionIndex]: value
    });
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit quiz
  const submitQuiz = async () => {
    try {
      setLoading(true);
      
      // Prepare submission data
      const submission = {
        quizId,
        answers: Object.entries(answers).map(([index, value]) => ({
          questionId: questions[parseInt(index)].id,
          selectedAnswer: value
        })),
        timeSpent: quizInfo.timeLimit * 60 - timeRemaining
      };
      
      // Replace with your actual submission endpoint
      // const { data } = await axios.post("http://localhost:4545/quiz-submission/submit", submission, {
      //   headers: {
      //     token: localStorage.getItem("token")
      //   }
      // });
      
      // Mock result for now
      const mockResult = {
        score: Math.floor(Math.random() * (quizInfo.totalMarks + 1)),
        totalMarks: quizInfo.totalMarks,
        percentage: Math.floor(Math.random() * 101),
        correctAnswers: Math.floor(Math.random() * (questions.length + 1)),
        totalQuestions: questions.length
      };
      
      setQuizResult(mockResult);
      setQuizSubmitted(true);
      toast.success("Quiz submitted successfully!");
      
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format time (seconds) to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (!loading && !quizSubmitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, quizSubmitted, timeRemaining]);

  // Initial data fetch
  useEffect(() => {
    getQuestions();
  }, [quizId]);

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  // Calculate progress percentage
  const progressPercentage = questions.length > 0 
    ? (Object.keys(answers).length / questions.length) * 100 
    : 0;
    
  // Render 404 page when quiz is not found
  if (quizNotFound) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(to right, #f8f9ff, #ffffff)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Decorative elements */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(63,81,181,0.1) 0%, rgba(63,81,181,0.05) 70%, rgba(63,81,181,0) 100%)',
              zIndex: 0
            }} 
          />
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(63,81,181,0.1) 0%, rgba(63,81,181,0.05) 70%, rgba(63,81,181,0) 100%)',
              zIndex: 0
            }} 
          />
          
          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <ErrorIcon sx={{ fontSize: 100, color: '#f44336', mb: 2, opacity: 0.8 }} />
            
            <Typography variant="h1" fontWeight="bold" color="error" sx={{ mb: 2, fontSize: '6rem' }}>
              404
            </Typography>
            
            <Typography variant="h4" fontWeight="medium" color="text.primary" sx={{ mb: 3 }}>
              Quiz Not Found
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              The quiz you're looking for doesn't exist or may have been deleted. Please check the quiz ID and try again.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                startIcon={<NavigateBeforeIcon />}
                onClick={() => navigate(-1)}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Go Back
              </Button>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<QuizIcon />}
                onClick={() => navigate('/quizzes')}
                sx={{ borderRadius: 2, px: 3 }}
              >
                All Quizzes
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Render quiz results
  if (quizSubmitted && quizResult) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(to right, #f5f7ff, #ffffff)'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
              Quiz Completed!
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Box>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                  color: 'white'
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" gutterBottom>Your Score</Typography>
                  <Typography variant="h2" fontWeight="bold">
                    {quizResult.score} / {quizResult.totalMarks}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {quizResult.percentage}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #2196F3, #0D47A1)',
                  color: 'white'
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" gutterBottom>Correct Answers</Typography>
                  <Typography variant="h2" fontWeight="bold">
                    {quizResult.correctAnswers} / {quizResult.totalQuestions}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {Math.round((quizResult.correctAnswers / quizResult.totalQuestions) * 100)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2, borderRadius: 2, px: 4 }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Quiz header */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(to right, #f5f7ff, #ffffff)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <QuizIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              {quizInfo.title}
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            bgcolor: timeRemaining < 60 ? 'error.light' : 'primary.light',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 2
          }}>
            <TimerIcon sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="medium">
              {formatTime(timeRemaining)}
            </Typography>
          </Box>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={progressPercentage} 
          sx={{ mt: 3, height: 8, borderRadius: 4 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {Object.keys(answers).length} of {questions.length} answered
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {progressPercentage.toFixed(0)}% complete
          </Typography>
        </Box>
      </Paper>
      
      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Loading state */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Fade in={!loading}>
          <Box>
            {questions.length > 0 ? (
              <>
                {/* Question card */}
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 2,
                    mb: 3,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Question header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Chip 
                      label={`Question ${currentQuestionIndex + 1} of ${questions.length}`} 
                      color="primary" 
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Chip 
                      label={`${currentQuestion?.marks || 0} marks`} 
                      color="secondary" 
                      variant="outlined"
                    />
                  </Box>
                  
                  {/* Question text */}
                  <Typography 
                    variant="h6" 
                    fontWeight="medium" 
                    sx={{ mb: 4, lineHeight: 1.5 }}
                  >
                    {currentQuestion?.questionText}
                  </Typography>
                  
                  {/* Answer options */}
                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <RadioGroup
                      value={answers[currentQuestionIndex] || ''}
                      onChange={handleAnswerChange}
                    >
                      {currentQuestion?.type === 'true_false' ? (
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Paper 
                              elevation={answers[currentQuestionIndex] === 'true' ? 3 : 1}
                              sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                border: answers[currentQuestionIndex] === 'true' 
                                  ? `2px solid ${theme.palette.primary.main}` 
                                  : '1px solid #e0e0e0',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <FormControlLabel 
                                value="true" 
                                control={<Radio />} 
                                label="True" 
                                sx={{ width: '100%' }}
                              />
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Paper 
                              elevation={answers[currentQuestionIndex] === 'false' ? 3 : 1}
                              sx={{ 
                                p: 2, 
                                borderRadius: 2,
                                border: answers[currentQuestionIndex] === 'false' 
                                  ? `2px solid ${theme.palette.primary.main}` 
                                  : '1px solid #e0e0e0',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <FormControlLabel 
                                value="false" 
                                control={<Radio />} 
                                label="False" 
                                sx={{ width: '100%' }}
                              />
                            </Paper>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid container spacing={2}>
                          {currentQuestion?.options?.map((option, index) => (
                            <Grid item xs={12} key={option.id || index}>
                              <Paper 
                                elevation={answers[currentQuestionIndex] === option.id ? 3 : 1}
                                sx={{ 
                                  p: 2, 
                                  borderRadius: 2,
                                  border: answers[currentQuestionIndex] === option.id 
                                    ? `2px solid ${theme.palette.primary.main}` 
                                    : '1px solid #e0e0e0',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <FormControlLabel 
                                  value={option.id} 
                                  control={<Radio />} 
                                  label={option.text} 
                                  sx={{ width: '100%' }}
                                />
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </RadioGroup>
                  </FormControl>
                </Paper>
                
                {/* Navigation buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<NavigateBeforeIcon />}
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    sx={{ borderRadius: 2 }}
                  >
                    Previous
                  </Button>
                  
                  {currentQuestionIndex < questions.length - 1 ? (
                    <Button
                      variant="contained"
                      endIcon={<NavigateNextIcon />}
                      onClick={nextQuestion}
                      sx={{ borderRadius: 2 }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      endIcon={<SendIcon />}
                      onClick={submitQuiz}
                      sx={{ borderRadius: 2 }}
                      disabled={Object.keys(answers).length < questions.length}
                    >
                      Submit Quiz
                    </Button>
                  )}
                </Box>
                
                {/* Submit button for all questions */}
                {Object.keys(answers).length === questions.length && currentQuestionIndex !== questions.length - 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                      variant="contained"
                      color="success"
                      endIcon={<SendIcon />}
                      onClick={submitQuiz}
                      sx={{ borderRadius: 2 }}
                    >
                      Submit Quiz
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  borderRadius: 2,
                  bgcolor: '#f9faff'
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No questions available
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  This quiz doesn't have any questions yet.
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/dashboard')}
                  sx={{ mt: 2 }}
                >
                  Back to Dashboard
                </Button>
              </Paper>
            )}
          </Box>
        </Fade>
      )}
    </Container>
  );
}