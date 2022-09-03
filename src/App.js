import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Menu from './Menu';
import { PlayerCreation, Game, GameLobby, ErrorPage, GetPackInfo, GetAllPacks, Lobby } from './pages';


export default function App() {

  function storeLanguage(language) {
    localStorage.setItem("language", language);
  }

  let languageStored = localStorage.getItem("language");
  let [language, setLanguage] = useState(
    languageStored ? languageStored : "English"
  );


  let [packID, setPackID] = useState();


  console.log("parent: " + packID);

  return (

    <Router>
      <Routes>
        <Route path='/cards-against-humanity' element={<PlayerCreation language={language} />} />
        <Route path='/lobby' element={<Lobby language={language} />} />
        <Route path='/gameLobby' element={<GameLobby language={language} />} />
        <Route path='/game' element={<Game language={language} />} />
        <Route path='/packInfo/*' element={<GetAllPacks language={language} setPackID={setPackID}/>} />
        <Route path='/packInfo/:id' element={<GetPackInfo />} />
        <Route path='*' element={<ErrorPage language={language} />} />
      </Routes>
      <Menu language={language} handleSetLanguage={language => {
        setLanguage(language);
        storeLanguage(language);
      }} />
    </Router>

  )
}