import { useState } from 'react'
import DOMPurify from 'dompurify'

interface LoginFormProps {
  onLoginSuccess: () => void
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })


  //TODO: Agregamos metodos de validación


  const validateEmail=(email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password:string) => {
    // Debe de tener minimo una letra o número y tener al menos 8 caracteres
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password)
  }

  const sanitizeInput = (input:string) => {
    return DOMPurify.sanitize(input.trim())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const sanitizedEmail = sanitizeInput(credentials.email)
    const sanitizedPassword = credentials.password

    const newErros = {email: '', password: ''}

    if(!validateEmail(sanitizedEmail)){
      newErros.email = 'Por favor ingrese un email valido'
    } 

    if(!validatePassword(sanitizedPassword)){
      newErros.password = 'La contraseña debe tener al menos 8 caracteres y contener al menos un número y una letra'
    }

    setErrors(newErros)

    if(newErros.email || newErros.password){
      console.log('Hay errores en el formulario')
      return
    }

    // TODO: AL body ahora le ponemos los valores sanitizados
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: sanitizedEmail,
        password: sanitizedPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.ok){
        onLoginSuccess()
      }
    }).catch(error => {
      console.error('Error:', error)
    })

    // onLoginSuccess() 
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <input
          type="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
      >
        Iniciar Sesión
      </button>
    </form>
  )
}