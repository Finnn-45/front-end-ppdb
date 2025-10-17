"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";
import { ChevronDown } from "lucide-react";

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
  const [isLainnya, setIsLainnya] = useState(false);
  const [isLainnyaInfo, setIsLainnyaInfo] = useState(false);

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
    "border border-gray-300 rounded-full px-4 py-3 text-sm sm:text-base w-full placeholder:text-gray-500 focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none min-h-[50px] sm:min-h-[56px]";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = [
      "ayahTelepon",
      "ayahTanggungan",
      "ibuTelepon",
      "ibuTanggungan",
      "waliTanggungan",
      "kerabatTelepon",
    ];
    const finalValue = numericFields.includes(name)
      ? value.replace(/\D/g, "")
      : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (name === "waliSumber" && finalValue.trim() === "") setIsLainnya(false);
    if (name === "infoPPDB" && finalValue.trim() === "")
      setIsLainnyaInfo(false);
  };

  const handleSelectWithOther = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setOther: React.Dispatch<React.SetStateAction<boolean>>,
    key: keyof OrangTuaForm
  ) => {
    const value = e.target.value;
    if (value === "lainnya") {
      setOther(true);
      setFormData((prev) => ({ ...prev, [key]: "" }));
    } else {
      setOther(false);
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const validateForm = () => {
    const emptyFields: string[] = [];
    const labels: Record<keyof OrangTuaForm, string> = {
      ayahNama: "Nama Ayah",
      ayahPendidikan: "Pendidikan Ayah",
      ayahAlamat: "Alamat Ayah",
      ayahTelepon: "Nomor Telepon Ayah",
      ayahPekerjaan: "Pekerjaan Ayah",
      ayahAlamatKerja: "Alamat Tempat Kerja Ayah",
      ayahTanggungan: "Jumlah Tanggungan Ayah",
      ayahHarapan: "Harapan Ayah",
      ibuNama: "Nama Ibu",
      ibuPendidikan: "Pendidikan Ibu",
      ibuAlamat: "Alamat Ibu",
      ibuTelepon: "Nomor Telepon Ibu",
      ibuPekerjaan: "Pekerjaan Ibu",
      ibuAlamatKerja: "Alamat Tempat Kerja Ibu",
      ibuTanggungan: "Jumlah Tanggungan Ibu",
      ibuHarapan: "Harapan Ibu",
      waliNama: "Nama Wali",
      waliHubungan: "Hubungan Wali",
      waliTanggungan: "Jumlah Tanggungan Wali",
      waliPekerjaan: "Pekerjaan Wali",
      waliAlamat: "Alamat Wali",
      waliEmail: "Email Wali",
      waliSumber: "Sumber Penghasilan Wali",
      kerabatNama: "Nama Kerabat",
      kerabatHubungan: "Hubungan Kerabat",
      kerabatTelepon: "Telepon Kerabat",
      infoPPDB: "Sumber Informasi PPDB",
      saudaraBeasiswa: "Saudara Penerima Beasiswa",
      fasilitatorEmail: "Email Fasilitator",
    };
    (Object.keys(labels) as (keyof OrangTuaForm)[]).forEach((key) => {
      if (!formData[key] || formData[key].trim() === "")
        emptyFields.push(labels[key]);
    });
    return emptyFields;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emptyFields = validateForm();
    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap!",
        html: `
          <p class="mb-2">Lengkapi kolom berikut:</p>
          <ul style="text-align:left; display:inline-block;">
            ${emptyFields.map((f) => `<li>• ${f}</li>`).join("")}
          </ul>
        `,
        confirmButtonText: "Oke, isi sekarang",
        confirmButtonColor: "#1E3A8A",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Data Lengkap!",
      text: "Form Data Orang Tua/Wali berhasil disimpan.",
      confirmButtonText: "Lanjutkan",
      confirmButtonColor: "#1E3A8A",
    }).then(() => router.push("/page-form/page-4"));
  };

  const handleBack = () => router.push("/page-form/page-2");

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
        className={inputClass + " appearance-none pr-10"}
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

  return (
    <>
      {/* 🔵 HEADER */}
      <header className="relative h-64 md:h-72 overflow-hidden">
        <img
          src="/bck.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/70 via-[#1E3A8A]/10 to-white"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-[#EAF0FF] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            Formulir Pendaftaran Calon Siswa
          </h1>
          <p className="mt-3 text-[#949494] text-base sm:text-lg md:text-xl font-medium opacity-95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
            Data Orang Tua/Wali
          </p>
        </div>
      </header>

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
                    step === "3"
                      ? "bg-[#1E3A8A] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                <p
                  className={`mt-1 text-xs sm:text-sm ${
                    step === "3" ? "text-[#1E3A8A]" : "text-gray-500"
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

      <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 sm:p-6 md:p-10 shadow-md animate__animated animate__fadeIn ">
        <form onSubmit={handleSubmit} className="space-y-10 text-gray-800">
          {/* ORANG TUA */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Orang Tua Kandung
            </h2>
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <h3 className="col-span-2 font-semibold text-[#1E3A8A]">Ayah</h3>
              {[
                "ayahNama",
                "ayahPendidikan",
                "ayahAlamat",
                "ayahTelepon",
                "ayahPekerjaan",
                "ayahAlamatKerja",
                "ayahTanggungan",
                "ayahHarapan",
              ].map((key) => (
                <input
                  key={key}
                  name={key}
                  placeholder={key
                    .replace(/^ayah/, "")
                    .replace(/([A-Z])/g, " $1")}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  className={inputClass}
                />
              ))}

              <h3 className="col-span-2 font-semibold text-[#1E3A8A] mt-4">
                Ibu
              </h3>
              {[
                "ibuNama",
                "ibuPendidikan",
                "ibuAlamat",
                "ibuTelepon",
                "ibuPekerjaan",
                "ibuAlamatKerja",
                "ibuTanggungan",
                "ibuHarapan",
              ].map((key) => (
                <input
                  key={key}
                  name={key}
                  placeholder={key
                    .replace(/^ibu/, "")
                    .replace(/([A-Z])/g, " $1")}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  className={inputClass}
                />
              ))}
            </div>
          </section>

          {/* WALI */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Informasi Wali
            </h2>
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "waliNama",
                "waliHubungan",
                "waliTanggungan",
                "waliPekerjaan",
                "waliAlamat",
                "waliEmail",
              ].map((key) => (
                <input
                  key={key}
                  name={key}
                  placeholder={key
                    .replace(/^wali/, "")
                    .replace(/([A-Z])/g, " $1")}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  className={inputClass}
                />
              ))}

              {!isLainnya ? (
                <SelectWithIcon
                  name="waliSumber"
                  value={formData.waliSumber}
                  onChange={(e) =>
                    handleSelectWithOther(e, setIsLainnya, "waliSumber")
                  }
                  placeholder="Sumber Penghasilan Wali"
                  options={[
                    { value: "usaha", label: "Usaha" },
                    { value: "kerja", label: "Pekerjaan Tetap" },
                    { value: "lainnya", label: "Lainnya" },
                  ]}
                />
              ) : (
                <input
                  name="waliSumber"
                  placeholder="Tuliskan sumber penghasilan lainnya"
                  value={formData.waliSumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              )}
            </div>
          </section>

          {/* KERABAT */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Kerabat / Relawan yang Dapat Dihubungi
            </h2>
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {["kerabatNama", "kerabatHubungan", "kerabatTelepon"].map(
                (key) => (
                  <input
                    key={key}
                    name={key}
                    placeholder={key.replace(/([A-Z])/g, " $1")}
                    value={(formData as any)[key]}
                    onChange={handleChange}
                    className={inputClass}
                  />
                )
              )}

              {!isLainnyaInfo ? (
                <SelectWithIcon
                  name="infoPPDB"
                  value={formData.infoPPDB}
                  onChange={(e) =>
                    handleSelectWithOther(e, setIsLainnyaInfo, "infoPPDB")
                  }
                  placeholder="Mengetahui PPDB dari"
                  options={[
                    { value: "sosmed", label: "Media Sosial" },
                    { value: "teman", label: "Teman" },
                    { value: "lainnya", label: "Lainnya" },
                  ]}
                />
              ) : (
                <input
                  name="infoPPDB"
                  placeholder="Tuliskan sumber informasi lainnya"
                  value={formData.infoPPDB}
                  onChange={handleChange}
                  className={inputClass}
                />
              )}

              <SelectWithIcon
                name="saudaraBeasiswa"
                value={formData.saudaraBeasiswa}
                onChange={handleChange}
                placeholder="Memiliki Saudara Penerima Beasiswa?"
                options={[
                  { value: "ya", label: "Ya" },
                  { value: "tidak", label: "Tidak" },
                ]}
              />

              <input
                name="fasilitatorEmail"
                placeholder="Email Fasilitator (Jika Ada)"
                value={formData.fasilitatorEmail}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </section>

          {/* FOOTER */}
          <p className="text-center text-xs sm:text-sm text-gray-500">
            Pastikan semua form telah diisi dengan benar sebelum lanjut ke tahap
            berikutnya.
          </p>
          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-auto bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1E3A8A] text-white px-6 py-2 rounded-full hover:bg-[#162d66] transition"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
