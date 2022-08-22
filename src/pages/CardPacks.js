import React from 'react'
import GetAllPacks from './GetPacks/GetAllPacks';
import {lang} from '../Languages';

export default function CardPacks(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <div className=''>
      <GetAllPacks/>
    </div>
  )
}