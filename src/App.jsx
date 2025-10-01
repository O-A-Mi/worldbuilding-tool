import { Routes, Route, Link, BrowserRouter, useLocation } from 'react-router';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
    </Routes>
  );
}

export default App;