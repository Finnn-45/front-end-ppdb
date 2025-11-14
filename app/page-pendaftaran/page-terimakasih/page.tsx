"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function PageForm8() {
  const router = useRouter();

  const handleGoToHistory = () => {
    router.push("/riwayat-lamaran");
  };

  // ✅ Ganti link ini dengan link grup WhatsApp SPMB yang asli
  const handleJoinGroup = () => {
    window.open("https://chat.whatsapp.com/JjCDmRJOCukE8TXXoaDMn8", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">

        {/* Content */}
        <div className="py-12 sm:py-16 px-4 sm:px-10 text-center">
          {/* Check Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center border-[6px] border-black rounded-full">
              <Check className="w-12 h-12 sm:w-16 sm:h-16 text-black" strokeWidth={3} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[22px] sm:text-[28px] font-extrabold text-black mb-6">
            Berkas Berhasil Dikirim
          </h1>

          {/* Description */}
          <p className="text-[15px] sm:text-[18px] font-medium text-black max-w-2xl mx-auto leading-relaxed mb-8">
            <strong>TERIMA KASIH!</strong> telah mendaftar di <strong>SMK TI BAZMA</strong>. Proses
            pengolahan akun Anda sedang kami persiapkan, mohon menunggu 1–2 hari
            untuk proses verifikasi berkas Anda. 
          </p>

          {/* Ajakan Join Group */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl py-6 px-4 mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A8A] mb-3">
              🎉 Ayo Gabung Grup SPMB SMK TI Bazma!
            </h2>
            <p className="text-gray-700 text-sm sm:text-base mb-5">
              Dapatkan informasi terbaru seputar jadwal seleksi, pengumuman, dan panduan langsung dari panitia SPMB.
            </p>
            <button
              onClick={handleJoinGroup}
              className="bg-[#25D366] hover:bg-[#1eb153] text-white font-semibold px-8 py-3 rounded-full transition shadow-md"
            >
              Gabung Grup WhatsApp
            </button>
          </div>

          {/* Button Riwayat */}
          <button
            onClick={handleGoToHistory}
            className="bg-[#1E3A8A] hover:bg-[#162d66] text-white font-bold text-[16px] sm:text-[20px] px-8 sm:px-10 py-3 rounded-md transition"
          >
            Lihat Riwayat Lamaran
          </button>
        </div>
      </div>
    </div>
  );
}
