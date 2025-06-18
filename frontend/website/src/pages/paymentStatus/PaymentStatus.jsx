
const PaymentStatusPages = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <SuccessPage />
        </Grid>
        <Grid item xs={12} md={6}>
          <FailedPage />
        </Grid>
      </Grid>
    </Container>
  );
};

// Success Payment Page


// Failed Payment Page
const FailedPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 4, 
        overflow: 'hidden',
        borderTop: '4px solid #F44336'
      }}
    >
      <Box 
        sx={{ 
          bgcolor: 'rgba(244, 67, 54, 0.1)', 
          p: 4, 
          textAlign: 'center' 
        }}
      >
        <ErrorIcon 
          sx={{ 
            fontSize: 80, 
            color: '#F44336', 
            mb: 2 
          }} 
        />
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            color: '#D32F2F'
          }}
        >
          Payment Failed
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mt: 1, 
            color: '#E53935' 
          }}
        >
          We couldn't process your payment
        </Typography>
      </Box>
      
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Payment Details
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Order ID:</Typography>
          <Typography variant="body1" fontWeight="500">#ORD-789012</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Date:</Typography>
          <Typography variant="body1" fontWeight="500">May 15, 2023</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Amount:</Typography>
          <Typography variant="body1" fontWeight="500">$129.99</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="body1">Payment Method:</Typography>
          <Typography variant="body1" fontWeight="500">Mastercard **** 5678</Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box 
          sx={{ 
            bgcolor: 'rgba(244, 67, 54, 0.05)', 
            p: 2, 
            borderRadius: 2,
            borderLeft: '3px solid #F44336',
            mb: 3
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center',
              color: '#F44336'
            }}
          >
            Your payment was declined. Please check your payment information and try again.
          </Typography>
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ArrowBack />}
              sx={{
                py: 1.5,
                borderColor: '#F44336',
                color: '#F44336',
                '&:hover': {
                  borderColor: '#D32F2F',
                  backgroundColor: 'rgba(244, 67, 54, 0.08)'
                }
              }}
            >
              Go Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<CreditCard />}
              sx={{
                py: 1.5,
                backgroundColor: '#F44336',
                '&:hover': { backgroundColor: '#D32F2F' }
              }}
            >
              Try Again
            </Button>
          </Grid>
        </Grid>
        
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center', 
            mt: 3,
            color: '#757575'
          }}
        >
          Need help? Contact support@example.com
        </Typography>
      </Box>
    </Paper>
  );
};

export default PaymentStatusPages;