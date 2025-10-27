import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import CalculatorPage from './pages/CalculatorPage';
import { useEffectScrollToTop } from './hooks/useEffectScrollToTop.ts';
import { PATHS } from './routes/paths';


function AppContent() {
  useEffectScrollToTop();

  return (
    <div className="App">
      <Routes>
        <Route path={PATHS.HOME} element={<WelcomePage />} />
        <Route path={PATHS.CALCULATOR} element={<CalculatorPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;