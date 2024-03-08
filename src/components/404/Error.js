import React from 'react'
import './error.css'
import errimg from '../../Images/error.png'
function Error() {
  return (
    <div className='error_container'>
        <img src={errimg} alt="" />
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>The page you are looking doesn't exist or an other error occured. Go back to choose new direction</p>
    </div>
  )
}

export default Error