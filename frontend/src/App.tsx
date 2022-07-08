import { useSelector } from 'react-redux';
import { Routes } from 'react-router-dom';

const App: React.FC = () => {
  const user = useSelector((state: any) => state.authReducer.authData);
  return (
    <div
      className="App"
      style={{
        height:
          window.location.href === 'http://localhost:4000/chat'
            ? 'calc(100vh - 2rem)'
            : 'auto',
      }}
    >
      <div className="blur" style={{ top: '-18%', right: '0' }} />
      <div className="blur" style={{ top: '36%', left: '-8rem' }} />
      <Routes></Routes>
    </div>
  );
};

export default App;
