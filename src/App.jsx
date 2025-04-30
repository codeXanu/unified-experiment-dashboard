import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExperimentDetails from "./pages/ExperimentDetails";
import Header from "./pages/Header"
import Dashboard from "./pages/Dashboard"


function App() {
 

  return (
    <>
      <div className="p-4 max-w-4xl mx-auto" >
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/experiment/:id" element={<ExperimentDetails />} />
          </Routes>
        </Router>
        {/* <Dashboard /> */}
      </div>
    </>
  )
}

export default App
