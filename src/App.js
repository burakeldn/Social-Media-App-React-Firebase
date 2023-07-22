import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </div>
  );
}

export default App;
