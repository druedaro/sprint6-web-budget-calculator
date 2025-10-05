import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import CalculatorPage from './pages/CalculatorPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;