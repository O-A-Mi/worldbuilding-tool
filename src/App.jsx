import { Routes, Route, Link, BrowserRouter, useLocation } from 'react-router';
import Login from './pages/Login';
import HomePage from './pages/WorldProject';
import TimelinePage from './pages/WorldProject/TimelinePage'

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route index path="/world-tool" element={<HomePage />} />
      <Route index path="/world-tool/timeline" element={<TimelinePage />} />
    </Routes>
  );
}

export default App;