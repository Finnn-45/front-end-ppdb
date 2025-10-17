"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function PageForm8() {
  const router = useRouter();

  const handleGoToHistory = () => {
    router.push("/riwayat-lamaran");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#1E3A8A] text-white text-center font-bold py-3 sm:py-4 text-[16px] sm:text-[20px] leading-tight">
          Terima Kasih, Matur Nuwun. Thank You So Much, 감사합니다, ありがとう
        </div>

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
          <p className="text-[15px] sm:text-[18px] font-medium text-black max-w-2xl mx-auto leading-relaxed mb-10">
            Terima kasih telah mendaftar di <strong>SMK TI BAZMA</strong>. Proses
            pengolahan akun Anda sedang kami persiapkan, mohon menunggu 1–2 hari
            untuk proses verifikasi berkas Anda. <strong>TERIMA KASIH!</strong>
          </p>

          {/* Button */}
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
