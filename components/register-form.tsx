"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if ( !email || !password || !confirmPassword) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Kata sandi dan konfirmasi tidak cocok!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = existingUsers.some(
      (user: any) => user.email === email.trim()
    );

    if (emailExists) {
      alert("Email sudah terdaftar!");
      return;
    }

    const newUser = {
      email: email.trim(),
      password: password.trim(),
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Pendaftaran berhasil! Silakan login.");
    router.push("/");
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Alamat Email"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Kata Sandi"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={formData.password}
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
        Daftar
      </button>

       <p className="text-center text-sm text-gray-600 mt-2">
        Sudah ada akun?{" "}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="font-semibold text-[#1d2b6f] hover:underline"
        >
          Masuk Disini
        </button>
      </p>
    </form>
  );
}
