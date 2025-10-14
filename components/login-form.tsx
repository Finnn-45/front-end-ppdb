"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const users = [
  { email: "admin@gmail.com", password: "admin", role: "admin" },
  { email: "peserta1@gmail.com", password: "12345", role: "peserta" },
  { email: "peserta2@gmail.com", password: "67890", role: "peserta" },
]

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (user) {
      localStorage.setItem("logged_in", "true")
      localStorage.setItem("user_role", user.role)
      localStorage.setItem("user_email", user.email)

      if (user.role === "admin") router.push("/dashboard")
      else router.push("/page-form")
    } else {
      alert("Email atau kata sandi salah!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nama Anda"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Kata Sandi"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex justify-end">
        <a href="#" className="text-sm text-red-500 hover:underline">
          Lupa Kata Sandi?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-[#1d2b6f] text-white py-3 rounded-md hover:bg-[#16215a] transition font-semibold"
      >
        Masuk
      </button>

      <p className="text-center text-sm text-gray-600 mt-2">
        Ga punya akun?{" "}
        <a href="#" className="font-semibold hover:underline">
          Daftar Disini
        </a>
      </p>
    </form>
  )
}
