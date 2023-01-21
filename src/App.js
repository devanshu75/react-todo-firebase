import './App.css';
import { LogIn } from './auth/LogIn';
import { Registration } from './auth/Registration';

export default function App() {
  return (
    <div className="App container-fluid">
      <LogIn />
      <Registration />
    </div>
  );
}

