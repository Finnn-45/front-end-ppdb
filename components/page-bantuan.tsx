"use client";

import React from "react";

export default function PageBantuan() {
  return (
    <div>
      <div className="flex items-center justify-between">
      </div>

      <section className="tw-full bg-white border-b px-8 py-3 flex justify-between items-center">
        <p className="text-sm text-gray-700 font-medium">
          <b>Home/Bantuan</b>
        </p>
        <span className="text-xs text-gray-500 border px-3 py-1 rounded-lg">
          No Antrian: 8743587
        </span>
      </section>

      {/* Section Banner Hubungi Kami */}
      <section className="w-full relative mt-10">
        {/* Banner */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="/banner.png"
            alt="Banner Hubungi Kami"
            className="w-full h-40 md:h-70 object-cover"
          />
        </div>

        {/* Tombol overlap di bawah banner */}
        <div className="absolute inset-x-0 -bottom-8 flex justify-center">
          <button
            onClick={() => (window.location.href = "/kontak")} // ganti route sesuai kebutuhan
            className="
        bg-white text-gray-800 font-medium
        rounded-full flex items-center justify-center
        px-10 md:px-20 py-3 md:py-4
        shadow-lg hover:shadow-xl transition
        w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]
        text-sm md:text-base
      "
          >
            <span className="text-green-500 text-lg mr-2">📞</span>
            <span>Ceritakan masalah anda, kami akan membantu</span>
          </button>
        </div>
      </section>

      {/* Kontak Sekolah */}
      <section className="mt-20">
        <h2 className="text-lg font-semibold mb-6">Kontak Sekolah</h2>
        <div className="space-y-4">
          {/* Telepon */}
          <div className="flex items-center gap-3 border-b pb-2">
            <i className="ri-phone-line text-[#1E3A8A] text-xl"></i>
            <span className="text-[#1E3A8A] font-medium">Telepon:</span>
            <p className="text-gray-700">(0838 9071 3395)</p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border-b pb-2">
            <i className="ri-mail-line text-[#1E3A8A] text-xl"></i>
            <span className="text-[#1E3A8A] font-medium">Email:</span>
            <p className="text-gray-700">(smktibazma@gmail.com)</p>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-3 border-b pb-2">
            <i className="ri-instagram-line text-[#1E3A8A] text-xl"></i>
            <span className="text-[#1E3A8A] font-medium">Instagram:</span>
            <p className="text-gray-700">(smktibazma)</p>
          </div>

          {/* Youtube */}
          <div className="flex items-center gap-3 border-b pb-2">
            <i className="ri-youtube-line text-[#1E3A8A] text-xl"></i>
            <span className="text-[#1E3A8A] font-medium">Youtube:</span>
            <p className="text-gray-700">(smktibazma)</p>
          </div>
        </div>
      </section>


    </div>
  );
}
