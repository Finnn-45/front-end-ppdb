"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function PageForm8() {
  const router = useRouter();

  const handleGoToHistory = () => {
    router.push("/riwayat-lamaran");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-5xl rounded-xl border border-gray-300 shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#1E3A8A] text-white text-center font-bold py-3 text-[20px] leading-tight">
          Terima Kasih,Matur Nuwun.Thank You So Much,감사합니다,ありがとう
        </div>

        {/* Content */}
        <div className="py-16 text-center">
          {/* Check Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 flex items-center justify-center border-[6px] border-black rounded-full">
              <Check className="w-16 h-16 text-black" strokeWidth={3} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[28px] font-extrabold text-black mb-6">
            Berkas Berhasil Dikirim
          </h1>

          {/* Description */}
          <p className="text-[18px] font-semibold text-black max-w-4xl mx-auto leading-relaxed mb-10">
            Terima Kasih telah mendaftar di <strong>SMK TI BAZMA</strong> proses
            pengolahan akun anda sedang kami persiapkan jadi mohon untuk
            menunggu 1-2 hari untuk proses verivikasi berkas anda,{" "}
            <strong>TERIMA KASIH!</strong>
          </p>

          {/* Button */}
          <button
            onClick={handleGoToHistory}
            className="bg-[#1E3A8A] hover:bg-[#162d66] text-white font-bold text-[20px] px-10 py-3 rounded-md transition"
          >
            Lihat Riwayat Lamaran
          </button>
        </div>
      </div>
    </div>
  );
}
