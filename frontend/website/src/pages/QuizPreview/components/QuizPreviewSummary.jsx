import React from 'react';
import { Box, Typography, Paper, Divider, Chip, Grid, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import BugReportIcon from '@mui/icons-material/BugReport';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const QuizPreviewSummary = ({ submission }) => {
  if (!submission || !submission.quiz) {
    return null;
  }
  
  // Calculate percentage score
  
  const totalMarks = submission.maxScore || 100;
  const percentage = totalMarks > 0 ? Math.round((submission.score / totalMarks) * 100) : 0;
  
  // Determine if the submission passed - calculate 60% of total marks as passing score
  const passingScore = Math.round(totalMarks * 0.6); // Default to 60% of total marks
  const isPassed = submission.score >= passingScore;
  
  // Format submission date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get submitter info
  const submitterName = submission.student?.username || submission.student?.name || 'Unknown User';
  const submitterEmail = submission.student?.email || '';
  const submitterInitials = submitterName.charAt(0).toUpperCase();
  
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Quiz Results Summary
        </Typography>
        
        {/* Test Submission Badge */}
        {submission.isTest && (
          <Chip 
            icon={<BugReportIcon />}
            label="Test Submission"
            color="info"
            sx={{ fontWeight: 'bold' }}
          />
        )}
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        {/* Score Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: isPassed ? 'rgba(76, 175, 80, 0.08)' : 'rgba(244, 67, 54, 0.08)',
            border: `1px solid ${isPassed ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`
          }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
              Score
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: isPassed ? 'success.main' : 'error.main' }}>
                {percentage}%
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                ({submission.score}/{submission.maxScore} marks)
              </Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                icon={isPassed ? <CheckCircleIcon /> : <CancelIcon />}
                label={isPassed ? 'Passed' : 'Failed'}
                color={isPassed ? 'success' : 'error'}
                sx={{ fontWeight: 'bold' }}
              />
              <Chip 
                icon={<AssignmentTurnedInIcon />}
                label={`Passing Score: ${passingScore}/${totalMarks}`}
                variant="outlined"
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        
        {/* Submitter Info Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'rgba(33, 150, 243, 0.08)', border: '1px solid rgba(33, 150, 243, 0.3)' }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
              Submitted By
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{submitterInitials}</Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {submitterName}
                </Typography>
                {submitterEmail && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {submitterEmail}
                  </Typography>
                )}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Submitted on {formatDate(submission.submittedAt || submission.updatedAt || submission.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuizPreviewSummary;
