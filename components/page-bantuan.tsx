"use client";

import React from "react";
import {
  Phone,
  Mail,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export default function PageBantuan() {
  // Nomor WhatsApp sekolah
  const whatsappNumber = "6283890713395"; // tanpa 0 di depan, pakai kode negara
  const whatsappMessage =
    "Halo, saya ingin bertanya mengenai PPDB SMK TI Bazma.";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="w-full bg-white border-b px-8 py-3 flex justify-between items-center shadow-sm">
        <p className="text-sm text-gray-700 font-medium">
          <b>Home / Bantuan</b>
        </p>
      </section>

      {/* Banner Section */}
      <section className="w-full relative mt-10">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/banner.png"
            alt="Banner Bantuan"
            className="w-full h-48 md:h-72 object-cover"
          />
        </div>

        {/* Tombol CTA di bawah banner */}
        <div className="absolute inset-x-0 -bottom-8 flex justify-center">
          <button
            onClick={() =>
              window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  whatsappMessage
                )}`,
                "_blank"
              )
            }
            className="bg-white text-gray-800 font-medium rounded-full flex items-center justify-center gap-3 px-8 md:px-16 py-3 md:py-4 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 w-[90%] sm:w-[80%] md:w-[65%] text-sm md:text-base"
          >
            <MessageCircle className="text-green-500 w-5 h-5" />
            <span>Chat dengan kami melalui WhatsApp</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </section>

      {/* Kontak Sekolah */}
 {/* Kontak Sekolah */}
<section className="mt-24 px-6 md:px-12 lg:px-20 mb-20">
  <h2 className="text-3xl font-bold text-[#1E3A8A] mb-10 text-center md:text-left">
    Hubungi Kami
  </h2>

  {/* Card Media Sosial Besar */}
  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-10 border-t border-b border-gray-100 w-full">

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {/* WhatsApp */}
      <button
        onClick={() =>
          window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`,
            "_blank"
          )
        }
        className="flex flex-col items-center justify-center bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div className="bg-green-50 p-4 rounded-full mb-3">
          <MessageCircle className="text-green-500 w-10 h-10" />
        </div>
        <span className="font-semibold text-gray-800 text-base">
          WhatsApp
        </span>
        <p className="text-gray-500 text-sm mt-1 text-center">
          Chat langsung dengan admin PPDB
        </p>
      </button>

      {/* Instagram */}
      <a
        href="https://instagram.com/smktibazma"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div className="bg-pink-50 p-4 rounded-full mb-3">
          <Instagram className="text-pink-500 w-10 h-10" />
        </div>
        <span className="font-semibold text-gray-800 text-base">
          Instagram
        </span>
        <p className="text-gray-500 text-sm mt-1 text-center">
          Ikuti kegiatan dan info terbaru
        </p>
      </a>

      {/* YouTube */}
      <a
        href="https://youtube.com/@smktibazma"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div className="bg-red-50 p-4 rounded-full mb-3">
          <Youtube className="text-red-500 w-10 h-10" />
        </div>
        <span className="font-semibold text-gray-800 text-base">
          YouTube
        </span>
        <p className="text-gray-500 text-sm mt-1 text-center">
          Tonton konten dan dokumentasi sekolah
        </p>
      </a>
    </div>
  </div>
</section>


    {/* Alamat Sekolah */}
{/* Alamat Sekolah */}
<section className="bg-[#1E3A8A] text-white py-10 px-6 md:px-12 lg:px-20 rounded-t-3xl shadow-inner">
  <div className="max-w-5xl mx-auto text-center md:text-left">
    <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-yellow-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 22s8-5.5 8-12a8 8 0 10-16 0c0 6.5 8 12 8 12z"
        />
      </svg>
      Alamat Sekolah
    </h2>

    <p className="text-sm md:text-base leading-relaxed text-gray-100 max-w-2xl mx-auto md:mx-0">
      <span className="block mt-3 text-gray-200">
        📍 Jl. Raya Cikampak Cicadas,<br />
        RT.1/RW.1, Cicadas, Kec. Ciampea,<br />
Kabupaten Bogor, Jawa Barat 16620
      </span>
    </p>

    {/* Gambar maps */}
    <div className="mt-6 w-full rounded-xl overflow-hidden shadow-lg">
      <iframe
        title="Lokasi SMK TI Bazma"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.582725644776!2d106.68614297499339!3d-6.574228493419177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69db2b478d2725%3A0xa31558d4689b78c5!2sIslamic%20Boarding%20School%20SMK%20TI%20BAZMA!5e0!3m2!1sen!2sid!4v1761753004550!5m2!1sen!2sid"
        className="w-full h-64 md:h-80"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    {/* Garis dekoratif */}
    <div className="mt-6 flex justify-center md:justify-start">
      <div className="w-24 h-1 rounded-full bg-yellow-300"></div>
    </div>
  </div>
</section>


    </div>
  );
}
