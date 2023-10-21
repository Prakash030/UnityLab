import React from 'react'
import './ResponsePage.css'

function ResponsePage({result, onClick}) {
  return (
    <div className='container'>
        <div className="card">
            <li onClick={onClick}>
                <strong>{result.title}</strong> - Points: {result.points}
            </li>
        </div>
    </div>
  )
}

export default ResponsePage