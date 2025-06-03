import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Alert, Button, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuizPreviewHeader from './components/QuizPreviewHeader';
import QuizPreviewSummary from './components/QuizPreviewSummary';
import QuizPreviewQuestion from './components/QuizPreviewQuestion';
import axios from 'axios';

const QuizPreview = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:4545/submissions/submission/${submissionId}/preview`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        if (response.data && response.data.success) {
          setSubmissionData(response.data);
        } else {
          setError(response.data?.message || 'Failed to load quiz submission data');
        }
      } catch (err) {
        console.error('Error fetching quiz submission:', err);
        setError(err.response?.data?.message || 'An error occurred while fetching quiz submission data');
      } finally {
        setLoading(false);
      }
    };

    if (submissionId) {
      fetchSubmissionData();
    }
  }, [submissionId]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          Go Back
        </Button>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!submissionData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          Go Back
        </Button>
        <Alert severity="warning">
          No submission data found for the provided ID.
        </Alert>
      </Container>
    );
  }

  // Make sure we have valid data structure before rendering
  if (!submissionData || !submissionData.data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Alert severity="error" sx={{ mb: 4 }}>
          Invalid submission data format received from server.
        </Alert>
      </Container>
    );
  }

  // The data structure is flattened with submission and quiz data together
  const submission = submissionData.data;
  const quiz = submission.quiz;

  // Check if we have the required data
  if (!submission || !quiz) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Alert severity="error" sx={{ mb: 4 }}>
          Missing submission or quiz data.
        </Alert>
      </Container>
    );
  }

  // Make sure answers array exists
  const answers = submission.answers || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
        sx={{ mb: 2 }}
      >
        Back to Submissions
      </Button>

      {/* Header with quiz title, course, lesson, and submission date */}
      <QuizPreviewHeader
        quiz={quiz}
        courseName={quiz.course?.name || 'N/A'}
        lessonName={'Lesson'}
        submissionDate={submission.submittedAt || submission.updatedAt}
      />

      {/* Summary with score, pass/fail, and submitter info */}
      <QuizPreviewSummary submission={submission} />

      {/* Questions with user answers and correct answers */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Questions & Answers
        </Typography>
        <Divider />
      </Box>

      {quiz.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((question, index) => {
          // Find the user's answer for this question
          const userAnswer = answers.find(answer =>
            answer.questionId === question.id
          );

          // Map the answer to the expected format for QuizPreviewQuestion
          const formattedUserAnswer = userAnswer ? {
            ...userAnswer,
            selectedOption: question.type === 'fill_blank' || question.type === 'fill_in_blank' ? userAnswer.selectedAnswer : userAnswer.selectedAnswer || userAnswer.selectedOption,
            isCorrect: question.type === 'fill_blank' || question.type === 'fill_in_blank' 
              ? String(userAnswer.selectedAnswer || '').trim().toLowerCase() === String(question.correctAnswer || '').trim().toLowerCase() 
              : String(userAnswer.selectedAnswer || '') === String(question.correctAnswer || '')
          } : null;

          return (
            <QuizPreviewQuestion
              key={question.id || index}
              questionNumber={index + 1}
              question={question}
              userAnswer={formattedUserAnswer}
            />
          );
        })
      ) : (
        <Alert severity="info" sx={{ mb: 4 }}>
          No questions found for this quiz.
        </Alert>
      )}
    </Container>
  );
};

export default QuizPreview;
