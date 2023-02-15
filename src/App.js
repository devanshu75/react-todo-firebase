import { Route, Routes } from 'react-router-dom';
import { LogIn } from './auth/LogIn';
import { Registration } from './auth/Registration';
import { Todos } from './todos';
import './App.css';

export default function App() {
  return (
    <div className="App container-fluid h-100">
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='login' element={<LogIn />} />
        <Route path='login/todos' element={<Todos />} />
        <Route path='/' element={<Todos />} />
      </Routes>
    </div>
  );
}

