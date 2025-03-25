import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JudgeDashboard from '../components/JudgeDashboard';

const JudgeRoutes = () => {
  return (
    <Routes>
      <Route path="/judge/:judgeId" element={<JudgeDashboard />} />
    </Routes>
  );
};

export default JudgeRoutes; 