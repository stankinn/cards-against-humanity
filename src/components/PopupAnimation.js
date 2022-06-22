import React from 'react'
import '../components-styles/Popups.css'
import '../components-styles/Animations.css'

function PopupAnimation(props) {
  return (props.trigger) ?(
    <div className='popupBack' onClick={() => props.setTrigger(false)}>
      {props.children}
    </div>
  ) : '';
}

export default PopupAnimation