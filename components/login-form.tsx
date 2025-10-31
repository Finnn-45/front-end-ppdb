"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim biar gak ada spasi yang bikin error
    const userEmail = email.trim();
    const userPass = password.trim();

    if (userEmail === "admin@gmail.com" && userPass === "admin") {
      localStorage.setItem("admin_logged_in", "true");
      localStorage.setItem("admin_username", "admin");
      router.push("/dashboard"); // arahkan ke dashboard
    } else if (userEmail === "peserta@gmail.com" && userPass === "12345") {
      localStorage.setItem("admin_logged_in", "true");
      localStorage.setItem("admin_username", "peserta");
      router.push("/dashboard");
    } else {
      alert("Email atau kata sandi salah!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none pr-12"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Kata Sandi"
        />

        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute inset-y-0 right-2 flex items-center px-2"
          aria-pressed={showPassword}
          aria-label={showPassword ? "Sembunyikan kata sandi" : "Perlihatkan kata sandi"}
          title={showPassword ? "Sembunyikan kata sandi" : "Perlihatkan kata sandi"}
        >
          {showPassword ? (
            // Eye-off icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.94 10.94a3 3 0 104.12 4.12M9.88 5.17A11.96 11.96 0 0121 12c-1.03 2.07-2.65 3.86-4.54 5.09M3.6 7.53A11.9 11.9 0 003 12c1.03 2.07 2.65 3.86 4.54 5.09" />
            </svg>
          ) : (
            // Eye icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex justify-end">
        <a href="#" className="text-sm text-red-500 hover:underline">
          Lupa Kata Sandi?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-[#1d2b6f] text-white py-3 rounded-md hover:bg-[#16215a] transition font-semibold"
      >
        Masuk
      </button>

      <p className="text-center text-sm text-gray-600 mt-2">
        Ga punya akun?{" "}
        <button
          type="button"
          onClick={() => router.push("/register-form")}
          className="font-semibold text-[#1d2b6f] hover:underline"
        >
          Daftar Disini
        </button>
      </p>
    </form>
  );
}
