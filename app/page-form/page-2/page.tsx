"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "animate.css";

interface SemesterScore {
  s3: string;
  s4: string;
  s5: string;
}

interface PrestasiForm {
  math: SemesterScore;
  indo: SemesterScore;
  english: SemesterScore;
  ipa: SemesterScore;
  pai: SemesterScore;
  foreignLanguage: string;
  hafalan: string;
  achievement: string;
  organization: string;
  dream: string;
  hobby: string;
  special: string;
}

const PageFormPrestasi: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<PrestasiForm>({
    math: { s3: "", s4: "", s5: "" },
    indo: { s3: "", s4: "", s5: "" },
    english: { s3: "", s4: "", s5: "" },
    ipa: { s3: "", s4: "", s5: "" },
    pai: { s3: "", s4: "", s5: "" },
    foreignLanguage: "",
    hafalan: "",
    achievement: "",
    organization: "",
    dream: "",
    hobby: "",
    special: "",
  });

  // ===== HANDLE INPUT =====
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field?: keyof PrestasiForm,
    semester?: keyof SemesterScore
  ) => {
    const { name, value } = e.target;

    if (field && semester && typeof formData[field] === "object") {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...(prev[field] as SemesterScore),
          [semester]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ===== VALIDASI FORM =====
  const validateForm = () => {
    // Cek semua nilai semester
    for (const key of ["math", "indo", "english", "ipa", "pai"] as (keyof PrestasiForm)[]) {
      const subject = formData[key] as SemesterScore;
      if (!subject.s3 || !subject.s4 || !subject.s5) {
        return false;
      }
    }

    // Cek field lainnya
    const requiredFields: (keyof PrestasiForm)[] = [
      "foreignLanguage",
      "hafalan",
      "achievement",
      "organization",
      "dream",
      "hobby",
      "special",
    ];

    return requiredFields.every((f) => (formData[f] as string).trim() !== "");
  };


  // ===== HANDLE SUBMIT =====
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
      text: "Form prestasi kamu berhasil disimpan.",
      icon: "success",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
      confirmButtonColor: "#1E3A8A",
      confirmButtonText: "Lanjutkan",
    }).then(() => {
      router.push("/page-form/page-3");
    });
  };

  const handleBack = () => router.push("/page-form");

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none";

  // ===== RENDER =====
  return (
    <div className="w-full max-w-full md:max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 sm:p-6 md:p-10 shadow-sm animate__animated animate__fadeIn">
      {/* Header Progress */}
      <div className="mb-8 sm:mb-12 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">Formulir Pendaftaran</h1>

        <div className="flex justify-center items-center flex-wrap gap-4 sm:space-x-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              1
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">Data Pribadi</p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          {/* Step 2 (active) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold text-sm sm:text-base">
              2
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#1E3A8A]">Data Prestasi</p>
          </div>

          <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold text-sm sm:text-base">
              3
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">Data Orang Tua / Wali</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
        {/* Akademik */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
            Akademik
          </h2>
          <div className="p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="text-left text-gray-700 border-b">
                  <th className="py-2">Mata Pelajaran</th>
                  <th className="px-2 text-center">Semester 3</th>
                  <th className="px-2 text-center">Semester 4</th>
                  <th className="px-2 text-center">Semester 5</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {[
                  { label: "Matematika", key: "math" },
                  { label: "Bahasa Indonesia", key: "indo" },
                  { label: "Bahasa Inggris", key: "english" },
                  { label: "IPA (Ilmu Pengetahuan Alam)", key: "ipa" },
                  { label: "PAI (Pendidikan Agama Islam)", key: "pai" },
                ].map((item) => (
                  <tr key={item.key} className="border-t">
                    <td className="py-2 pr-4">{item.label}</td>
                    {["s3", "s4", "s5"].map((s) => (
                      <td key={s} className="py-1 text-center">
                        <input
                          type="text"
                          className="border rounded px-2 py-1 w-20 text-center"
                          value={
                            (formData[item.key as keyof PrestasiForm] as SemesterScore)[
                            s as keyof SemesterScore
                            ]
                          }
                          onChange={(e) =>
                            handleChange(
                              e,
                              item.key as keyof PrestasiForm,
                              s as keyof SemesterScore
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="foreignLanguage"
                placeholder="Bahasa asing yang disukai (jika ada)"
                value={formData.foreignLanguage}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="hafalan"
                placeholder="Jumlah Hafalan (misal: 5 juz)"
                value={formData.hafalan}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Riwayat Prestasi */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
            Riwayat Prestasi
          </h2>
          <div className="p-4 sm:p-6 grid grid-cols-1 gap-4">
            <input
              type="text"
              name="achievement"
              placeholder="Riwayat Prestasi (Jika Ada)"
              value={formData.achievement}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="organization"
              placeholder="Riwayat Organisasi Sekolah / Non-Sekolah (Jika Ada)"
              value={formData.organization}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </section>

        {/* Cita-cita & Hobi */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
            Cita-cita & Hobi
          </h2>
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="dream"
              placeholder="Cita-cita"
              value={formData.dream}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="hobby"
              placeholder="Hobi / Kegemaran"
              value={formData.hobby}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="special"
              placeholder="Hal Khusus (Keunikan, Passion, Kebiasaan)"
              value={formData.special}
              onChange={handleChange}
              className={`${inputClass} md:col-span-2`}
            />
          </div>
        </section>

        <p className="text-center text-xs sm:text-sm text-gray-500">
          Pastikan semua form terisi dengan benar sebelum lanjut ke tahap berikutnya.
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
};

export default PageFormPrestasi;
