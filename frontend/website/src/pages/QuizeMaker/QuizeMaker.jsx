import { 
  Box, 
  Button, 
  Container, 
  Divider, 
  Paper, 
  SpeedDial, 
  Stack, 
  Typography, 
  Tooltip, 
  CircularProgress,
  Fade,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QustionCardMaker from "../../component/Qustion/QustionCardMaker";
import axios from "axios";
import { toast } from "react-toastify";

export default function QuizeMaker() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  // Redirect to dashboard if no quiz ID is provided
  useEffect(() => {
    if (!quizId) {
      navigate('/dashboard');
    }
  }, [quizId, navigate]);
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizNotFound, setQuizNotFound] = useState(false);
  const [quizInfo, setQuizInfo] = useState({
    id: quizId,
    title: "My Quiz",
    description: "Quiz description",
    totalMarks: 0
  });

  // State for AI question generation modal
  const [openAIModal, setOpenAIModal] = useState(false);
  const [aiQuestionTopic, setAiQuestionTopic] = useState('');
  const [aiQuestionDetails, setAiQuestionDetails] = useState('');
  const [aiQuestionDifficulty, setAiQuestionDifficulty] = useState('medium');
  const [aiQuestionType, setAiQuestionType] = useState('mcq');
  const [aiQuestionCount, setAiQuestionCount] = useState(1);
  const [generatingQuestion, setGeneratingQuestion] = useState(false);

  // Create a new empty question
  const makeEmptyQuestion = () => {
    const newQuestion = {
      order: questions.length + 1,
      questionText: "",
      options: [],
      correctAnswer: '',
      marks: 5, // Default marks
      explanation: '',
      type: 'mcq'
    }
    setQuestions([...questions, newQuestion]);
    
    // Scroll to the bottom after adding a new question
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }

  // Handle opening and closing the AI question generation modal
  const handleOpenAIModal = () => setOpenAIModal(true);
  const handleCloseAIModal = () => setOpenAIModal(false);

  // Handle AI question generation with backend API
  const handleGenerateAIQuestion = async () => {
    try {
      // Validate input
      if (!aiQuestionTopic.trim()) {
        toast.error("Please enter a topic for the question", {
          position: "bottom-left",
        });
        return;
      }
      
      setGeneratingQuestion(true);
      
      // Call backend API to generate question
      const response = await axios.post(
        "http://localhost:4545/question/generate-ai",
        {
          topic: aiQuestionTopic,
          details: aiQuestionDetails,
          difficulty: aiQuestionDifficulty,
          questionType: aiQuestionType,
          count: aiQuestionCount,
          quizId: quizId
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );
      console.log(response.data)
      // Close modal and show success message
      handleCloseAIModal();
      
      // Show appropriate success message based on number of questions generated
      if (aiQuestionCount > 1) {
        toast.success(`${aiQuestionCount} questions generated successfully!`, {
          position: "bottom-left",
        });
      } else {
        toast.success("Question generated successfully!", {
          position: "bottom-left",
        });
      }
      
      // Reset form fields for next use
      setAiQuestionTopic('');
      setAiQuestionDetails('');
      
      // Refresh questions list to include the new AI-generated questions
      getAllQuestions();
    } catch (error) {
      console.error("Error generating question:", error);
      toast.error(error.response?.data?.message || "Failed to generate question", {
        position: "bottom-left",
      });
      setGeneratingQuestion(false);
    }
  }

  // Check if quiz exists by trying to fetch its questions
  const checkQuizExists = async () => {
    try {
      setLoading(true);
      
      // Make sure we have a quiz ID
      if (!quizId) {
        setQuizNotFound(true);
        return false;
      }
      
      // Use the questions endpoint to check if the quiz exists
      const { data } = await axios.get(`http://localhost:4545/question/getall/${quizId}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      
      // Check if the response contains any questions
      if (!data.qustions || data.qustions.length === 0) {
        // The quiz exists but has no questions
        setQuizInfo({
          id: quizId,
          title: "Quiz #" + quizId,
          description: "Edit this quiz to add a description",
          totalMarks: 0
        });
        setQuestions([]);
        return true;
      }
      
      // The quiz exists and has questions
      setQuizInfo({
        id: quizId,
        title: "Quiz #" + quizId,
        description: "Edit this quiz to add a description",
        totalMarks: data.qustions.reduce((sum, q) => sum + (parseInt(q.marks) || 0), 0)
      });
      
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
          return false;
        }
      }
      setQuizNotFound(true);
      
      // For other errors, show a general error message
      setError("Failed to load quiz. Please try again.");
      return false;
    }
  }

  // Fetch all questions for this quiz
  const getAllQuestions = async (action) => {
    try {
      setLoading(true);
      
      // If this is being called after a delete action, show the success message
      if (action === "delete") {
        toast.info("Question deleted successfully", {
          position: "bottom-left",
        });
      }
      
      // Check if quiz exists and fetch questions in one step
      const quizExists = await checkQuizExists();
      if (!quizExists) {
        // If quiz doesn't exist, the checkQuizExists function will have already set the appropriate error state
        setLoading(false);
        return;
      }
      
      // No need to fetch questions again since checkQuizExists already did that
      // and updated the state with the questions and totalMarks
      setError(null);
    } catch (error) {
      console.error("Error fetching questions:", error);
      
      // Error handling is already done in checkQuizExists
      if (!error.response || error.response.status !== 404) {
        setError("Failed to load questions. Please try again.");
        toast.error("Failed to load questions");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllQuestions();
  }, []);

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
            <ErrorOutlineIcon sx={{ fontSize: 100, color: '#f44336', mb: 2, opacity: 0.8 }} />
            
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
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Go Back
              </Button>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Dashboard
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(to right, #f5f7ff, #ffffff)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <QuizIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            {quizInfo.title}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight="medium">Total Questions: {questions.length}</Typography>
            <Typography variant="subtitle1" color="text.secondary">Total Marks: {quizInfo.totalMarks}</Typography>
          </Box>
          
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddCircleIcon />}
              onClick={makeEmptyQuestion}
              sx={{ borderRadius: 2 }}
            >
              Add Question
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<SmartToyIcon />}
              onClick={handleOpenAIModal}
              sx={{ borderRadius: 2 }}
            >
              Generate with AI
            </Button>
          </Stack>
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
          <Stack spacing={4} sx={{ mb: 6 }}>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <QustionCardMaker 
                  index={index} 
                  reload={getAllQuestions} 
                  key={question.id || index} 
                  {...question} 
                />
              ))
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
                  No questions yet
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Get started by adding your first question using the button above or the floating action button.
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<AddCircleIcon />}
                  onClick={makeEmptyQuestion}
                  sx={{ mt: 2 }}
                >
                  Add First Question
                </Button>
              </Paper>
            )}
          </Stack>
        </Fade>
      )}
      
      {/* Floating action button */}
      <Tooltip title="Add new question">
        <SpeedDial
          ariaLabel="Add question"
          sx={{ position: 'fixed', bottom: 40, right: 40 }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClick={makeEmptyQuestion}
        />
      </Tooltip>

      {/* AI Question Generation Modal */}
      <Modal
        open={openAIModal}
        onClose={handleCloseAIModal}
        aria-labelledby="ai-question-generation-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          maxWidth: '90%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
              <SmartToyIcon sx={{ mr: 1, color: 'secondary.main' }} />
              Generate Questions with AI
            </Typography>
            <IconButton onClick={handleCloseAIModal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />
          
          <Stack spacing={3}>
            <TextField
              required
              label="Quiz Topic"
              fullWidth
              value={aiQuestionTopic}
              onChange={(e) => setAiQuestionTopic(e.target.value)}
              placeholder="e.g., JavaScript Basics, World War II, Photosynthesis"
              helperText="Enter the main topic for the questions"
            />
            
            <TextField
              label="Detailed Points (Optional)"
              fullWidth
              multiline
              rows={3}
              value={aiQuestionDetails}
              onChange={(e) => setAiQuestionDetails(e.target.value)}
              placeholder="e.g., Focus on variables, functions, and control flow. Include questions about scope and closures."
              helperText="Provide specific points to focus on (optional)"
            />
            
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="question-difficulty-label">Difficulty Level</InputLabel>
                <Select
                  labelId="question-difficulty-label"
                  value={aiQuestionDifficulty}
                  label="Difficulty Level"
                  onChange={(e) => setAiQuestionDifficulty(e.target.value)}
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                  <MenuItem value="expert">Expert</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel id="question-type-label">Question Type</InputLabel>
                <Select
                  labelId="question-type-label"
                  value={aiQuestionType}
                  label="Question Type"
                  onChange={(e) => setAiQuestionType(e.target.value)}
                >
                  <MenuItem value="mcq">Multiple Choice</MenuItem>
                  <MenuItem value="true_false">True/False</MenuItem>
                  <MenuItem value="short_answer">Short Answer</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            
            <FormControl fullWidth>
              <InputLabel id="question-count-label">Number of Questions</InputLabel>
              <Select
                labelId="question-count-label"
                value={aiQuestionCount}
                label="Number of Questions"
                onChange={(e) => setAiQuestionCount(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleCloseAIModal} 
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="secondary"
                startIcon={<SmartToyIcon />}
                onClick={handleGenerateAIQuestion}
                disabled={!aiQuestionTopic.trim() || generatingQuestion}
              >
                {generatingQuestion ? (
                  <>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    Generating...
                  </>
                ) : 'Generate Question'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Container>
  )
}
