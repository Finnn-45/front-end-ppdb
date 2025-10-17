"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";
import { ChevronDown } from "lucide-react";

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

  const numericFields = [
    "nisn",
    "nik",
    "graduationYear",
    "npsn",
    "childOrder",
    "phone",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (numericFields.includes(name) && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      text: "Semua kolom sudah terisi. Yuk lanjut ke langkah berikutnya! 🚀",
      confirmButtonColor: "#1E3A8A",
      background: "#f0f4ff",
      color: "#1E3A8A",
      timer: 2000,
      showConfirmButton: false,
      showClass: { popup: "animate__animated animate__zoomIn" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
      didClose: () => {
        router.push("/page-form/page-2");
      },
    });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-full px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none placeholder:text-gray-500 bg-white";

  // Komponen Section
  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
        {title}
      </h2>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {children}
      </div>
    </section>
  );

  // Komponen Select dengan ikon
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
  }) => {
    return (
      <div className="relative w-full sm:col-span-1">
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
  };

  return (
    <>
 {/* HEADER (disamakan dengan halaman Data Pribadi) */}
<header className="relative h-64 md:h-72 overflow-hidden">
  {/* Background image */}
  <img
    src="/bck.png"
    alt="Background Indonesia"
    className="absolute inset-0 w-full h-full object-cover opacity-85"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/70 via-[#1E3A8A]/10 to-white"></div>

  {/* Text content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-[#EAF0FF] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
      Formulir Pendaftaran Calon Siswa
    </h1>
    <p className="mt-3 text-[#949494] text-base sm:text-lg md:text-xl font-medium opacity-95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
      Data Prestasi
    </p>
  </div>
</header>


      {/* 🧾 FORM SECTION */}
      <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-2xl p-4 sm:p-6 md:p-10 shadow-md animate__animated animate__fadeIn animate__slow ">
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

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* 1️⃣ Data Pribadi */}
          <Section title="Data Pribadi">
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
              className={`${inputClass} sm:col-span-2`}
            />
          </Section>

          {/* 2️⃣ Tempat & Tanggal Lahir */}
          <Section title="Tempat & Tanggal Lahir">
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
            <input
              name="address"
              placeholder="Alamat Lengkap"
              value={formData.address}
              onChange={handleChange}
              className={`${inputClass} sm:col-span-2`}
            />
          </Section>

          {/* 3️⃣ Sekolah Asal */}
          <Section title="Sekolah Asal">
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
            <input
              name="npsn"
              placeholder="NPSN Sekolah"
              value={formData.npsn}
              onChange={handleChange}
              className={`${inputClass} sm:col-span-2`}
            />
            <div className="sm:col-span-2 bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm rounded-lg p-4">
              ℹ️ Nomor Pokok Sekolah Nasional (NPSN) dapat dicek di{" "}
              <a
                href="https://referensi.data.kemdikbud.go.id/index11.php"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:text-blue-900"
              >
                situs Kemendikbud
              </a>
              .
            </div>
          </Section>

          {/* 4️⃣ Informasi Keluarga */}
          <Section title="Informasi Keluarga">
            <input
              name="childOrder"
              placeholder="Anak ke-"
              value={formData.childOrder}
              onChange={handleChange}
              className={`${inputClass} sm:col-span-2`}
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
          </Section>

          {/* 5️⃣ Kontak & Media Sosial */}
          <Section title="Kontak & Media Sosial">
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
          </Section>

          <p className="text-center text-xs sm:text-sm text-gray-500">
            Pastikan semua kolom telah diisi dengan benar sebelum melanjutkan.
          </p>

          <div className="flex justify-end">
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

export default PageForm;
