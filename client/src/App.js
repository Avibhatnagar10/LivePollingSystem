import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TeacherPage from './pages/TeacherPage';
import PollResultView from './pages/PollResultView';
import StudentEntry from './pages/StudentEntry';
import StudentWaiting from './pages/StudentWaiting';
import PollHistory from './pages/PollHistory';
import StudentPoll from './pages/StudentPoll'; // ✅ NEW

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/teacher" element={<TeacherPage />} />
      <Route path="/results" element={<PollResultView />} />
      <Route path="/student" element={<StudentEntry />} />
      <Route path="/student/waiting" element={<StudentWaiting />} />
      <Route path="/student/poll" element={<StudentPoll />} />
      <Route path="/history" element={<PollHistory />} />
    </Routes>
  );
}

export default App;
