
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import Home from '../pages/Home'
import TaskManagerPage from "../pages/TaskManagerPage";
import API from "../pages/API";



const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Task_Manager" element={<TaskManagerPage />} />
          <Route path="/API" element={<API />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
