import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Frontpage from "./components/Frontpage";
import Navbar from "./components/Navbar";
import AddClient from "./components/AddClient";
import ClientList from "./components/ClientList";
import SimulateMonthlyFee from "./components/SimulateMonthlyFee";
import ClientPage from "./components/ClientPage";
import AddEditLoan from "./components/AddEditLoan";
import LoanList from "./components/LoanList";
import LoanCosts from "./components/LoanCosts";
import LoanEvaluationList from "./components/LoanEvaluationList";
import LoanEvaluation from "./components/LoanEvaluation"

function App() {
    return (
        <Router>
            <div className="full-height">
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Frontpage/>} />
                    <Route path="/client/add" element={<AddClient/>} />
                    <Route path="/client/list" element={<ClientList/>} />
                    <Route path="/client/simulate" element={<SimulateMonthlyFee/>} />
                    <Route path="/client/:id" element={<ClientPage/>} />
                    <Route path="/client/:idClient/addloan" element={<AddEditLoan/>} />
                    <Route path="/client/:idClient/editloan/:id" element={<AddEditLoan/>} />
                    <Route path="/client/:idClient/loanlist" element={<LoanList/>} />
                    <Route path="/client/loancosts/:id" element={<LoanCosts/>} />
                    <Route path="/loan/list" element={<LoanEvaluationList/>} />
                    <Route path="/loan/:id" element={<LoanEvaluation/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App
