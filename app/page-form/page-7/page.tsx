"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle } from "lucide-react";

export default function PageForm7() {
  const router = useRouter();
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: selectedFiles[0],
      }));
    }
  };

  const handleBack = () => router.push("/page-form/page-6");
  const handleNext = () => {
    console.log("File yang diupload:", files);
    router.push("/page-form/page-8");
  };

  const renderButton = (label: string, name: string) => {
    const fileSelected = files[name];
    return (
      <div
        className={`border rounded-full px-4 py-3 flex items-center justify-between transition cursor-pointer ${
          fileSelected
            ? "bg-green-50 border-green-400"
            : "bg-white border-gray-300 hover:shadow"
        }`}
      >
        <label
          htmlFor={name}
          className={`flex items-center gap-2 cursor-pointer transition ${
            fileSelected ? "text-green-700" : "text-gray-700 hover:text-[#1E3A8A]"
          }`}
        >
          {fileSelected ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Upload className="w-5 h-5 text-[#1E3A8A]" />
          )}
          <span className="text-sm sm:text-base font-medium">
            {fileSelected ? "Sudah diupload" : label}
          </span>
        </label>
        <input
          id={name}
          name={name}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <span
          className={`text-xs truncate max-w-[120px] sm:max-w-[150px] ${
            fileSelected ? "text-green-700 font-semibold" : "text-gray-500"
          }`}
        >
          {fileSelected?.name || ""}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-xl p-6 sm:p-10 shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#1E3A8A] mb-4">
          Formulir Pendaftaran
        </h1>

        {/* Stepper */}
        <div className="flex justify-center items-center flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold">
              5
            </div>
            <p className="text-xs mt-1 text-gray-500 font-medium">Kesehatan</p>
          </div>

          <div className="hidden sm:flex w-12 h-[2px] bg-gray-300" />

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold">
              6
            </div>
            <p className="text-xs mt-1 text-gray-500 font-medium">Aturan</p>
          </div>

          <div className="hidden sm:flex w-12 h-[2px] bg-gray-300" />

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold">
              7
            </div>
            <p className="text-xs mt-1 text-[#1E3A8A] font-medium">Upload</p>
          </div>
        </div>
      </div>

      {/* Judul Section */}
      <div className="bg-[#1E3A8A] text-white rounded-t-lg text-center py-3 mb-6 font-semibold text-lg">
        Upload Dokumen
      </div>

      {/* Upload Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderButton("Upload Dokumen Nilai Rapot Semester 3–5", "rapot")}
        {renderButton("Upload Dokumen Surat Keterangan Tidak Mampu", "sktm")}
        {renderButton("Bukti Screenshot Follow IG @smktibazma", "ss_ig")}
        {renderButton("Upload Dokumen Surat Rekomendasi Guru SMP", "rekomendasi")}
        {renderButton("Upload Dokumen Kartu Keluarga (KK)", "kk")}
        {renderButton("Upload Dokumen Pas Foto (Berwarna)", "foto")}
        {renderButton(
          "Upload Foto Rumah (Depan, Samping, Kamar, Tamu, Dapur, Mandi)",
          "foto_rumah"
        )}
        {renderButton(
          "Upload scan/foto kartu BPJS atau KIS",
          "bpjs"
        )}
      </div>

      {/* Catatan */}
      <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
        Pastikan seluruh dokumen yang diunggah sesuai dan terbaca dengan jelas.
      </p>

      {/* Tombol Navigasi */}
      <div className="flex flex-col sm:flex-row justify-between mt-8">
        <button
          onClick={handleBack}
          className="w-full sm:w-auto bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-full hover:bg-gray-400 transition"
        >
          Kembali
        </button>
        <button
          onClick={handleNext}
          className="w-full sm:w-auto bg-[#1E3A8A] text-white font-medium px-6 py-2 rounded-full hover:bg-[#162d66] transition mt-3 sm:mt-0"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}
