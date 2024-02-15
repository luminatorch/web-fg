import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayOptions from './components/display/DisplayOptions';
import SuccessPage from './components/pages/SuccessPage';
import MainMenu from './components/menu/MainMenu';
import Login from './components/services/Login';
import NewUser from './components/services/NewUser';
import ListScores from './components/pages/ListScores';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add-score" element={<DisplayOptions />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/list-scores" element={<ListScores/>}> </Route>
      </Routes>
    </Router>
  );
}

export default App;
