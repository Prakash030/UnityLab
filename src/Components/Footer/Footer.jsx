import React from 'react'

function Footer() {
    const year = new Date().getFullYear()
  return (
    <div>
        <div className="footer" style={{textAlign:'center',marginTop:'20px', marginBottom:'20px'}}>
        Copyright {year} by Prakash Nayak. All Rights Reserved
        </div>
    </div>
  )
}

export default Footer