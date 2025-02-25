import { useState } from 'react'

interface LoginFormProps {
  onLoginSuccess: () => void
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de autenticación básica
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      onLoginSuccess() // Llamamos a la función cuando el login es exitoso
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        className="w-full p-2 mb-4 border rounded"
      />
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
      >
        Iniciar Sesión
      </button>
    </form>
  )
}