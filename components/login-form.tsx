"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        type="text"
        placeholder="Nama Anda"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Kata Sandi"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d2b6f] outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

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
