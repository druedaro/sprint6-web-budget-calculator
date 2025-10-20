import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import CalculatorPage from './pages/CalculatorPage';
import ScrollToTop from './components/utils/ScrollToTop';
import { PATHS } from './routes/paths';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path={PATHS.HOME} element={<WelcomePage />} />
          <Route path={PATHS.CALCULATOR} element={<CalculatorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;