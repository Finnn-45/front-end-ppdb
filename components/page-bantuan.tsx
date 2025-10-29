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
      <section className="mt-24 px-6 md:px-12 lg:px-20 mb-16">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-8 text-center md:text-left">
          Hubungi Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telepon */}
          <a
            href="tel:083890713395"
            className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-[#1E3A8A]/10 p-3 rounded-full">
              <Phone className="text-[#1E3A8A] w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Telepon</h3>
              <p className="text-gray-600 text-sm">(0838 9071 3395)</p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/smktibazma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-[#1E3A8A]/10 p-3 rounded-full">
              <Instagram className="text-[#1E3A8A] w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Instagram</h3>
              <p className="text-gray-600 text-sm">@smktibazma</p>
            </div>
          </a>

          {/* YouTube - full lebar + isi di tengah */}
          <a
            href="https://youtube.com/@smktibazma"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col sm:flex-row items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2 overflow-hidden text-center"
          >
            {/* Background SVG dekoratif */}
            <svg
              className="absolute right-0 bottom-0 w-40 opacity-10 pointer-events-none"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#1E3A8A"
                d="M45.3,-70.2C59.3,-61.1,72.2,-49,78.2,-34.3C84.2,-19.5,83.4,-2.1,77.2,13.6C71,29.3,59.4,43.4,46.1,54.2C32.8,65,16.4,72.4,0.2,72.1C-16,71.8,-32.1,63.8,-46.7,53C-61.3,42.2,-74.3,28.6,-78.8,12.4C-83.3,-3.8,-79.4,-22.7,-69.3,-37.3C-59.2,-51.8,-43,-62,-26.3,-70.2C-9.5,-78.4,7.8,-84.7,24.8,-83.3C41.9,-81.9,58.6,-72.9,45.3,-70.2Z"
                transform="translate(100 100)"
              />
            </svg>

            {/* Konten utama */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="bg-[#1E3A8A]/10 p-3 rounded-full">
                <Youtube className="text-[#1E3A8A] w-10 h-10" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">YouTube</h3>
                <p className="text-gray-600 text-sm">
                  SMK TI Bazma Official Channel
                </p>
              </div>
            </div>
          </a>
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
      <b>SMK TI Bazma</b> terletak di daerah yang asri dan strategis,
      memberikan suasana belajar yang nyaman serta mendukung proses
      pengembangan karakter dan kompetensi siswa.
      <br />
      <span className="block mt-3 text-gray-200">
        📍 Jl. Raya Cibadak No. 99,<br />
        Kec. Ciampea, Kabupaten Bogor,<br />
        Jawa Barat 16620
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
