"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileText, Megaphone } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ tambahkan router dari Next.js

// Step Alur Pendaftaran — pakai gambar dari /public/icons/
const steps = [
  { name: "Pendaftaran", activeImg: "/icons/1 (1).png", inactiveImg: "/icons/1 (2).png" },
  { name: "Seleksi Berkas", activeImg: "/icons/1 (3).png", inactiveImg: "/icons/1 (4).png" },
  { name: "Tes Akademik", activeImg: "/icons/1 (5).png", inactiveImg: "/icons/1 (6).png" },
  { name: "Tes Psikotest", activeImg: "/icons/1 (7).png", inactiveImg: "/icons/1 (8).png" },
  { name: "Wawancara", activeImg: "/icons/1 (9).png", inactiveImg: "/icons/1 (10).png" },
  { name: "Pengumuman", activeImg: "/icons/1 (11).png", inactiveImg: "/icons/1 (12).png" },
];

export default function PagePendaftaran() {
  const router = useRouter(); // ✅ inisialisasi router
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // biar portal nunggu sampai client-side render
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // kunci scroll body
    } else {
      document.body.style.overflow = "auto"; // balikin normal
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div>
      {/* Header breadcrumb */}
      <section className="w-full bg-white border-b px-8 py-3 flex justify-between items-center">
        <p className="text-sm text-gray-700 font-medium">
          <b>Home/Pendaftaran</b>
        </p>
        <span className="text-xs text-gray-500 border px-3 py-1 rounded-lg">
          No Antrian: 8743587
        </span>
      </section>

      {/* Banner */}
      <section className="w-full relative mt-10">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="/banner-peng.png"
            alt="Banner Hubungi Kami"
            className="w-full h-30 md:h-90 object-cover"
          />
        </div>
      </section>

      {/* Gambar Header + Tombol Modal */}
      <section className="mb-10 mt-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src="/Frame 30171.png"
              alt="Alur Pendaftaran Header"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex justify-end items-center px-6">
              <button
                onClick={() => setShowModal(true)}
                className="border border-white text-white px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-[#1E3A8A] transition"
              >
                Tata Cara Pendaftaran
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Tata Cara Pendaftaran */}
      {mounted &&
        showModal &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Overlay hitam */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowModal(false)}
            />

            {/* Konten modal */}
            <div className="relative z-[101] bg-white rounded-2xl shadow-xl w-full max-w-5xl p-10 mx-4">
              {/* Tombol X */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>

              {/* Judul */}
              <h2 className="text-2xl font-bold text-center text-[#1E3A8A] mb-10">
                Tata Cara Pendaftaran
              </h2>

              {/* Grid isi modal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-700">
                {/* Kolom kiri */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">1</span>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">Daftar Online</h1>
                      <p>
                        Calon siswa membuka website resmi PPDB SMK TI Bazma dan mengisi formulir
                        pendaftaran. Pastikan semua data sesuai identitas asli, karena akan menjadi
                        dasar administrasi seleksi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">2</span>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">Unggah Berkas</h1>
                      <p>
                        Setelah mengisi formulir, calon siswa wajib mengunggah dokumen pendukung.
                        Dokumen ini digunakan sebagai bukti kelulusan dan identitas resmi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">3</span>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">Tes Seleksi</h1>
                      <p>
                        Peserta akan mengikuti beberapa tahap seleksi untuk menilai kemampuan
                        akademik, psikologis, dan motivasi belajar.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kolom kanan */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">4</span>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">Home Visit</h1>
                      <p>
                        Panitia PPDB dapat melakukan kunjungan ke rumah calon siswa untuk mengenal
                        lebih dekat kondisi keluarga dan kesiapan pendidikan berbasis asrama.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">5</span>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">Pengumuman</h1>
                      <p>
                        Hasil seleksi diumumkan di website resmi dan grup WhatsApp PPDB SMK TI
                        Bazma. Pastikan memantau jadwal pengumuman.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">!</span>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900">Keterangan Tambahan</h1>
                      <p>
                        Gap Year — SMK TI Bazma menerima lulusan SMP/MTs yang menunda sekolah
                        maksimal satu tahun setelah kelulusan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Lanjut */}
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => alert("Lanjut ke step berikutnya...")}
                  className="px-8 py-2 bg-[#1E3A8A] text-white rounded-full hover:bg-[#162c6e] transition"
                >
                  Lanjut
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Alur Pendaftaran */}
      <section className="mb-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <h2 className="text-lg font-semibold mb-10 text-center md:text-left">
            Alur Pendaftaran
          </h2>

          {/* Versi desktop */}
          <div className="hidden md:flex relative justify-between items-start">
            {steps.map((step, idx) => {
              const isActive = idx === 0;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center relative step-card flex-1"
                >
                  {idx !== steps.length - 1 && (
                    <div
                      className="absolute top-8 left-1/2 w-full h-[2px] bg-gray-300 z-0"
                      style={{
                        transform: "translateX(50%)",
                        width: "calc(50%)",
                      }}
                    ></div>
                  )}

                  <div className="relative z-10 inline-block">
                    <div
                      className={`absolute -top-2 -left-2 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        isActive ? "bg-green-500 text-white" : "bg-[#1E3A8A] text-white"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <img
                      src={isActive ? step.activeImg : step.inactiveImg}
                      alt={step.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  <p
                    className={`mt-2 text-sm ${
                      isActive ? "font-semibold text-[#1E3A8A]" : "text-gray-600"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Versi mobile */}
          <div className="grid grid-cols-2 gap-6 md:hidden">
            {steps.map((step, idx) => {
              const isActive = idx === 0;
              return (
                <div key={idx} className="flex flex-col items-center step-card">
                  <div className="relative">
                    <div
                      className={`absolute -top-1 -left-1 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                        isActive ? "bg-green-500 text-white" : "bg-[#1E3A8A] text-white"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <img
                      src={isActive ? step.activeImg : step.inactiveImg}
                      alt={step.name}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                  <p
                    className={`text-xs mt-2 text-center ${
                      isActive ? "font-semibold text-[#1E3A8A]" : "text-gray-600"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Let’s Get Started!</h3>
            <p className="text-sm text-gray-600">
              Register now and become part of the next generation of excellence at SMK TI BAZMA.
            </p>
          </div>
          <button
            onClick={() => router.push("/page-form")}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-5 py-2 rounded-full font-medium hover:bg-[#162d66] transition"
          >
            Register Now →
          </button>
        </div>
        <div className="mt-4 border-b border-gray-300"></div>
      </section>
    </div>
  );
}
