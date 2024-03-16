import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MainNavBar from './components/MainNavBar';
import SjfScheduler from './components/SjfScheduler';
import RRScheduler from './components/RRScheduler';

const App = () => {
  return (
    <BrowserRouter>
      <MainNavBar />
      <main className="max-w-screen-xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sjf-scheduler" element={<SjfScheduler />} />
          <Route path="/rr-scheduler" element={<RRScheduler />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
