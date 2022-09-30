import React from 'react'
import Home from './MainLobbyComp/Home'
import { lang } from '../Languages';

export default function ErrorPage(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <>
      <div id='errorPage'>ERROR! {content.error}</div>
      <Home/>
    </>
  )
}
