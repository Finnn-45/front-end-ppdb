"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import Swal from "sweetalert2";
import "animate.css";

const PageFormAturan: React.FC = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleBack = () => {
    router.push("/page-form/page-4");
  };

  const handleSubmit = () => {
    // Cek apakah semua sudah dijawab
    const unanswered = answers.find((ans) => ans === null);
    const notAgreed = answers.find((ans) => ans === "tidak");

    if (unanswered || notAgreed) {
      Swal.fire({
        title: "Masih ada pernyataan yang belum disetujui!",
        text: "Harap setujui semua pernyataan dengan memilih 'Ya' sebelum melanjutkan.",
        icon: "warning",
        confirmButtonColor: "#1E3A8A",
        confirmButtonText: "Oke, saya setujui dulu",
        showClass: {
          popup: "animate__animated animate__headShake animate__slow",
        },
      });
      return;
    }

    router.push("/page-form/page-6");
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const pernyataanList = [
    `Saya dengan sungguh-sungguh menyatakan bahwa :
1. Seluruh data dan dokumen yang saya lampirkan dalam berkas pendaftaran PPDB SMK TI BAZMA TA 2025-2026 adalah benar;
2. Saya mendukung anak/tanggungan saya untuk mengikuti seluruh rangkaian seleksi PPDB SMK TI BAZMA yang telah ditetapkan;
3. Jika anak/tanggungan saya diterima, saya memberi izin untuk tinggal di asrama selama masa pendidikan.`,
    `Saya dengan sungguh-sungguh menyatakan bahwa :
1. Saya bersedia mematuhi seluruh aturan, tata tertib, dan kebijakan yang berlaku di SMK TI BAZMA;
2. Saya memahami bahwa pelanggaran terhadap aturan dapat mengakibatkan sanksi sesuai ketentuan sekolah.`,
    `Saya dengan sungguh-sungguh menyatakan bahwa :
1. Semua informasi yang saya berikan adalah benar;
2. Apabila dibutuhkan, saya bersedia memberikan dokumen tambahan untuk melengkapi data pendaftaran.`,
  ];

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-xl p-6 sm:p-10 shadow-sm animate__animated animate__fadeInUp animate__slow">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">
          Formulir Pendaftaran
        </h1>
        {/* Stepper */}
        <div className="flex justify-center items-center flex-wrap gap-4">
          {/* Step 4 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              4
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500">
              Kesehatan
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          {/* Step 5 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              5
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500 text-center">
              Data Orang Tua / Wali
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          {/* Step 6 (aktif) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold text-sm sm:text-base">
              6
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-[#1E3A8A] text-center">
              Aturan Sekolah
            </p>
          </div>
        </div>
      </div>

      {/* Judul Tengah */}
      <div className="bg-[#1E3A8A] text-white rounded-t-lg text-center py-3 mb-4 font-semibold text-lg sm:text-xl">
        Pernyataan dan Kesediaan Mengikuti Aturan SMK TI BAZMA
      </div>

      {/* Accordion Section */}
      <div className="space-y-4">
        {pernyataanList.map((text, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow-sm overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleAccordion(index)}
              type="button"
              className="w-full flex justify-between items-center px-6 py-4 text-left text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>Pernyataan {index + 1}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-sm text-gray-700 whitespace-pre-line animate__animated animate__fadeIn animate__slow">
                {text}

                {/* Pilihan Ya / Tidak */}
                <div className="mt-4 flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`pernyataan-${index}`}
                      value="ya"
                      checked={answers[index] === "ya"}
                      onChange={() => handleAnswerChange(index, "ya")}
                      className="text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                    <span>Ya</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`pernyataan-${index}`}
                      value="tidak"
                      checked={answers[index] === "tidak"}
                      onChange={() => handleAnswerChange(index, "tidak")}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span>Tidak</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-10 gap-3">
        <button
          onClick={handleBack}
          className="w-full sm:w-auto bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-full hover:bg-gray-400 transition"
        >
          Kembali
        </button>

        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-[#1E3A8A] text-white font-medium px-6 py-2 rounded-full hover:bg-[#162d66] transition"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default PageFormAturan;
