import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div>
        <header>
            <Link to='/'>
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
                    <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
                </svg>
            </Link>
        </header>
        <div className='content'>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    </div>
  )
}

export default Error404
