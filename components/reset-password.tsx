"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Silakan isi semua field terlebih dahulu.",
        confirmButtonColor: "#1d2b6f",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Kata sandi dan konfirmasi tidak cocok.",
        confirmButtonColor: "#1d2b6f",
      });
      return;
    }

    const resetEmail = localStorage.getItem("reset_email");
    if (!resetEmail) {
      Swal.fire({
        icon: "error",
        title: "Email Tidak Ditemukan!",
        text: "Silakan kirim ulang link reset kata sandi.",
        confirmButtonColor: "#1d2b6f",
      }).then(() => router.push("/kirim-password"));
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = existingUsers.findIndex(
      (user: any) => user.email === resetEmail
    );

    if (userIndex === -1) {
      Swal.fire({
        icon: "error",
        title: "Akun Tidak Ditemukan!",
        text: "Silakan kirim ulang link reset kata sandi.",
        confirmButtonColor: "#1d2b6f",
      }).then(() => router.push("/kirim-password"));
      return;
    }

    // Update password user di localStorage
    existingUsers[userIndex].password = newPassword.trim();
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.removeItem("reset_email");

    // Pop-up sukses + redirect otomatis ke login
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Kata sandi berhasil diubah. Anda akan diarahkan ke halaman login.",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      router.push("/");
    });
  };

  return (
    <form onSubmit={handleReset} className="space-y-4 w-full max-w-sm">
      <input
        type="password"
        name="newPassword"
        placeholder="Kata Sandi Baru"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={formData.newPassword}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Konfirmasi Kata Sandi"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-[#1d2b6f] text-white py-3 rounded-md hover:bg-[#16215a] transition font-semibold"
      >
        Ubah Kata Sandi
      </button>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="w-full text-[#1d2b6f] font-semibold hover:underline"
      >
        Kembali ke Login
      </button>
    </form>
  );
}
