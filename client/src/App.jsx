import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(()=>{

    const fetchData=async()=>{
      const res=await fetch('http://localhost:5001')
const data=await res.json()
console.log(data)
    }
   fetchData()
  },[])
return(
  <>

  </>
)

}

export default App
