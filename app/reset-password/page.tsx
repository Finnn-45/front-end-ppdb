"use client";

import ResetPassword from "@/components/reset-password";

export default function PageResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d2b6f] px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <img
            src="/logo1.png"
            alt="Logo SMK"
            className="w-24 h-24 md:w-90 md:h-28 mb-4 object-contain"
          />
          
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 text-center">
            Atur Ulang Kata Sandi
          </h2>

          <ResetPassword />
        </div>

        {/* Kanan: Poster */}
        <div className="hidden md:flex flex-1 justify-center items-center bg-[#f5f7ff] p-8">
          <img
            src="/page.png"
            alt="Poster Reset Password"
            className="max-w-xs md:max-w-md w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
