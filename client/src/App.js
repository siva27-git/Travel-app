import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./modules/Header";
import HomePage from "./modules/HomePage";
import TablePage from "./modules/TablePage";

function App() {
  return (
    <div>

      <Router>
        <Header />
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/all" element={<TablePage />} />
        </Routes >
      </Router>
    </div>
  );
}

export default App;