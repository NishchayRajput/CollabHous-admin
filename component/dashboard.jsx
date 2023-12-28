// CustomDashboard.jsx
import React from 'react';
import styled from 'styled-components';

// Styled components for better styling
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 2em;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  color: #555;
`;

const CustomDashboard = () => {
  return (
    <DashboardContainer>
      <Heading>Welcome to the Admin Dashboard</Heading>
      {/* <Paragraph>This is a beautifully customized dashboard.</Paragraph> */}
      {/* Add more styled components or elements as needed */}
    </DashboardContainer>
  );
};

export default CustomDashboard;
