import React, { useState } from 'react'
import { supabase } from './supabaseClient' // Make sure path is correct

export default function AuthComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // PASTE THE FUNCTIONS INSIDE YOUR COMPONENT HERE:
  async function handleLogin(e) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else alert("Logged in!")
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
  )
}