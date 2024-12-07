import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

// Lazy load Material-UI components
const Typography = React.lazy(() => import('@mui/material/Typography'));
const Box = React.lazy(() => import('@mui/material/Box'));
const Container = React.lazy(() => import('@mui/material/Container'));
const Button = React.lazy(() => import('@mui/material/Button'));

// Lazy load React Router's navigation
const SuspenseWrapper = ({ children }) => <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;

const AboutUs = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <SuspenseWrapper>
      <div className='about-main'>
      <Container maxWidth="lg" style={{ padding: '40px 20px' }}>
        {/* Heading Section */}
        <Box textAlign="center" style={{ marginBottom: '40px' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Typography variant="h3" gutterBottom>
              Welcome to Book Orchid!
            </Typography>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Typography variant="h6" color="textSecondary">
              Your gateway to endless books, knowledge, and a thriving community.
            </Typography>
          </Suspense>
        </Box>

        {/* Library Description Section */}
        <Box style={{ marginBottom: '40px' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Typography variant="body1" paragraph>
              At Book Orchid, we believe that books are the seeds of growth, knowledge, and curiosity. Whether you're looking for a gripping novel, insightful non-fiction, or educational resources, we’ve got you covered.
            </Typography>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Typography variant="body1" paragraph>
              Our mission goes beyond providing books. We aim to create a space where imagination blooms, discussions flourish, and lifelong learning takes root. Join us for workshops, author talks, and more, as we nurture a vibrant reading community together.
            </Typography>
          </Suspense>
        </Box>

        {/* Call-to-Action Section */}
        <Box textAlign="center" style={{ marginBottom: '40px' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Typography variant="h5" paragraph>
              Ready to join our blossoming library community?
            </Typography>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Button variant="contained" color="primary" onClick={handleBackToHome}>
              Go Back to Home
            </Button>
          </Suspense>
        </Box>
      </Container>
      </div>
    </SuspenseWrapper>
  );
};

export default AboutUs;
