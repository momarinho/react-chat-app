import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Navbar from './components/Navbar';
import './index.css';
import Welcome from './components/Welcome';
import ChatBox from './components/ChatBox';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen">
      <Navbar />
      {!user ? <Welcome /> : <ChatBox />}
    </div>
  );
}

export default App;
