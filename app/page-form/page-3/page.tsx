"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";

interface OrangTuaForm {
  ayahNama: string;
  ayahPendidikan: string;
  ayahAlamat: string;
  ayahTelepon: string;
  ayahPekerjaan: string;
  ayahAlamatKerja: string;
  ayahTanggungan: string;
  ayahHarapan: string;
  ibuNama: string;
  ibuPendidikan: string;
  ibuAlamat: string;
  ibuTelepon: string;
  ibuPekerjaan: string;
  ibuAlamatKerja: string;
  ibuTanggungan: string;
  ibuHarapan: string;
  waliNama: string;
  waliHubungan: string;
  waliTanggungan: string;
  waliPekerjaan: string;
  waliAlamat: string;
  waliEmail: string;
  waliSumber: string;
  kerabatNama: string;
  kerabatHubungan: string;
  kerabatTelepon: string;
  infoPPDB: string;
  saudaraBeasiswa: string;
  fasilitatorEmail: string;
}

export default function PageFormOrangTua() {
  const router = useRouter();
  const [formData, setFormData] = useState<OrangTuaForm>({
    ayahNama: "",
    ayahPendidikan: "",
    ayahAlamat: "",
    ayahTelepon: "",
    ayahPekerjaan: "",
    ayahAlamatKerja: "",
    ayahTanggungan: "",
    ayahHarapan: "",
    ibuNama: "",
    ibuPendidikan: "",
    ibuAlamat: "",
    ibuTelepon: "",
    ibuPekerjaan: "",
    ibuAlamatKerja: "",
    ibuTanggungan: "",
    ibuHarapan: "",
    waliNama: "",
    waliHubungan: "",
    waliTanggungan: "",
    waliPekerjaan: "",
    waliAlamat: "",
    waliEmail: "",
    waliSumber: "",
    kerabatNama: "",
    kerabatHubungan: "",
    kerabatTelepon: "",
    infoPPDB: "",
    saudaraBeasiswa: "",
    fasilitatorEmail: "",
  });

  const inputClass =
    "border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none w-full";

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
        showClass: { popup: "animate__animated animate__shakeX" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
        confirmButtonColor: "#1E3A8A",
        confirmButtonText: "Mengerti",
      });
      return;
    }

    Swal.fire({
      title: "Data Tersimpan!",
      text: "Form Data Orang Tua/Wali kamu berhasil disimpan.",
      icon: "success",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
      confirmButtonColor: "#1E3A8A",
      confirmButtonText: "Lanjutkan",
    }).then(() => router.push("/page-form/page-4"));
  };

  const handleBack = () => router.push("/page-form/page-2");

  return (
    <div className="w-full max-w-full md:max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 sm:p-6 md:p-10 shadow-sm animate__animated animate__fadeIn">
      {/* Header dan Stepper (disamakan dengan page-2) */}
      <div className="mb-8 sm:mb-12 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">
          Formulir Pendaftaran
        </h1>

        <div className="flex justify-center items-center flex-wrap gap-4 sm:space-x-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              1
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Data Pribadi
            </p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

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

          {/* Step 3 (aktif) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold text-sm sm:text-base">
              3
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#1E3A8A]">
              Data Orang Tua / Wali
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
        {/* Orang Tua Kandung */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
            Orang Tua Kandung
          </h2>
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <h3 className="col-span-2 font-semibold text-gray-800">Ayah</h3>
            <input name="ayahNama" placeholder="Nama Ayah Kandung" value={formData.ayahNama} onChange={handleChange} className={inputClass} />
            <input name="ayahPendidikan" placeholder="Pendidikan Terakhir" value={formData.ayahPendidikan} onChange={handleChange} className={inputClass} />
            <input name="ayahAlamat" placeholder="Alamat Domisili Ayah" value={formData.ayahAlamat} onChange={handleChange} className={inputClass} />
            <input name="ayahTelepon" placeholder="Nomor Telepon / HP" value={formData.ayahTelepon} onChange={handleChange} className={inputClass} />
            <input name="ayahPekerjaan" placeholder="Pekerjaan" value={formData.ayahPekerjaan} onChange={handleChange} className={inputClass} />
            <input name="ayahAlamatKerja" placeholder="Alamat Tempat Kerja" value={formData.ayahAlamatKerja} onChange={handleChange} className={inputClass} />
            <input name="ayahTanggungan" placeholder="Jumlah Tanggungan" value={formData.ayahTanggungan} onChange={handleChange} className={inputClass} />
            <input name="ayahHarapan" placeholder="Harapan Orang Tua" value={formData.ayahHarapan} onChange={handleChange} className={inputClass} />

            <h3 className="col-span-2 font-semibold text-gray-800 mt-4">Ibu</h3>
            <input name="ibuNama" placeholder="Nama Ibu Kandung" value={formData.ibuNama} onChange={handleChange} className={inputClass} />
            <input name="ibuPendidikan" placeholder="Pendidikan Terakhir" value={formData.ibuPendidikan} onChange={handleChange} className={inputClass} />
            <input name="ibuAlamat" placeholder="Alamat Domisili Ibu" value={formData.ibuAlamat} onChange={handleChange} className={inputClass} />
            <input name="ibuTelepon" placeholder="Nomor Telepon / HP" value={formData.ibuTelepon} onChange={handleChange} className={inputClass} />
            <input name="ibuPekerjaan" placeholder="Pekerjaan" value={formData.ibuPekerjaan} onChange={handleChange} className={inputClass} />
            <input name="ibuAlamatKerja" placeholder="Alamat Tempat Kerja" value={formData.ibuAlamatKerja} onChange={handleChange} className={inputClass} />
            <input name="ibuTanggungan" placeholder="Jumlah Tanggungan" value={formData.ibuTanggungan} onChange={handleChange} className={inputClass} />
            <input name="ibuHarapan" placeholder="Harapan Orang Tua" value={formData.ibuHarapan} onChange={handleChange} className={inputClass} />
          </div>
        </section>

        {/* Informasi Wali */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
            Informasi Wali
          </h2>
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="waliNama" placeholder="Nama Wali" value={formData.waliNama} onChange={handleChange} className={inputClass} />
            <input name="waliHubungan" placeholder="Hubungan dengan Wali" value={formData.waliHubungan} onChange={handleChange} className={inputClass} />
            <input name="waliTanggungan" placeholder="Jumlah Tanggungan" value={formData.waliTanggungan} onChange={handleChange} className={inputClass} />
            <input name="waliPekerjaan" placeholder="Pekerjaan Wali" value={formData.waliPekerjaan} onChange={handleChange} className={inputClass} />
            <input name="waliAlamat" placeholder="Alamat Domisili Wali" value={formData.waliAlamat} onChange={handleChange} className={inputClass} />
            <input name="waliEmail" placeholder="Alamat Email Wali" value={formData.waliEmail} onChange={handleChange} className={inputClass} />
            <select name="waliSumber" value={formData.waliSumber} onChange={handleChange} className={inputClass}>
              <option value="">Sumber Penghasilan Lain</option>
              <option value="usaha">Usaha</option>
              <option value="kerja">Pekerjaan Lain</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        </section>

        {/* Kerabat */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
            Kerabat / Relawan yang Dapat Dihubungi
          </h2>
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="kerabatNama" placeholder="Nama Kerabat" value={formData.kerabatNama} onChange={handleChange} className={inputClass} />
            <input name="kerabatHubungan" placeholder="Hubungan dengan Calon Siswa" value={formData.kerabatHubungan} onChange={handleChange} className={inputClass} />
            <input name="kerabatTelepon" placeholder="Nomor HP / Whatsapp" value={formData.kerabatTelepon} onChange={handleChange} className={inputClass} />
            <select name="infoPPDB" value={formData.infoPPDB} onChange={handleChange} className={inputClass}>
              <option value="">Mengetahui PPDB dari</option>
              <option value="sosmed">Media Sosial</option>
              <option value="teman">Teman</option>
              <option value="lainnya">Lainnya</option>
            </select>
            <select name="saudaraBeasiswa" value={formData.saudaraBeasiswa} onChange={handleChange} className={inputClass}>
              <option value="">Memiliki Saudara Penerima Beasiswa?</option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>
            <input name="fasilitatorEmail" placeholder="Email Fasilitator (Jika Ada)" value={formData.fasilitatorEmail} onChange={handleChange} className={inputClass} />
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
