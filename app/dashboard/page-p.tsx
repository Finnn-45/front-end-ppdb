"use client";

import React from "react";
import { useRouter } from "next/navigation";

const PagePendaftaran: React.FC = () => {
  const router = useRouter();

  const handleDaftarClick = () => {
    router.push("/dashboard/page-form"); // langsung masuk ke form
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Pendaftaran Siswa Baru
        </h1>
        <p className="text-gray-600 mb-8">
          Silakan klik tombol di bawah untuk mengisi formulir pendaftaran.
        </p>
        <button
          onClick={handleDaftarClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
        >
          Isi Formulir
        </button>
      </div>
    </div>
  );
};

export default PagePendaftaran;
