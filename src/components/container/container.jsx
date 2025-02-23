import React from 'react'

function container({children}) {
  return <div className='w-full max-w-7xl max-auto px-4'>{children}</div>;
  
}

// container accept property as children or children sabhi element ko same css deta hai

export default container