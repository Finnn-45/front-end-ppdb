"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";

const PageFormKesehatan: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tinggiBadan: "",
    beratBadan: "",
    penyakitMenular: "",
    penyakitAlergi: "",
    pengobatan: "",
    golonganDarah: "",
    butaWarna: "",
    sedangPengobatan: "",
    perokok: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(formData).every((v) => v.trim() !== "");
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
      text: "Form kesehatan kamu berhasil disimpan.",
      icon: "success",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
      confirmButtonColor: "#1E3A8A",
      confirmButtonText: "Lanjutkan",
    }).then(() => {
      router.push("/page-form/page-6");
    });
  };

  const handleBack = () => {
    router.push("/page-form/page-4");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none";
  const selectClass =
    "w-full border border-gray-300 rounded-full px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none";

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 sm:p-6 md:p-10 shadow-sm animate__animated animate__fadeIn animate__slow">
      {/* Header Progress */}
      <div className="mb-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">
          Formulir Pendaftaran
        </h1>

        {/* Stepper 2 - 3 - 4 */}
        <div className="flex justify-center items-center flex-wrap gap-4">
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              3
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500">
              Data Orang Tua / Wali
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              4
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500">
              Rumah Tinggal
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          {/* Step 4 (Aktif) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold text-sm sm:text-base">
              5
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-[#1E3A8A] text-center">
              Data Kesehatan
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
            Riwayat Kesehatan Calon Peserta Didik
          </h2>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="tinggiBadan"
              placeholder="Tinggi Badan (cm)"
              value={formData.tinggiBadan}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="text"
              name="beratBadan"
              placeholder="Berat Badan (kg)"
              value={formData.beratBadan}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="text"
              name="penyakitMenular"
              placeholder="Penyakit menular yang pernah diderita (jika ada)"
              value={formData.penyakitMenular}
              onChange={handleChange}
              className={inputClass}
            />

            <select
              name="penyakitAlergi"
              value={formData.penyakitAlergi}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Penyakit yang pernah diderita / Alergi</option>
              <option value="asma">Asma</option>
              <option value="alergi">Alergi</option>
              <option value="lainnya">Lainnya</option>
            </select>

            <select
              name="pengobatan"
              value={formData.pengobatan}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Apakah sedang dalam pengobatan?</option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>

            <select
              name="golonganDarah"
              value={formData.golonganDarah}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Golongan Darah</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>

            <select
              name="butaWarna"
              value={formData.butaWarna}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Apakah Anda Buta Warna?</option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>

            <select
              name="sedangPengobatan"
              value={formData.sedangPengobatan}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">
                Apakah saat ini Anda sedang dalam pengobatan?
              </option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>

            <select
              name="perokok"
              value={formData.perokok}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Apakah Anda Perokok?</option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>
          </div>
        </section>

        <p className="text-center text-xs sm:text-sm text-gray-500">
          Pastikan semua data kesehatan sudah diisi dengan benar.
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
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
};

export default PageFormKesehatan;
