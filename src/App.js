import { Route, Routes } from 'react-router-dom';
import { LogIn } from './auth/LogIn';
import { Registration } from './auth/Registration';
import { Todos } from './todos';
import Modals from './modal/modals';


import './App.css';

export default function App() {
  return (
    <div className="App container-fluid h-100">
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/todos' element={<Todos />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </div>
  );
}

