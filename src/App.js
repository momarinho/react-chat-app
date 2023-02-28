import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import './index.css';
import Welcome from './components/Welcome';
import ChatBox from './components/ChatBox';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/chatbox" element={<ChatBox />} />
          <Route exact path="/register" element={<Register />} />
          {/* <Route exact path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
