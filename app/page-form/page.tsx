"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";

const PageForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    nisn: "",
    nik: "",
    birthPlace: "",
    birthDate: "",
    address: "",
    schoolOrigin: "",
    graduationYear: "",
    npsn: "",
    childOrder: "",
    parentStatus: "",
    familyStatus: "",
    socialAid: "",
    livingWith: "",
    phone: "",
    socialMedia: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    for (const [_, value] of Object.entries(formData)) {
      if ((value as string).trim() === "") return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Masih ada kolom yang belum kamu isi. Lengkapi dulu ya 😊",
        confirmButtonText: "Oke, isi sekarang",
        confirmButtonColor: "#1E3A8A",
        background: "#f9fafb",
        color: "#1E293B",
        showClass: {
          popup: "animate__animated animate__shakeX", // 💥 Efek goyang
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }

    console.log("Data Formulir:", formData);

    Swal.fire({
      icon: "success",
      title: "Data Lengkap!",
      text: "Semua kolom sudah terisi. Yuk lanjut ke langkah berikutnya! 🚀",
      confirmButtonColor: "#1E3A8A",
      background: "#f0f4ff",
      color: "#1E3A8A",
      timer: 2000,
      showConfirmButton: false,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      didClose: () => {
        router.push("/page-form/page-2");
      },
    });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none";

  return (
    <div className="w-full max-w-full md:max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 sm:p-6 md:p-10 shadow-sm">
      {/* Header Progress */}
      <div className="mb-8 sm:mb-12 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">
          Formulir Pendaftaran Siswa
        </h1>

        {/* Step Progress */}
        <div className="flex justify-center items-center flex-wrap gap-4 sm:space-x-6">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold text-sm sm:text-base">
              1
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-[#1E3A8A]">
              Data Pribadi
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              2
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500">
              Data Prestasi
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              3
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500">
              Data Orang Tua / Wali
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
        {/* Data Pribadi */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-5 py-3">
            Data Pribadi
          </h2>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="fullName"
              placeholder="Nama Lengkap"
              value={formData.fullName}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="nisn"
              placeholder="NISN"
              value={formData.nisn}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="nik"
              placeholder="NIK"
              value={formData.nik}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </section>

        {/* Tempat & Tanggal Lahir */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-5 py-3">
            Tempat & Tanggal Lahir
          </h2>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="birthPlace"
              placeholder="Tempat Lahir"
              value={formData.birthPlace}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="address"
              placeholder="Alamat Lengkap"
              value={formData.address}
              onChange={handleChange}
              className={`${inputClass} sm:col-span-2`}
            />
          </div>
        </section>

        {/* Sekolah Asal */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-5 py-3">
            Sekolah Asal
          </h2>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="schoolOrigin"
              placeholder="Nama Sekolah"
              value={formData.schoolOrigin}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="graduationYear"
              placeholder="Tahun Lulus"
              value={formData.graduationYear}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="npsn"
              placeholder="NPSN Sekolah"
              value={formData.npsn}
              onChange={handleChange}
              className={`${inputClass} sm:col-span-2`}
            />
          </div>
        </section>

        {/* Informasi Keluarga */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-5 py-3">
            Informasi Keluarga
          </h2>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="childOrder"
              placeholder="Anak ke- (misal: 2 dari 4)"
              value={formData.childOrder}
              onChange={handleChange}
              className={`${inputClass} sm:col-span-2`}
            />
            <select
              name="parentStatus"
              value={formData.parentStatus}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Kondisi Orang Tua</option>
              <option value="lengkap">Lengkap</option>
              <option value="ayah-meninggal">Ayah Meninggal</option>
              <option value="ibu-meninggal">Ibu Meninggal</option>
              <option value="yatim-piatu">Yatim Piatu</option>
            </select>

            <select
              name="familyStatus"
              value={formData.familyStatus}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Status Keluarga</option>
              <option value="kandung">Anak Kandung</option>
              <option value="angkat">Anak Angkat</option>
            </select>

            <select
              name="socialAid"
              value={formData.socialAid}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Menerima Bantuan Sosial?</option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>

            <select
              name="livingWith"
              value={formData.livingWith}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Tinggal Bersama</option>
              <option value="orang-tua">Orang Tua</option>
              <option value="wali">Wali</option>
              <option value="sendiri">Sendiri</option>
            </select>
          </div>
        </section>

        {/* Kontak & Media Sosial */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-5 py-3">
            Kontak & Media Sosial
          </h2>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="tel"
              name="phone"
              placeholder="Nomor HP / WhatsApp"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="socialMedia"
              placeholder="Instagram / Facebook"
              value={formData.socialMedia}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </section>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-500">
          Pastikan semua kolom telah diisi dengan benar sebelum melanjutkan.
        </p>

        <div className="flex flex-col sm:flex-row justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#1E3A8A] text-white font-medium px-8 py-3 rounded-full hover:bg-[#162d66] transition duration-200"
          >
            Lanjutkan
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageForm;
