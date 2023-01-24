import { Route, Routes } from 'react-router-dom';
import { LogIn } from './auth/LogIn';
import { Registration } from './auth/Registration';
import './App.css';

export default function App() {
  return (
    <div className="App container-fluid h-100">
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='login' element={<LogIn />} />
      </Routes>
    </div>
  );
}

