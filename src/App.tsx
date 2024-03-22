import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MainNavBar from './components/MainNavBar';
import SjfScheduler from './components/SjfScheduler';
import RRScheduler from './components/RRScheduler';
import Credits from './components/Credits';

const App = () => {
  return (
    <BrowserRouter basename="/schedulers">
      <div className="flex min-h-screen flex-col">
        <MainNavBar />
        <main>
          <div className="max-w-screen-xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sjf-scheduler" element={<SjfScheduler />} />
              <Route path="/rr-scheduler" element={<RRScheduler />} />
            </Routes>
          </div>
        </main>
        <footer className="bg-black mt-auto">
          <Credits />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
