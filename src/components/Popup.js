import React from 'react'
import './Popups.css'

function Popup(props) {
  return (props.trigger) ?(
    <div className='popupBack'>
        <div className='popupWindow'>
            <button className='btnClose' onClick={() => props.setTrigger(false)}> X</button>
            {props.children}
        </div>
    </div>
  ) : '';
}

export default Popup