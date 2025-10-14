"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";

interface RumahForm {
  tahunPerolehan: string;
  luasTanah: string;
  kualitasRumah: string;
  statusKepemilikanRumah: string;
  kendaraanDimiliki: string;
  statusKendaraan: string;
  hartaTidakBergerak: string;
  statusHarta: string;
  dayaListrik: string;
  sumberAir: string;
}

export default function PageFormRumah() {
  const router = useRouter();
  const [formData, setFormData] = useState<RumahForm>({
    tahunPerolehan: "",
    luasTanah: "",
    kualitasRumah: "",
    statusKepemilikanRumah: "",
    kendaraanDimiliki: "",
    statusKendaraan: "",
    hartaTidakBergerak: "",
    statusHarta: "",
    dayaListrik: "",
    sumberAir: "",
  });

  const inputClass =
    "border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none w-full";

  const selectClass =
    "border border-gray-300 rounded-full px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none w-full";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(formData).every(
      (value) => value && value.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: "Data Belum Lengkap!",
        text: "Pastikan semua kolom telah diisi sebelum melanjutkan.",
        icon: "warning",
        showClass: { popup: "animate__animated animate__shakeX animate__slow" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
        confirmButtonColor: "#1E3A8A",
        confirmButtonText: "Mengerti",
      });
      return;
    }

    Swal.fire({
      title: "Data Tersimpan!",
      text: "Form Data Rumah kamu berhasil disimpan.",
      icon: "success",
      showClass: {
        popup: "animate__animated animate__fadeInDown animate__slow",
      },
      hideClass: { popup: "animate__animated animate__fadeOutUp animate__slow" },
      confirmButtonColor: "#1E3A8A",
      confirmButtonText: "Lanjutkan",
    }).then(() => router.push("/page-form/page-5"));
  };

  const handleBack = () => router.push("/page-form/page-3");

  return (
    <div className="w-full max-w-full md:max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 sm:p-6 md:p-10 shadow-sm animate__animated animate__fadeIn animate__slow">
      {/* Header dan Stepper */}
      <div className="mb-8 sm:mb-12 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">
          Formulir Pendaftaran
        </h1>

        {/* Stepper (mulai dari 2, step 4 aktif) */}
        <div className="flex justify-center items-center flex-wrap gap-4 sm:space-x-6">
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              2
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Data Prestasi
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              3
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Data Orang Tua / Wali
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          {/* Step 4 (aktif) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold text-sm sm:text-base">
              4
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#1E3A8A]">
              Rumah Tinggal
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
        {/* Rumah Tinggal */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
            Data Rumah Tinggal
          </h2>
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="tahunPerolehan"
              placeholder="Tahun Perolehan"
              value={formData.tahunPerolehan}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="luasTanah"
              placeholder="Luas Tanah (m²)"
              value={formData.luasTanah}
              onChange={handleChange}
              className={inputClass}
            />
            <select
              name="kualitasRumah"
              value={formData.kualitasRumah}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Kualitas Rumah</option>
              <option value="baik">Baik</option>
              <option value="sedang">Sedang</option>
              <option value="kurang">Kurang</option>
            </select>
            <select
              name="statusKepemilikanRumah"
              value={formData.statusKepemilikanRumah}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Status Kepemilikan Rumah</option>
              <option value="milik_sendiri">Milik Sendiri</option>
              <option value="sewa">Sewa</option>
              <option value="menumpang">Menumpang</option>
            </select>
          </div>
        </section>

        {/* Fasilitas */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="border-b border-[#1E3A8A] text-[#1E3A8A] text-base sm:text-lg font-semibold px-6 py-3">
            Fasilitas dan Harta
          </h2>
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="kendaraanDimiliki"
              value={formData.kendaraanDimiliki}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Kendaraan Bermotor</option>
              <option value="motor">Motor</option>
              <option value="mobil">Mobil</option>
              <option value="tidak_ada">Tidak Ada</option>
            </select>

            <select
              name="statusKendaraan"
              value={formData.statusKendaraan}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Status Kepemilikan Kendaraan</option>
              <option value="milik_sendiri">Milik Sendiri</option>
              <option value="pinjam">Pinjam</option>
              <option value="lainnya">Lainnya</option>
            </select>

            <select
              name="hartaTidakBergerak"
              value={formData.hartaTidakBergerak}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Harta Tidak Bergerak</option>
              <option value="tanah">Tanah</option>
              <option value="bangunan">Bangunan</option>
              <option value="tidak_ada">Tidak Ada</option>
            </select>

            <select
              name="statusHarta"
              value={formData.statusHarta}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Status Kepemilikan Harta</option>
              <option value="milik_sendiri">Milik Sendiri</option>
              <option value="warisan">Warisan</option>
              <option value="lainnya">Lainnya</option>
            </select>

            <select
              name="dayaListrik"
              value={formData.dayaListrik}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Daya Listrik</option>
              <option value="450">450 VA</option>
              <option value="900">900 VA</option>
              <option value="1300">1300 VA</option>
              <option value="2200">2200 VA</option>
            </select>

            <select
              name="sumberAir"
              value={formData.sumberAir}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Sumber Air</option>
              <option value="sumur">Sumur</option>
              <option value="pdam">PDAM</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        </section>

        <p className="text-center text-xs sm:text-sm text-gray-500">
          Pastikan semua form telah diisi dengan benar sebelum lanjut ke tahap berikutnya.
        </p>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="w-full sm:w-auto bg-gray-300 text-gray-800 font-medium px-6 sm:px-8 py-2 rounded-full hover:bg-gray-400 transition"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#1E3A8A] text-white font-medium px-6 sm:px-8 py-2 rounded-full hover:bg-[#162d66] transition"
          >
            Selanjutnya
          </button>
        </div>
      </form>
    </div>
  );
}
