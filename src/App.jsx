import { Routes, Route, Link, BrowserRouter, useLocation } from 'react-router';
import Login from './pages/Login';
import HomePage from './pages/WorldProject';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route index path="/world-tool" element={<HomePage />} />
    </Routes>
  );
}

export default App;