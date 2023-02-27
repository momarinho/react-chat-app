import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Navbar from './components/Navbar';
import './index.css';
import Welcome from './components/Welcome';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen">
      <Navbar />
      {!user ? <Welcome /> : <h1>General Kenobi</h1>}
    </div>
  );
}

export default App;
