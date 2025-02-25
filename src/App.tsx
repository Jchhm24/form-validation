import { useState } from 'react'
import { LoginForm } from './components/LoginForm'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessages([...messages, newMessage])
    setNewMessage('')
  }

  // Si no está autenticado, muestra el formulario de login
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Iniciar Sesión</h1>
        <LoginForm onLoginSuccess={handleLogin} />
      </div>
    )
  }

  // Si está autenticado, muestra el sistema de mensajes
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Sistema de Mensajes</h1>
      
      <div className="message-form mb-8">
        <form onSubmit={handleMessageSubmit}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Enviar Mensaje
          </button>
        </form>
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="p-4 border rounded mb-2">
            {msg}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App