"use client";

import React from "react";

export default function PagePengumuman() {
  return (
    <div>
      {/* === Header bar === */}
      <section className="w-full bg-white border-b px-8 py-3 flex justify-between items-center">
        <p className="text-sm text-gray-700 font-medium">
          <b>Home / Pengumuman</b>
        </p>
        <span className="text-xs text-gray-500 border px-3 py-1 rounded-lg">
          No Antrian: 8743587
        </span>
      </section>

      {/* === Banner 1 (Full SVG) === */}
      <section className="w-full relative mt-10 px-4 md:px-8">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 300"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-48 md:h-72"
          >
            <defs>
              <linearGradient id="b1Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#071233" />
                <stop offset="60%" stopColor="#0f2a5a" />
                <stop offset="100%" stopColor="#16346d" />
              </linearGradient>

              <radialGradient id="spot" cx="70%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#ffffff20" />
                <stop offset="100%" stopColor="#ffffff00" />
              </radialGradient>
            </defs>

            {/* background base */}
            <rect width="1200" height="300" fill="url(#b1Grad)" rx="20" ry="20" />

            {/* subtle top pattern (map-like points / network) */}
            <g opacity="0.18" transform="translate(520,8) scale(1)">
              {/* a few polygonal network dots lines to imitate the screenshot */}
              <polyline points="200,10 230,20 260,10 290,30" fill="none" stroke="#ffffff55" strokeWidth="0.6" />
              <circle cx="200" cy="10" r="1.6" fill="#ffffff88" />
              <circle cx="230" cy="20" r="1.6" fill="#ffffff88" />
              <circle cx="260" cy="10" r="1.6" fill="#ffffff88" />
              <polyline points="320,40 360,60 420,30" fill="none" stroke="#ffffff44" strokeWidth="0.6" />
            </g>

            {/* decorative lighter middle gradient/spot */}
            <ellipse cx="700" cy="180" rx="420" ry="120" fill="url(#spot)" />

            {/* layered waves at bottom */}
            <path d="M0,210 Q220,250 480,210 T1200,210 L1200,300 L0,300 Z" fill="#0b2b55" opacity="0.18" />
            <path d="M0,220 Q240,270 520,220 T1200,220 L1200,300 L0,300 Z" fill="#0f3a74" opacity="0.22" />
            <path d="M0,230 Q260,290 560,230 T1200,230 L1200,300 L0,300 Z" fill="#184a87" opacity="0.26" />

            {/* left character (stylized using shapes) */}
            <g transform="translate(40,60) scale(1)">
              {/* shadow blob behind */}
              <ellipse cx="80" cy="140" rx="90" ry="70" fill="#ffffff10" />
              {/* body */}
              <path
                d="M40 170 C30 140, 40 100, 90 100 C140 100, 150 140, 130 170 C110 200, 60 200, 40 170 Z"
                fill="#2a7af5"
              />
              {/* head */}
              <circle cx="95" cy="85" r="26" fill="#ffd6b3" />
              {/* hair */}
              <path d="M80 72 C86 60, 110 60, 115 72 C100 68, 88 68, 80 72 Z" fill="#173a8a" />
              {/* megaphone */}
              <g transform="translate(-10,6) rotate(-8 120 110)">
                <path d="M145 85 L170 75 L180 95 L155 105 Z" fill="#ffdbe6" />
                <rect x="130" y="78" width="28" height="12" rx="3" fill="#e2e8f0" />
                <rect x="160" y="86" width="12" height="5" rx="2" fill="#c7d2fe" />
              </g>

              {/* detail accents (stars) */}
              <g transform="translate(10,0)" fill="#ffffffcc">
                <circle cx="35" cy="35" r="1.6" />
                <circle cx="65" cy="45" r="1.4" />
                <circle cx="95" cy="30" r="1.8" />
              </g>
            </g>

            {/* right-side dotted constellation decoration */}
            <g transform="translate(760,40)" fill="#ffffffaa">
              <circle cx="0" cy="0" r="2" />
              <circle cx="28" cy="12" r="1.6" />
              <circle cx="64" cy="6" r="2" />
              <line x1="0" y1="0" x2="28" y2="12" stroke="#ffffff55" strokeWidth="0.6" />
              <line x1="28" y1="12" x2="64" y2="6" stroke="#ffffff55" strokeWidth="0.6" />
              {/* a mesh */}
              <polyline points="80,10 110,18 140,8" fill="none" stroke="#ffffff33" strokeWidth="0.6" />
            </g>
          </svg>

          {/* Text area (absolute) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl px-6 text-center">
              <h1 className="text-white text-2xl md:text-4xl font-extrabold leading-snug drop-shadow-md">
                Selamat Anda Lulus!
              </h1>
              <p className="text-white text-sm md:text-lg opacity-90 mt-2">
                Anda telah berhasil lulus ujian dengan hasil memuaskan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === Banner 2 (Full SVG) === */}
      <section className="relative mt-10 px-4 md:px-8">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 300"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-48 md:h-60"
          >
            <defs>
              <linearGradient id="b2Grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eef3ff" />
                <stop offset="70%" stopColor="#ffffff" />
              </linearGradient>
            </defs>

            {/* base */}
            <rect width="1200" height="300" fill="url(#b2Grad)" rx="20" ry="20" />

            {/* left large arcs */}
            <g transform="translate(40,160) scale(1)">
              <path d="M0,0 C40,-70 100,-90 160,-60 C220,-30 260,-10 320,0 L320,12 C260,2 220,-18 160,-48 C100,-78 40,-60 0,0 Z" fill="#cfe1f7" opacity="0.6" />
              <path d="M20,20 C50,-50 110,-70 170,-40 C230,-10 270,10 330,20 L330,34 C270,24 230,4 170,-26 C110,-56 50,-40 20,20 Z" fill="#9fb4d8" opacity="0.4" />
            </g>

            {/* right accent circle */}
            <g transform="translate(1050,30)">
              <circle cx="0" cy="0" r="90" fill="#6b78a2" opacity="0.14" />
              <circle cx="-10" cy="10" r="60" fill="#6b78a2" opacity="0.08" />
            </g>

            {/* subtle bottom fade */}
            <path d="M0,180 C200,230 400,240 600,200 C800,160 1000,140 1200,180 L1200,300 L0,300 Z" fill="#ffffff" opacity="0.12" />
          </svg>

          {/* content area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-black text-xl md:text-3xl font-extrabold leading-snug">
              Silahkan Daftar Ulang
            </h2>
            <p className="text-gray-700 text-base md:text-xl font-semibold mt-2">
              Untuk ke Tahap <span className="text-[#1E3A8A]">Berikutnya</span>
            </p>

            <button
              onClick={() => alert("Menuju ke halaman daftar ulang")}
              className="mt-6 inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium hover:bg-[#16346d] transition"
            >
              Daftar Ulang
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* === Call to Action Bawah === */}
      <section className="mt-16 px-8">
        <div className="border-b border-gray-300 mb-6"></div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Informasi Lebih Lanjut</h3>
            <p className="text-sm text-gray-600">Hubungi kami untuk informasi lebih lanjut</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => alert("Menuju ke kontak")}
              className="inline-flex items-center gap-2 border border-[#1E3A8A] text-[#1E3A8A] px-5 py-2 rounded-full font-medium hover:bg-[#1E3A8A] hover:text-white transition"
            >
              Kontak
            </button>
            <button
              onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2 rounded-full font-medium hover:bg-[#1DA851] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16 .395C7.164.395.002 7.558.002 16.395c0 2.883.754 5.701 2.188 8.193L0 32l7.707-2.03c2.39 1.303 5.08 1.988 7.861 1.988h.002c8.838 0 16-7.162 16-16 0-4.271-1.664-8.285-4.688-11.309C24.287 2.059 20.273.395 16 .395zM16 29.08h-.002c-2.523 0-4.992-.674-7.137-1.951l-.51-.301-4.576 1.203 1.219-4.461-.332-.523C3.621 21.816 2.793 19.164 2.793 16.395c0-7.34 5.869-13.199 13.207-13.199 3.523 0 6.84 1.371 9.332 3.863 2.492 2.492 3.863 5.809 3.863 9.332 0 7.338-5.861 13.189-13.195 13.189zm7.232-9.846c-.396-.199-2.352-1.16-2.715-1.289-.363-.133-.629-.199-.895.199-.266.395-1.027 1.285-1.258 1.551-.232.262-.463.295-.859.098-.396-.199-1.672-.615-3.184-1.961-1.176-1.051-1.977-2.348-2.207-2.742-.23-.395-.025-.607.174-.805.178-.178.395-.463.594-.695.199-.23.266-.395.396-.66.131-.262.066-.496-.033-.695-.098-.199-.895-2.156-1.227-2.953-.322-.777-.65-.67-.895-.684-.23-.012-.496-.014-.762-.014s-.695.1-1.059.496c-.363.395-1.395 1.363-1.395 3.324s1.43 3.855 1.629 4.123c.199.262 2.809 4.293 6.805 6.02.949.41 1.688.652 2.262.836.951.303 1.82.26 2.504.158.764-.115 2.352-.961 2.684-1.889.332-.926.332-1.719.232-1.889-.098-.178-.363-.277-.76-.475z" />
              </svg>
              WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
