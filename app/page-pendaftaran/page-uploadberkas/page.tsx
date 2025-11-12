"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle, Image } from "lucide-react";
import Swal from "sweetalert2";
import "animate.css";

const PageFormUpload: React.FC = () => {
  const router = useRouter();
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [housePhotos, setHousePhotos] = useState<{ [key: string]: File | null }>({});
  const [housePreviews, setHousePreviews] = useState<{ [key: string]: string | null }>({});

  const requiredFiles = [
    { name: "rapot", label: "Dokumen Nilai Rapot Semester 3–5" },
    { name: "sktm", label: "Surat Keterangan Tidak Mampu (SKTM)" },
    { name: "ss_ig", label: "Screenshot Follow IG @smktibazma" },
    { name: "kk", label: "Kartu Keluarga (KK)" },
    { name: "foto", label: "Pas Foto (Berwarna) 3x4 (terbaru dalam 3 bulan terakhir)" },
    { name: "kip", label: "Sertakan Bukti KIP" },
    { name: "bpjs", label: "Scan / Foto Kartu BPJS atau KIS" },
    { name: "rekomendasi-surat", label: "Upload Surat Rekomendasi" },
    { name: "tagihan listrik", label: "Upload Bukti Pembayaran Token Listrik" },
  ];

  const housePhotoTypes = [
    { name: "depan", label: "Tampak Depan", example: "/examples/depan.jpg" },
    { name: "ruangtamu", label: "Dapur / Kamar mandi", example: "/examples/ruangtamu.jpg" },
    { name: "kamar", label: "Kamar Tidur", example: "/examples/kamar.jpg" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleHousePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      const file = selectedFiles[0];
      setHousePhotos((prev) => ({ ...prev, [name]: file }));

      const reader = new FileReader();
      reader.onload = (event) => {
        setHousePreviews((prev) => ({
          ...prev,
          [name]: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => router.push("/page-form/page-kesehatan");

  const handleNext = () => {
    const emptyFiles = requiredFiles.filter((f) => !files[f.name]).map((f) => f.label);
    const emptyHousePhotos = housePhotoTypes.filter((f) => !housePhotos[f.name]).map((f) => f.label);

    if (emptyFiles.length > 0 || emptyHousePhotos.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Upload Belum Lengkap!",
        html: `
          <p class="mb-2">Silakan unggah berkas berikut terlebih dahulu:</p>
          <ul style="text-align:left; display:inline-block;">
            ${[...emptyFiles, ...emptyHousePhotos].map((f) => `<li>• ${f}</li>`).join("")}
          </ul>
        `,
        confirmButtonText: "Oke, lengkapi dulu",
        confirmButtonColor: "#1E3A8A",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Semua Dokumen Lengkap!",
      text: "Terima kasih, semua file berhasil diunggah.",
      confirmButtonText: "Lanjutkan",
      confirmButtonColor: "#1E3A8A",
    }).then(() => router.push("/page-form/page-aturan"));
  };

  const renderButton = (label: string, name: string) => {
    const fileSelected = files[name];
    return (
      <div
        className={`border rounded-full px-4 py-3 flex items-center justify-between transition cursor-pointer text-sm sm:text-base ${
          fileSelected ? "bg-green-50 border-green-400" : "bg-white border-gray-300 hover:shadow-md"
        }`}
      >
        <label
          htmlFor={name}
          className={`flex items-center gap-2 cursor-pointer transition ${
            fileSelected ? "text-green-700 font-semibold" : "text-gray-700 hover:text-[#1E3A8A]"
          }`}
        >
          {fileSelected ? (
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          ) : (
            <Upload className="w-5 h-5 text-[#1E3A8A] shrink-0" />
          )}
          <span className="text-left leading-tight break-words max-w-[200px] sm:max-w-none">
            {fileSelected ? "Sudah diupload" : label}
          </span>
        </label>
        <input
          id={name}
          name={name}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        {fileSelected && (
          <span className="text-xs sm:text-sm text-green-700 truncate max-w-[120px] sm:max-w-[200px] font-medium ml-2 animate__animated animate__fadeIn">
            {fileSelected.name}
          </span>
        )}
      </div>
    );
  };

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
            Upload Dokumen & Foto Rumah
          </p>
        </div>
      </header>

      {/* FORM CONTAINER */}
      <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-xl p-6 sm:p-10 shadow-sm animate__animated animate__fadeInUp animate__slow mt-6">
        {/* Stepper */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-4">
            Formulir Pendaftaran Calon Siswa
          </h1>

          <div className="flex justify-center items-center flex-wrap gap-4">
            {[
              { label: "Data Rumah ", step: 4 },
              { label: "Data Kesehatan", step: 5 },
              { label: "Upload Berkas", step: 6 },
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-semibold ${
                      item.step === 6 ? "bg-[#1E3A8A] text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {item.step}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-center text-gray-500">
                    {item.label}
                  </p>
                </div>
                {idx < 2 && <div className="hidden sm:flex flex-1 h-[2px] bg-gray-300 max-w-[60px]" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* DOWNLOAD TEMPLATE SECTION */}
        <div className="mt-6 ml-4">
          <p className="text-gray-500 text-lg mt-2">
            📄 Belum punya berkas berikut? Unduh templatenya di bawah ini:
          </p>
          <ul className="text-gray-500 text-base mt-3 ml-6 list-decimal space-y-2">
            <li>
              Surat Keterangan Tidak Mampu (SKTM){" "}
              <a href="/files/SKTM.pdf" download className="text-[#1E3A8A] font-medium hover:underline">
                Unduh di sini
              </a>
            </li>
            <li>
              Surat Rekomendasi{" "}
              <a href="/files/pernyataan.pdf" download className="text-[#1E3A8A] font-medium hover:underline">
                Unduh di sini
              </a>
            </li>
          </ul>

          <p className="mt-4 text-sm text-gray-600 italic">
            📎 Jenis file yang diperbolehkan untuk diunggah:{" "}
            <span className="font-semibold text-[#1E3A8A]">JPEG, JPG, PNG, dan PDF</span>.
          </p>
        </div>

        {/* Upload Dokumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 mt-8">
          {requiredFiles.map((f) => (
            <div key={f.name} className={f.name === "tagihan listrik" ? "sm:col-span-2" : ""}>
              <div className="w-full">{renderButton(f.label, f.name)}</div>
            </div>
          ))}
        </div>

        {/* Upload Foto Rumah */}
        <div className="mb-6 mt-6">
          <h2 className="font-semibold text-gray-700 mb-6 flex items-center gap-2 text-base sm:text-lg">
            <Image className="w-5 h-5 text-[#1E3A8A]" />
            Upload Foto Rumah (Lengkapi Semua Bagian)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {housePhotoTypes.map((photo) => (
              <div key={photo.name} className="flex flex-col gap-4">
                <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className="bg-gray-50 text-center py-2 font-semibold text-sm text-[#1E3A8A] border-b">
                    Contoh: {photo.label}
                  </div>
                  <img src={photo.example} alt={`Contoh ${photo.label}`} className="w-full h-36 object-cover" />
                </div>
                <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col items-center p-3">
                  {housePreviews[photo.name] ? (
                    <img
                      src={housePreviews[photo.name]!}
                      alt={`Preview ${photo.label}`}
                      className="w-full h-36 object-cover rounded-lg border border-green-200"
                    />
                  ) : (
                    <div className="w-full h-36 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg text-sm">
                      Belum ada foto
                    </div>
                  )}
                  <p className="text-sm font-semibold text-gray-700 mt-3 mb-2 text-center">
                    {photo.label}
                  </p>
                  <label
                    htmlFor={photo.name}
                    className={`cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2 border px-3 py-1.5 rounded-full w-full sm:w-auto text-center ${
                      housePhotos[photo.name]
                        ? "bg-green-100 border-green-400 text-green-700"
                        : "bg-gray-100 border-gray-300 hover:bg-blue-50 hover:text-[#1E3A8A]"
                    }`}
                  >
                    {housePhotos[photo.name] ? <CheckCircle className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                    {housePhotos[photo.name] ? "Sudah Diupload" : "Upload Foto"}
                  </label>
                  <input
                    id={photo.name}
                    name={photo.name}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleHousePhotoChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          Pastikan seluruh dokumen dan foto rumah diunggah dengan jelas.
        </p>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-3">
          <button
            onClick={handleBack}
            className="w-full sm:w-auto bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-full hover:bg-gray-400 transition"
          >
            Kembali
          </button>
          <button
            onClick={handleNext}
            className="w-full sm:w-auto bg-[#1E3A8A] text-white font-medium px-6 py-2 rounded-full hover:bg-[#162d66] transition"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </>
  );
};

export default PageFormUpload;
