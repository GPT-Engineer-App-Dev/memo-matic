import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateNotePage from "./pages/CreateNotePage.jsx";
import EditNotePage from "./pages/EditNotePage.jsx";
import TrashPage from "./pages/TrashPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/edit/:id" element={<EditNotePage />} />
        <Route path="/trash" element={<TrashPage />} />
      </Routes>
    </Router>
  );
}

export default App;
