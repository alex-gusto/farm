import React from 'react'

export default (props) => {
  return (
    <div className='over-layer'>
      <div>
        {props.children}
      </div>
    </div>
  )
}
