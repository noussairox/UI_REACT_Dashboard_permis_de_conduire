import './App.css';
import Dashboard from './components/Dashboard';
import Candidates from './components/CandidateList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExamDateList from './components/ExamDateList';
import ReservationForm from './components/ReservationForm';
import Payment from './components/Payment';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="candidates" element={<Candidates/>} />
          <Route path="dateExam" element={<ExamDateList/>} />
          <Route path="reservation" element={<ReservationForm/>} />
          <Route path="payment" element={<Payment/>} />

        </Routes>
    </Router>
  );
}

export default App;
