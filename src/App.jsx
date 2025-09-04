import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Layout/Sidebar';
import Header from './Layout/Header';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import Activities from './pages/Activities';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;