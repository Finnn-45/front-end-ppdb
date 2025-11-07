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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field?: keyof PrestasiForm,
    semester?: keyof SemesterScore
  ) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");

    if (field && semester && typeof formData[field] === "object") {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...(prev[field] as SemesterScore),
          [semester]: numericValue,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const emptyFields: string[] = [];
    const subjects: Record<string, string> = {
      math: "Matematika",
      indo: "Bahasa Indonesia",
      english: "Bahasa Inggris",
      ipa: "IPA",
      pai: "PAI",
    };

    for (const key of Object.keys(subjects) as (keyof PrestasiForm)[]) {
      const subject = formData[key] as SemesterScore;
      if (!subject.s3 || !subject.s4 || !subject.s5) {
        emptyFields.push(`Nilai ${subjects[key]} (Semester 3, 4, 5)`);
      }
    }

    const fieldLabels: Record<string, string> = {
      dream: "Cita-cita",
      hobby: "Hobi / Kegemaran",
      special: "Hal Khusus",
    };

    for (const key of Object.keys(fieldLabels) as (keyof PrestasiForm)[]) {
      if ((formData[key] as string).trim() === "") {
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
        title: "Data Belum Lengkap!",
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
      text: "Form prestasi kamu berhasil disimpan.",
      confirmButtonText: "Lanjutkan",
      confirmButtonColor: "#1E3A8A",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    }).then(() => router.push("/page-form/page-orangtua"));
  };

  const handleBack = () => router.push("/page-form");

  const inputClass =
    "w-full border border-gray-300 rounded-full px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none transition duration-200";

  return (
    <>
       {/* 🔵 HEADER DENGAN GRADIENT BIRU & PETA INDONESIA */}
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
                      step === "2"
                        ? "bg-[#1E3A8A] text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  <p
                    className={`mt-1 text-xs sm:text-sm ${
                      step === "2" ? "text-[#1E3A8A]" : "text-gray-500"
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Akademik */}
          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <h2 className="bg-[#1E3A8A] text-white text-base sm:text-lg font-semibold px-6 py-3">
              Akademik
            </h2>

            <div className="p-4 sm:p-6">
              <div className="w-full">
                <table className="w-full table-fixed border-collapse text-sm sm:text-base">
                  <thead>
                    <tr className="text-gray-700 border-b bg-gray-100">
                      <th className="w-[40%] py-2 text-left px-2">
                        Mata Pelajaran
                      </th>
                      <th className="w-[20%] py-2 text-center px-2">
                        Nilai Semester 3
                      </th>
                      <th className="w-[20%] py-2 text-center px-2">
                        Nilai Semester 4
                      </th>
                      <th className="w-[20%] py-2 text-center px-2">
                       NIlai Semester 5
                      </th>
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
                      <tr key={item.key} className="border-t hover:bg-gray-50">
                        <td className="py-2 px-2">{item.label}</td>
                        {["s3", "s4", "s5"].map((s) => (
                          <td key={s} className="py-2 text-center">
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              className="border rounded-lg px-2 py-1 w-16 sm:w-20 text-center focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                              value={
                                (
                                  formData[
                                    item.key as keyof PrestasiForm
                                  ] as SemesterScore
                                )[s as keyof SemesterScore]
                              }
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                                handleChange(
                                  {
                                    ...e,
                                    target: {
                                      ...e.target,
                                      value: numericValue,
                                    },
                                  } as React.ChangeEvent<HTMLInputElement>,
                                  item.key as keyof PrestasiForm,
                                  s as keyof SemesterScore
                                );
                              }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Input tambahan di bawah tabel */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="foreignLanguage"
                  placeholder="Bahasa asing yang dikuasai (Jika Ada)"
                  value={formData.foreignLanguage}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  type="text"
                  name="hafalan"
                  placeholder="Jumlah Hafalan (misal: 5 juz dan tuliskan no juznya )"
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
                placeholder="Riwayat Organisasi (Jika Ada)"
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
                placeholder="Cita-cita *"
                value={formData.dream}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="hobby"
                placeholder="Hobi / Kegemaran *"
                value={formData.hobby}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="special"
                placeholder="Hal Khusus (Keunikan, Passion, Kebiasaan) *"
                value={formData.special}
                onChange={handleChange}
                className={`${inputClass} md:col-span-2`}
              />
            </div>
          </section>

          <p className="text-center text-xs sm:text-sm text-gray-500">
            Kolom bertanda * wajib diisi. Lainnya bersifat opsional.
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
    </>
  );
};

export default PageFormPrestasi;
