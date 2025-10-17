"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";
import { ChevronDown } from "lucide-react";

const PageFormPribadi: React.FC = () => {
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

  const numericFields = [
    "nisn",
    "nik",
    "graduationYear",
    "npsn",
    "childOrder",
    "phone",
  ];

  // 🔹 Handler input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const newValue = numericFields.includes(name)
      ? value.replace(/\D/g, "")
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // 🔹 Validasi input kosong
  const validateForm = () => {
    const emptyFields: string[] = [];
    const fieldLabels: Record<string, string> = {
      fullName: "Nama Lengkap",
      nisn: "NISN",
      nik: "NIK",
      birthPlace: "Tempat Lahir",
      birthDate: "Tanggal Lahir",
      address: "Alamat Lengkap",
      schoolOrigin: "Nama Sekolah",
      graduationYear: "Tahun Lulus",
      npsn: "NPSN Sekolah",
      childOrder: "Anak Ke-",
      parentStatus: "Kondisi Orang Tua",
      familyStatus: "Status Keluarga",
      socialAid: "Bantuan Sosial",
      livingWith: "Tinggal Bersama",
      phone: "Nomor HP / WhatsApp",
      socialMedia: "Media Sosial",
    };

    for (const [key, value] of Object.entries(formData)) {
      if ((value as string).trim() === "") {
        emptyFields.push(fieldLabels[key]);
      }
    }

    return emptyFields;
  };

  // 🔹 Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emptyFields = validateForm();

    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Kolom Belum Diisi!",
        html: `
          <p class="mb-2">Lengkapi dulu kolom berikut:</p>
          <ul style="text-align:left; display:inline-block;">
            ${emptyFields.map((f) => `<li>• ${f}</li>`).join("")}
          </ul>
        `,
        confirmButtonText: "Oke, isi sekarang",
        confirmButtonColor: "#1E3A8A",
        background: "#f9fafb",
        color: "#1E293B",
        showClass: { popup: "animate__animated animate__shakeX" },
        hideClass: { popup: "animate__animated animate__fadeOutUp" },
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Data Lengkap!",
      text: "Semua kolom sudah diisi dengan benar. Yuk lanjut ke langkah berikutnya!",
      confirmButtonText: "Lanjutkan",
      confirmButtonColor: "#1E3A8A",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    }).then(() => router.push("/page-form/page-2"));
  };

  const inputClass =
    "w-full border border-gray-300 rounded-full px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white placeholder:text-gray-500";

  // 🔹 Select dropdown
  const SelectWithIcon = ({
    name,
    value,
    onChange,
    options,
    placeholder,
  }: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder: string;
  }) => (
    <div className="relative w-full">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="appearance-none w-full border border-gray-300 rounded-full px-4 py-3 pr-10 text-sm sm:text-base focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={20}
      />
    </div>
  );

  return (
    <>
      {/* 🔵 HEADER */}
      <header className="relative h-64 md:h-72 overflow-hidden">
        <img
          src="/bck.png"
          alt="Background Indonesia"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/70 via-[#1E3A8A]/10 to-white"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-[#EAF0FF] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            Formulir Pendaftaran Calon Siswa
          </h1>
          <p className="mt-3 text-[#949494] text-base sm:text-lg md:text-xl font-medium opacity-95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
            Data Pribadi
          </p>
        </div>
      </header>

      {/* 🧾 FORM */}
      <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-2xl p-4 sm:p-6 md:p-10 shadow-md animate__animated animate__fadeIn animate__slow">
        {/* Stepper */}
        <div className="mb-8 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">
            Formulir Pendaftaran Calon Siswa
          </h1>
          <div className="flex justify-center items-center flex-wrap gap-4">
            {["1", "2", "3"].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-semibold ${
                      step === "1"
                        ? "bg-[#1E3A8A] text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  <p
                    className={`mt-1 text-xs sm:text-sm ${
                      step === "1" ? "text-[#1E3A8A]" : "text-gray-500"
                    }`}
                  >
                    {step === "1"
                      ? "Data Pribadi"
                      : step === "2"
                      ? "Data Prestasi"
                      : "Data Orang Tua / Wali"}
                  </p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* FORM FIELD */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Data Pribadi */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Data Pribadi
            </h2>
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                placeholder="Nama Lengkap"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="nisn"
                placeholder="NISN"
                value={formData.nisn}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="nik"
                placeholder="NIK"
                value={formData.nik}
                onChange={handleChange}
                className={`${inputClass} md:col-span-2`}
              />
            </div>
          </section>

          {/* Tempat & Tanggal Lahir */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Tempat & Tanggal Lahir
            </h2>
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
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
              <textarea
                name="address"
                placeholder="Alamat Lengkap"
                value={formData.address}
                onChange={handleChange}
                className={`${inputClass} md:col-span-2 h-28 resize-none rounded-2xl`}
              ></textarea>
            </div>
          </section>
{/* Sekolah Asal */}
<section className="bg-white rounded-xl shadow-sm border overflow-hidden">
  <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
    Sekolah Asal
  </h2>
  <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      name="schoolOrigin"
      placeholder="Nama Sekolah"
      value={formData.schoolOrigin}
      onChange={handleChange}
      className={inputClass}
    />
    <input
      name="graduationYear"
      placeholder="Tahun Lulus"
      value={formData.graduationYear}
      onChange={handleChange}
      className={inputClass}
    />
    <div className="md:col-span-2">
      <input
        name="npsn"
        placeholder="NPSN Sekolah"
        value={formData.npsn}
        onChange={handleChange}
        className={inputClass}
      />
      <p className="text-gray-500 text-xs mt-2 ml-2">
        🔍 Belum tahu NPSN sekolah kamu? Cek di{" "}
        <a
          href="https://referensi.data.kemdikbud.go.id"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1E3A8A] font-medium hover:underline"
        >
          referensi.data.kemdikbud.go.id
        </a>
      </p>
      <ul className="text-gray-500 text-xs mt-1 ml-6 list-decimal">
        <li>Buka link di atas (situs resmi Kemendikbud).</li>
        <li>Pilih menu <strong>“Referensi → Sekolah”</strong>.</li>
        <li>Pilih provinsi, kabupaten/kota, dan jenjang sekolah kamu.</li>
        <li>Klik tombol <strong>“Tampilkan Data”</strong>.</li>
        <li>Cari nama sekolah kamu, lalu salin kode NPSN-nya.</li>
      </ul>
    </div>
  </div>
</section>


          {/* Informasi Keluarga */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Informasi Keluarga
            </h2>
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="childOrder"
                placeholder="Anak ke-"
                value={formData.childOrder}
                onChange={handleChange}
                className={inputClass}
              />
              <SelectWithIcon
                name="parentStatus"
                value={formData.parentStatus}
                onChange={handleChange}
                placeholder="Kondisi Orang Tua"
                options={[
                  { value: "lengkap", label: "Lengkap" },
                  { value: "ayah-meninggal", label: "Ayah Meninggal" },
                  { value: "ibu-meninggal", label: "Ibu Meninggal" },
                  { value: "yatim-piatu", label: "Yatim Piatu" },
                ]}
              />
              <SelectWithIcon
                name="familyStatus"
                value={formData.familyStatus}
                onChange={handleChange}
                placeholder="Status Keluarga"
                options={[
                  { value: "kandung", label: "Anak Kandung" },
                  { value: "angkat", label: "Anak Angkat" },
                ]}
              />
              <SelectWithIcon
                name="socialAid"
                value={formData.socialAid}
                onChange={handleChange}
                placeholder="Menerima Bantuan Sosial?"
                options={[
                  { value: "ya", label: "Ya" },
                  { value: "tidak", label: "Tidak" },
                ]}
              />
              <SelectWithIcon
                name="livingWith"
                value={formData.livingWith}
                onChange={handleChange}
                placeholder="Tinggal Bersama"
                options={[
                  { value: "orang-tua", label: "Orang Tua" },
                  { value: "wali", label: "Wali" },
                  { value: "sendiri", label: "Sendiri" },
                ]}
              />
            </div>
          </section>

          {/* Kontak */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Kontak & Media Sosial
            </h2>
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="phone"
                placeholder="Nomor HP / WhatsApp"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="socialMedia"
                placeholder="Instagram / Facebook"
                value={formData.socialMedia}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </section>

          {/* Tombol */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#1E3A8A] text-white font-medium px-8 py-3 rounded-full hover:bg-[#162d66] transition duration-200"
            >
              Lanjutkan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PageFormPribadi;
