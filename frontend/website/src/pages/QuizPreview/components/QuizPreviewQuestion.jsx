import React from 'react';
import { Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl, Divider, Chip, Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

const QuizPreviewQuestion = ({ questionNumber, question, userAnswer }) => {
  if (!question) {
    return (
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Alert severity="warning">Question data not available</Alert>
      </Paper>
    );
  }

  // Determine if the user answered correctly
  const isCorrect = userAnswer && userAnswer.isCorrect;

  // Determine question type (mcq, true_false, fill_blank, etc.)
  const questionType = question.type || 'mcq';

  // Get user's selected answer - now we have it properly formatted from the parent component
  const userSelectedAnswer = userAnswer ? (userAnswer.selectedOption || userAnswer.selectedAnswer) : null;

  // Get correct answer
  const correctAnswer = question.correctAnswer;

  // Parse options if they're stored as a string
  let options = [];
  try {
    if (question.options) {
      if (typeof question.options === 'string') {
        options = JSON.parse(question.options);
      } else if (Array.isArray(question.options)) {
        options = question.options;
      }
    }
  } catch (error) {
    console.error('Error parsing options:', error);
    options = [];
  }

  // Determine the question type label
  let questionTypeLabel = 'Multiple Choice';
  if (questionType === 'true_false') {
    questionTypeLabel = 'True/False';
  } else if (questionType === 'fill_blank' || questionType === 'fill_in_blank') {
    questionTypeLabel = 'Fill in the Blank';
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Question {questionNumber}: {question.text || question.questionText}
          </Typography>
          <Chip
            label={questionTypeLabel}
            size="small"
            color="primary"
            sx={{ ml: 2 }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* User's answer status */}
      <Box sx={{ display: 'flex', mb: 2 }}>
        {userSelectedAnswer ? (
          <Chip
            icon={isCorrect ? <DoneIcon /> : <CloseIcon />}
            label={isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
            color={isCorrect ? 'success' : 'error'}
            variant="outlined"
          />
        ) : (
          <Chip
            icon={<InfoIcon />}
            label="No Answer Provided"
            color="warning"
            variant="outlined"
          />
        )}
      </Box>

      <FormControl component="fieldset" sx={{ width: '100%' }}>
        {questionType === 'fill_blank' || questionType === 'fill_in_blank' ? (
          // Fill in the blank question
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Your Answer:
            </Typography>
            <Box sx={{
              p: 2,
              borderRadius: 1,
              border: '1px solid',
              borderColor: isCorrect ? '#4caf50' : (userSelectedAnswer ? '#f44336' : '#e0e0e0'),
              backgroundColor: isCorrect ? 'rgba(76, 175, 80, 0.08)' : (userSelectedAnswer ? 'rgba(244, 67, 54, 0.08)' : 'transparent')
            }}>
              <Typography>
                {userSelectedAnswer || 'No answer provided'}
              </Typography>
            </Box>
            {!isCorrect && userSelectedAnswer && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#4caf50' }}>
                  Correct Answer:
                </Typography>
                <Box sx={{
                  p: 2,
                  borderRadius: 1,
                  border: '1px solid #4caf50',
                  backgroundColor: 'rgba(76, 175, 80, 0.08)'
                }}>
                  <Typography>
                    {correctAnswer}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        ) : questionType === 'true_false' ? (
          <RadioGroup>
            {['true', 'false'].map((option) => {
              const isUserSelected = userSelectedAnswer && String(userSelectedAnswer).toLowerCase() === option;
              const isCorrectOption = String(correctAnswer).toLowerCase() === option;

              // Determine styling for this option
              let optionStyle = {};
              let icon = null;

              if (isUserSelected) {
                if (isCorrectOption) {
                  // User selected the correct answer
                  optionStyle = {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid #4caf50',
                    borderRadius: 1
                  };
                  icon = <CheckCircleOutlineIcon sx={{ color: '#4caf50', ml: 1 }} />;
                } else {
                  // User selected the wrong answer
                  optionStyle = {
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    border: '1px solid #f44336',
                    borderRadius: 1
                  };
                  icon = <HighlightOffIcon sx={{ color: '#f44336', ml: 1 }} />;
                }
              } else if (isCorrectOption) {
                // This is the correct answer but user didn't select it
                optionStyle = {
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                  border: '1px solid #4caf50',
                  borderRadius: 1
                };
              }

              return (
                <Box key={option} sx={{ ...optionStyle, mb: 1, p: 1 }}>
                  <FormControlLabel
                    value={option}
                    control={
                      <Radio
                        checked={isUserSelected}
                        disabled
                        sx={{
                          color: isUserSelected ? (isCorrectOption ? '#4caf50' : '#f44336') : undefined,
                          '&.Mui-checked': {
                            color: isCorrectOption ? '#4caf50' : '#f44336',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{option.charAt(0).toUpperCase() + option.slice(1)}</Typography>
                        {icon}
                      </Box>
                    }
                    sx={{ width: '100%' }}
                  />
                </Box>
              );
            })}
          </RadioGroup>
        ) : (
          <RadioGroup>
            {(options || []).map((option) => {
              const optionId = option.id;
              const optionText = option.text;

              // Compare as strings to ensure proper matching
              const isUserSelected = userSelectedAnswer &&
                (String(userSelectedAnswer) === String(optionId) ||
                  String(userSelectedAnswer) === String(optionText));

              const isCorrectOption = String(correctAnswer) === String(optionId);

              // Determine styling for this option
              let optionStyle = {};
              let icon = null;

              if (isUserSelected) {
                if (isCorrectOption) {
                  // User selected the correct answer
                  optionStyle = {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid #4caf50',
                    borderRadius: 1
                  };
                  icon = <CheckCircleOutlineIcon sx={{ color: '#4caf50', ml: 1 }} />;
                } else {
                  // User selected the wrong answer
                  optionStyle = {
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    border: '1px solid #f44336',
                    borderRadius: 1
                  };
                  icon = <HighlightOffIcon sx={{ color: '#f44336', ml: 1 }} />;
                }
              } else if (isCorrectOption) {
                // This is the correct answer but user didn't select it
                optionStyle = {
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                  border: '1px solid #4caf50',
                  borderRadius: 1
                };
              }

              return (
                <Box key={optionId} sx={{ ...optionStyle, mb: 1, p: 1 }}>
                  <FormControlLabel
                    value={optionId}
                    control={
                      <Radio
                        checked={isUserSelected}
                        disabled
                        sx={{
                          color: isUserSelected ? (isCorrectOption ? '#4caf50' : '#f44336') : undefined,
                          '&.Mui-checked': {
                            color: isCorrectOption ? '#4caf50' : '#f44336',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{optionText}</Typography>
                        {icon}
                      </Box>
                    }
                    sx={{ width: '100%' }}
                  />
                </Box>
              );
            })}
          </RadioGroup>
        )}
      </FormControl>

      {question.explanation && (
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(33, 150, 243, 0.05)', borderRadius: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
            Explanation:
          </Typography>
          <Typography variant="body2">
            {question.explanation}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default QuizPreviewQuestion;
