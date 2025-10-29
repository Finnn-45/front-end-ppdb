"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileText, Megaphone, Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    name: "Pendaftaran",
    activeImg: "/icons/1 (1).png",
    inactiveImg: "/icons/1 (2).png",
  },
  {
    name: "Seleksi Berkas",
    activeImg: "/icons/1 (3).png",
    inactiveImg: "/icons/1 (4).png",
  },
  {
    name: "Tes Akademik",
    activeImg: "/icons/1 (5).png",
    inactiveImg: "/icons/1 (6).png",
  },
  {
    name: "Wawancara",
    activeImg: "/icons/1 (9).png",
    inactiveImg: "/icons/1 (10).png",
  },
  {
    name: "Tes Psikotest",
    activeImg: "/icons/1 (7).png",
    inactiveImg: "/icons/1 (8).png",
  },
  {
    name: "Pengumuman",
    activeImg: "/icons/1 (11).png",
    inactiveImg: "/icons/1 (12).png",
  },
];

export default function PagePendaftaran() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"none" | "pending" | "accepted">("none");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("formData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setStatus(parsed.status || "pending");
    }
  }, []);

  const activeStep =
    status === "none"
      ? 0
      : status === "pending"
      ? 1
      : status === "accepted"
      ? 5
      : 0;

  return (
    <div>
      {/* Header breadcrumb */}
      <section className="w-full bg-white border-b px-8 py-3 flex justify-between items-center">
        <p className="text-sm text-gray-700 font-medium">
          <b>Home / Pendaftaran</b>
        </p>
      </section>

      {/* Header Info Pendaftaran */}
      <section className="mt-20 w-full ">
        <div className="bg-[#1E3A8A] text-white rounded-xl shadow-lg p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-10">
            {status === "none" && <FileText className="w-10 h-10 text-white" />}
            {status === "pending" && (
              <Clock className="w-10 h-10 text-yellow-300" />
            )}
            {status === "accepted" && (
              <CheckCircle className="w-10 h-10 text-green-400" />
            )}

            <div>
              {status === "none" && (
                <>
                  <h2 className="text-xl font-bold">Belum Mendaftar</h2>
                  <p className="text-sm text-gray-200">
                    Lengkapi formulir untuk memulai pendaftaran SPMB SMK TI
                    Bazma.
                  </p>
                </>
              )}
              {status === "pending" && (
                <>
                  <h2 className="text-xl font-bold text-yellow-200">
                    Sedang Diverifikasi
                  </h2>
                  <p className="text-sm text-gray-200">
                    Data kamu sedang diproses oleh panitia, mohon tunggu
                    konfirmasi berikutnya.
                  </p>
                </>
              )}
              {status === "accepted" && (
                <>
                  <h2 className="text-xl font-bold text-green-300">
                    Selamat, Kamu Lulus Berkas!
                  </h2>
                  <p className="text-sm text-gray-200">
                    Kamu sudah lolos seleksi berkas dan siap lanjut ke tahap
                    berikutnya.
                  </p>
                </>
              )}
            </div>
          </div>

          {status === "none" && (
            <button
              onClick={() => router.push("/page-form")}
              className="bg-white text-[#1E3A8A] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Daftar Sekarang →
            </button>
          )}
        </div>
      </section>

<section className="relative mb-16 text-center py-14 px-6 bg-gradient-to-r from-[#e8eeff] to-[#f5f8ff] rounded-2xl shadow-lg overflow-hidden mt-10">
  {/* Ornamen latar */}
  <div className="absolute top-0 left-0 w-40 h-40 bg-[#1E3A8A]/10 rounded-full blur-3xl -z-0"></div>
  <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#3b82f6]/10 rounded-full blur-3xl -z-0"></div>

  {/* Konten utama */}
  <div className="relative z-10">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mb-4 tracking-tight">
      Ikuti Langkah-langkah Pendaftaran SPMB
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
      Proses pendaftaran di <b>SMK TI Bazma</b> dibuat mudah, cepat, dan
      transparan. Ikuti setiap tahap di bawah ini dan raih kesempatan menjadi
      bagian dari generasi teknologi masa depan!
    </p>

    {/* Garis hias di bawah teks */}
    <div className="flex justify-center">
      <div className="w-24 h-1 rounded-full bg-[#1E3A8A]"></div>
    </div>
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
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowModal(false)}
            />
            <div className="relative z-[101] bg-white rounded-2xl shadow-xl w-full max-w-5xl p-10 mx-4">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-center text-[#1E3A8A] mb-10">
                Tata Cara Pendaftaran
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-700">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">1</span>
                    <div>
                      <h1 className="text-lg font-semibold">Daftar Online</h1>
                      <p>
                        Calon siswa membuka website resmi SPMB SMK TI Bazma dan
                        mengisi formulir pendaftaran. Pastikan semua data sesuai
                        identitas asli, karena akan menjadi dasar administrasi
                        seleksi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">2</span>
                    <div>
                      <h1 className="text-lg font-semibold">Unggah Berkas</h1>
                      <p>
                        Setelah mengisi formulir, calon siswa wajib mengunggah
                        dokumen pendukung. Dokumen ini digunakan sebagai bukti
                        kelulusan dan identitas resmi. Berkas yang diperlukan
                        meliputi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">3</span>
                    <div>
                      <h1 className="text-lg font-semibold">Tes Seleksi</h1>
                      <p>
                        Peserta akan mengikuti beberapa tahap seleksi untuk
                        menilai kemampuan akademik, psikologis, dan motivasi
                        belajar. Tahap seleksi meliputi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">4</span>
                    <div>
                      <h1 className="text-lg font-semibold">Home Visit</h1>
                      <p>
                        Panitia SPMB dapat melakukan kunjungan ke rumah calon
                        siswa untuk mengenal lebih dekat kondisi lingkungan
                        keluarga. Tujuan dari home visit adalah memastikan
                        kesiapan siswa dan orang tua dalam mendukung pendidikan
                        penuh di SMK TI Bazma yang berbasis asrama.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">5</span>
                    <div>
                      <h1 className="text-lg font-semibold">Pengumuman</h1>
                      <p>
                        Hasil seleksi akan diumumkan secara resmi melalui
                        website SPMB SMK TI Bazma. juga diinformasikan lewat
                        grup WhatsApp resmi. Setiap calon siswa diharapkan
                        memantau pengumuman sesuai dengan jadwal yang telah
                        ditetapkan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-[#1E3A8A]">!</span>
                    <div>
                      <h1 className="text-lg font-semibold">
                        Keterangan Tambahan
                      </h1>
                      <p>
                        Gap Year, SMK TI Bazma memberikan kesempatan bagi
                        lulusan SMP/MTs yang tidak langsung melanjutkan sekolah
                        di tahun kelulusannya. Bagi calon siswa yang mengambil
                        masa jeda atau gap year maksimal satu tahun, tetap
                        diperbolehkan untuk mengikuti proses SPMB.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-2 bg-[#1E3A8A] text-white rounded-full hover:bg-[#162c6e] transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

     

      {/* Alur Pendaftaran (Stepper) */}
      <section className="mb-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">

          {/* Desktop */}
          <div className="hidden md:flex relative justify-between items-start">
            {steps.map((step, idx) => {
              const isActive = idx <= activeStep;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center relative flex-1"
                >
                  {idx !== steps.length - 1 && (
                    <div
                      className={`absolute top-10 left-1/2 w-full h-[2px] ${
                        idx < activeStep ? "bg-green-500" : "bg-gray-300"
                      }`}
                      style={{
                        transform: "translateX(50%)",
                        width: "calc(50%)",
                      }}
                    ></div>
                  )}
                  <div className="relative z-10 inline-block">
                    <div
                      className={`absolute -top-3 -left-3 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <img
                      src={isActive ? step.activeImg : step.inactiveImg}
                      alt={step.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain"
                    />
                  </div>
                  <p
                    className={`mt-2 text-sm md:text-base ${
                      isActive
                        ? "font-semibold text-[#1E3A8A]"
                        : "text-gray-600"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="grid grid-cols-2 gap-6 md:hidden">
            {steps.map((step, idx) => {
              const isActive = idx <= activeStep;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative">
                    <div
                      className={`absolute -top-2 -left-2 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <img
                      src={isActive ? step.activeImg : step.inactiveImg}
                      alt={step.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                    />
                  </div>
                  <p
                    className={`text-xs sm:text-sm mt-2 text-center ${
                      isActive
                        ? "font-semibold text-[#1E3A8A]"
                        : "text-gray-600"
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
    </div>
  );
}
