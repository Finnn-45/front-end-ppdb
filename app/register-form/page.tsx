"use client";

import RegisterForm from "@/components/register-form";
import { SMKLogo } from "@/components/smk-logo1";

export default function PageRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d2b6f] px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Kiri: Form Register */}
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 text-center">
            Daftar Akun Baru
          </h2>

          {/* Form Register */}
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>

        {/* Kanan: Poster */}
        <div className="flex-1 flex justify-center items-center bg-[#f5f7ff] p-8">
          <img
            src="/image 19.png"
            alt="Poster PPDB"
            className="max-w-xs md:max-w-md w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
