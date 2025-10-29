"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";
import { ChevronDown } from "lucide-react";

interface KesehatanForm {
  tinggiBadan: string;
  beratBadan: string;
  penyakitMenular: string;
  penyakitAlergi: string;
  penyakitAlergiLainnya: string;
  pengobatan: string;
  golonganDarah: string;
  butaWarna: string;
  sedangPengobatan: string;
  perokok: string;
}

const PageFormKesehatan: React.FC = () => {
  const router = useRouter();
  const [isAlergiLainnya, setIsAlergiLainnya] = useState(false);
  const [formData, setFormData] = useState<KesehatanForm>({
    tinggiBadan: "",
    beratBadan: "",
    penyakitMenular: "",
    penyakitAlergi: "",
    penyakitAlergiLainnya: "",
    pengobatan: "",
    golonganDarah: "",
    butaWarna: "",
    sedangPengobatan: "",
    perokok: "",
  });

  const inputClass =
    "w-full border border-gray-300 rounded-full px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none";
  const selectClass =
    "w-full border border-gray-300 rounded-full px-4 py-3 text-sm sm:text-base bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none appearance-none pr-10";

  // 🔹 Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle Select Alergi (khusus opsi "lainnya")
  const handleSelectAlergi = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "lainnya") {
      setIsAlergiLainnya(true);
      setFormData((prev) => ({
        ...prev,
        penyakitAlergi: "",
        penyakitAlergiLainnya: "",
      }));
    } else {
      setIsAlergiLainnya(false);
      setFormData((prev) => ({
        ...prev,
        penyakitAlergi: value,
        penyakitAlergiLainnya: "",
      }));
    }
  };

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
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={selectClass}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={20}
      />
    </div>
  );

  // 🔹 Validasi Form
  const validateForm = () => {
    const labels: Record<keyof KesehatanForm, string> = {
      tinggiBadan: "Tinggi Badan",
      beratBadan: "Berat Badan",
      penyakitMenular: "Penyakit Menular",
      penyakitAlergi: "Penyakit / Alergi",
      penyakitAlergiLainnya: "Penyakit / Alergi (Lainnya)",
      pengobatan: "Status Pengobatan",
      golonganDarah: "Golongan Darah",
      butaWarna: "Kondisi Buta Warna",
      sedangPengobatan: "Sedang Dalam Pengobatan",
      perokok: "Status Merokok",
    };

    const emptyFields: string[] = [];

    (Object.keys(formData) as (keyof KesehatanForm)[]).forEach((key) => {
      if (key === "penyakitAlergiLainnya" && !isAlergiLainnya) return;
      if (!formData[key] || formData[key].trim() === "") {
        emptyFields.push(labels[key]);
      }
    });

    return emptyFields;
  };

  // 🔹 Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emptyFields = validateForm();
    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap!",
        html: `<p class="mb-2">Lengkapi kolom berikut:</p>
          <ul style="text-align:left; display:inline-block;">
            ${emptyFields.map((f) => `<li>• ${f}</li>`).join("")}
          </ul>`,
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
      title: "Data Tersimpan!",
      text: "Form kesehatan kamu berhasil disimpan.",
      icon: "success",
      confirmButtonText: "Lanjutkan",
      confirmButtonColor: "#1E3A8A",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    }).then(() => router.push("/page-form/page-6"));
  };

  const handleBack = () => router.push("/page-form/page-4");

  return (
    <>
      {/* HEADER */}
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
            Data Kesehatan
          </p>
        </div>
      </header>

      {/* FORM */}
      {/* 🏠 FORM BAGIAN UTAMA */}
      <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 sm:p-6 md:p-10 shadow-sm animate__animated animate__fadeIn mt-6">
        <div className="mb-8 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">
            Formulir Pendaftaran Calon Siswa
          </h1>

          <div className="flex justify-center items-center flex-wrap gap-4">
            {[3, 4, 5].map((num, i) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-semibold text-sm sm:text-base ${
                      num === 5
                        ? "bg-[#1E3A8A] text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {num}
                  </div>
                  <p
                    className={`mt-1 text-xs sm:text-sm ${
                      num === 5 ? "text-[#1E3A8A]" : "text-gray-500"
                    }`}
                  >
                    {num === 3
                      ? "Data Orangtua / Wali"
                      : num === 4
                      ? "Rumah Tinggal"
                      : "Data kesehatan"}
                  </p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Riwayat Kesehatan Calon Peserta Didik
            </h2>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tinggi & Berat */}
              <div className="flex flex-col md:flex-row gap-4 md:col-span-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="tinggiBadan"
                    placeholder="Tinggi Badan"
                    value={formData.tinggiBadan}
                    onChange={handleChange}
                    className={`${inputClass} pr-10`}
                    min={0}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    cm
                  </span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="number"
                    name="beratBadan"
                    placeholder="Berat Badan"
                    value={formData.beratBadan}
                    onChange={handleChange}
                    className={`${inputClass} pr-10`}
                    min={0}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    kg
                  </span>
                </div>
              </div>


              {/* Alergi */}
              {!isAlergiLainnya ? (
                <SelectWithIcon
                  name="penyakitAlergi"
                  value={formData.penyakitAlergi}
                  onChange={handleSelectAlergi}
                  placeholder="Penyakit / Alergi"
                  options={[
                    { value: "asma", label: "Asma" },
                    { value: "alergi", label: "Alergi" },
                    { value: "TBC", label: "TBC " },
                    { value: "lainnya", label: "Lainnya" },
                  ]}
                />
              ) : (
                <input
                  type="text"
                  name="penyakitAlergiLainnya"
                  placeholder="Tuliskan penyakit/alergi lainnya"
                  value={formData.penyakitAlergiLainnya}
                  onChange={handleChange}
                  className={`${inputClass} animate-fadeIn`}
                />
              )}

              {/* Select lainnya */}
              {[
                "pengobatan",
                "golonganDarah",
                "butaWarna",
                "perokok",
              ].map((key) => {
                const options: { value: string; label: string }[] =
                  key === "pengobatan" || key === "sedangPengobatan"
                    ? [
                        { value: "ya", label: "Ya" },
                        { value: "tidak", label: "Tidak" },
                      ]
                    : key === "golonganDarah"
                    ? [
                        { value: "A", label: "A" },
                        { value: "B", label: "B" },
                        { value: "AB", label: "AB" },
                        { value: "O", label: "O" },
                      ]
                    : [
                        { value: "ya", label: "Ya" },
                        { value: "tidak", label: "Tidak" },
                      ];
                const placeholderMap: Record<string, string> = {
                  pengobatan: "Apakah sedang dalam pengobatan?",
                  golonganDarah: "Golongan Darah",
                  butaWarna: "Apakah Anda Buta Warna?",
                  perokok: "Apakah Anda Perokok?",
                };
                return (
                  <SelectWithIcon
                    key={key}
                    name={key}
                    value={formData[key as keyof KesehatanForm]}
                    onChange={handleChange}
                    options={options}
                    placeholder={placeholderMap[key]}
                  />
                );
              })}
            </div>
          </section>

          <p className="text-center text-xs sm:text-sm text-gray-500">
            Pastikan semua data kesehatan sudah diisi dengan benar.
          </p>

          {/* Tombol */}
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
    </>
  );
};

export default PageFormKesehatan;
