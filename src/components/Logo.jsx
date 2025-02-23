import React from 'react'
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
function Logo({width='50px'}) {
  const {slug}=useParams();

  return (
    <div className='flex justify-center mx-3 motion-scale-in-[0.5] motion-rotate-in-[-10deg] motion-blur-in-[10px] motion-delay-[0.35s]/rotate motion-delay-[0.75s]/blur '>
      <img className='motion-rotate-in-[0.5turn] motion-duration-[6s]' src="https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/710990e0-5b27-4745-b535-92e767a79a06.png?auto=format&q=50" alt="Logo" style={{width}}/>
      <span className='ml-1 my-2 justify-center '>Instant</span>
    </div>
  )
}
export default Logo