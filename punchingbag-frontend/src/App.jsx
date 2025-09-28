import { useState } from 'react'
import './App.css'
import UserTextBox from './components/UserTextBox.jsx'
import StressTracker from './components/graph.jsx'
import AIResponse from "./components/AIResponse"
import Bag from './components/Bag.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [aiResponse, setAiResponse] = useState(null)
  const [messages, setMessages] = useState([])


  const handleSendMessage = async (message) => {
    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({message})
      })

      const data = await res.json()
      setAiResponse(data.response)
    } catch (err) {
      console.error("Backend Error:", err)
    }
  }

  return (
    <>

      <div style={{padding: 24}}>
        <div className="container">
          <div>
            <div className="chatwindow">
              <AIResponse response={aiResponse} />
            </div>
          </div>

          <div className='bag-container'> 
            <Bag/>
            <h3>Enter Complaints</h3>
            <UserTextBox onSend={handleSendMessage}/>
          </div>

          <div>
           <StressTracker />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App