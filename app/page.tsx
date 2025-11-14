"use client"

import LoginForm from "@/components/login-form"

export default function PageLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d2b6f] px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* Kiri: Form Login */}
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          
          <img
            src="/logo1.png"
            alt="Logo SMK"
            className="w-24 h-24 md:w-90 md:h-28 mb-4 object-contain"
          />

          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 text-center">
            Selamat datang ✨
          </h2>

          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>

        {/* Kanan: Poster (DISEMBUNYIKAN DI MOBILE) */}
        <div className="hidden md:flex flex-1 justify-center items-center bg-[#f5f7ff] p-8">
          <img
            src="/eaa.png"
            alt="Poster PPDB"
            className="max-w-xs md:max-w-md w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}
