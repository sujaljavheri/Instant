import { useState , useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authservice from './appwrite/Auth'
import { login,logout } from './store/authSlice'
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])
  
  return !loading ? (
  <div className=' border-white bg-gray-400'>
      <div className='w-full '>
        <Header className='max-h-screen'/>
        <main className='w-full block p-4 justify-center flex-auto'>
             <Outlet/>
        </main>
        <Footer className=' flex flex-wrap mt-4'/>
      </div>
  </div>
):(null)
}

export default App
