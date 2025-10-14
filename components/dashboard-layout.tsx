"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Home, FileText, Megaphone, HelpCircle, Menu, X } from "lucide-react"
import { SMKLogo } from "@/components/smk-logo"
import PageBantuan from "@/components/page-bantuan"
import PagePengumuman from "@/components/page-pengumuman"
import PagePendaftaran from "@/components/page-pendaftaran"

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "pendaftaran", name: "Pendaftaran", icon: FileText },
  { id: "pengumuman", name: "Pengumuman", icon: Megaphone },
  { id: "bantuan", name: "Bantuan", icon: HelpCircle },
]

// Step Alur Pendaftaran
const steps = [
  { name: "Pendaftaran", activeImg: "/icons/1 (1).png", inactiveImg: "/icons/1 (2).png" },
  { name: "Seleksi Berkas", activeImg: "/icons/1 (3).png", inactiveImg: "/icons/1 (4).png" },
  { name: "Tes Akademik", activeImg: "/icons/1 (5).png", inactiveImg: "/icons/1 (6).png" },
  { name: "Tes Psikotest", activeImg: "/icons/1 (7).png", inactiveImg: "/icons/1 (8).png" },
  { name: "Wawancara", activeImg: "/icons/1 (9).png", inactiveImg: "/icons/1 (10).png" },
  { name: "Pengumuman", activeImg: "/icons/1 (11).png", inactiveImg: "/icons/1 (12).png" },
]



export function DashboardLayout() {
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in")
    localStorage.removeItem("admin_username")
    router.push("/")
  }

  const handleMenuClick = (menuId: string, idx: number) => {
    if (activeMenu === menuId) return
    setActiveMenu(menuId)
    setIsSidebarOpen(false)
    const tl = gsap.timeline()
    tl.to(contentRef.current, { opacity: 0, y: 20, duration: 0.2, ease: "power2.in" })
      .to(contentRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })

    const target = buttonRefs.current[idx]
    if (target && highlightRef.current) {
      gsap.to(highlightRef.current, {
        y: target.offsetTop,
        height: target.offsetHeight,
        duration: 0.4,
        ease: "power3.out",
      })
    }
  }

  useEffect(() => {
    gsap.fromTo(".step-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 })
  }, [activeMenu])

  useEffect(() => {
    const idx = menuItems.findIndex((item) => item.id === activeMenu)
    if (idx >= 0) {
      const target = buttonRefs.current[idx]
      if (target && highlightRef.current) {
        gsap.set(highlightRef.current, {
          y: target.offsetTop,
          height: target.offsetHeight,
        })
      }
    }
  }, [])

  // Animasi sidebar mobile
  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(".mobile-sidebar", { x: 0, duration: 0.4, ease: "power3.out" })
    } else {
      gsap.to(".mobile-sidebar", { x: "-100%", duration: 0.4, ease: "power3.in" })
    }
  }, [isSidebarOpen])

  return (
    <div className="dashboard-container min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-80 bg-[#1E3A8A] text-white flex-col rounded-r-3xl z-[10]">
        <div className="p-2 pb-2 flex items-center gap-4">
          <div className="transform scale-75">
            <SMKLogo className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight">SMK TI BAZMA</h2>
            <p className="text-xs text-blue-200">Islamic Boarding School</p>
          </div>
        </div>


        <div className="w-full h-px bg-blue-600/30"></div>

        <div className="relative flex-1 px-6 mt-6">
          <div ref={highlightRef} className="absolute left-4 right-4 bg-white rounded-full shadow-lg opacity-90 transition-all duration-300" style={{ top: 0, height: "3rem" }}></div>
          <div className="relative space-y-3">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                ref={(el) => (buttonRefs.current[idx] = el)}
                onClick={() => handleMenuClick(item.id, idx)}
                className={`w-full flex items-center text-left font-poppins py-3 px-6 transition-all duration-300 ${activeMenu === item.id ? "text-[#1E3A8A] font-semibold" : "text-white"
                  }`}
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 pt-8">
         <div className="p-2 pb-2 flex items-center gap-4">
          <div className="transform scale-75">
            <SMKLogo className="w-8 h-8" />
          </div>
            <div>
              <h4 className="text-sm font-bold text-[#4DA9FF]">SMK TI BAZMA</h4>
              <p className="text-xs text-blue-200">Islamic Boarding School</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full justify-center bg-white text-[#1E3A8A] hover:bg-gray-100 font-poppins rounded-2xl py-3 font-medium shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-72 h-full bg-[#1E3A8A] text-white rounded-r-3xl z-[50] mobile-sidebar -translate-x-full">
        <div className="p-6 flex items-center justify-between">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="px-6 mt-6 space-y-3">
          {menuItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id, idx)}
              className={`w-full flex items-center text-left font-poppins py-3 px-4 rounded-lg transition-all duration-300 ${activeMenu === item.id ? "bg-white text-[#1E3A8A]" : "text-white hover:bg-blue-700"
                }`}
            >
              <item.icon className="mr-4 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-80">
        {/* Navbar Mobile */}
        <div className="md:hidden w-full bg-white px-4 py-3 flex items-center justify-between shadow">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-[#1E3A8A]" />
          </button>
          <h1 className="font-semibold text-[#1E3A8A]">SMK TI BAZMA</h1>
          <div className="w-6"></div>
        </div>

        {/* Content */}
        <main ref={contentRef} className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeMenu === "dashboard" && (
            <div>
              {/* --------------------------- DASHBOARD --------------------------- */}
              <section className="w-full bg-white border-b px-8 py-3 flex justify-between items-center">
                <p className="text-sm text-gray-700 font-medium">
                  <b>Home</b>
                </p>
                <span className="text-xs text-gray-500 border px-3 py-1 rounded-lg">
                  No Antrian: 8743587
                </span>
              </section>

              <header className="mt-16 mb-8 flex justify-between items-center">
                <div className="flex justify-center md:justify-start w-full md:w-1/3 mb-4 md:mb-0"></div>
                <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-2/3">
                  <h1 className="text-2xl font-bold text-[#1E3A8A]">Penerimaan Siswa Baru</h1>
                  <p className="text-gray-600">
                    Daftarkan dirimu di sini. Semua informasi ada di sini.
                  </p>
                </div>
              </header>

              <section className="relative">
                <img src="/image 9.png" alt="Megaphone" className="absolute -top-30 left-6 w-32 h-auto md:w-40 z-10" />
              </section>

              <div className="relative w-full rounded-2xl shadow-xl overflow-hidden">
                <img
                  src="/Frame 30171.png"
                  alt="Alur Pendaftaran Header"
                  className="w-full h-auto object-contain"
                />

                {/* Tombol overlay */}
                <div className="absolute inset-0 flex justify-end items-center px-6">
                  <button
                    onClick={() => setShowModal(true)}
                    className="border border-white text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-white hover:text-[#1E3A8A] transition"
                  >
                    Tata Cara Pendaftaran
                  </button>
                </div>
              </div>

              {/* Modal Popup (tanpa portal) */}
              {showModal && (
                <>
                  {/* Kunci body supaya gak bisa scroll di belakang */}
                  <style>{`body { overflow: hidden; }`}</style>

                  <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Overlay hitam */}
                    <div
                      className="absolute inset-0 bg-black/60"
                      onClick={() => {
                        setShowModal(false);
                        setIsSidebarOpen(false); // menutup sidebar juga
                      }}
                    />

                    {/* Konten modal */}
                    <div className="relative z-[101] bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-10 mx-4 max-h-[90vh] overflow-y-auto">
                      {/* Tombol X */}
                      <button
                        onClick={() => {
                          setShowModal(false);
                          setIsSidebarOpen(false); // menutup sidebar juga
                        }}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                      >
                        ✕
                      </button>

                      {/* Judul */}
                      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1E3A8A] mb-10">
                        Tata Cara Pendaftaran
                      </h2>

                      {/* Grid 2 kolom */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-700">
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">1</span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">Daftar Online</h1>
                              <p>
                                Calon siswa membuka website resmi PPDB SMK TI Bazma dan mengisi formulir pendaftaran. Pastikan semua data sesuai identitas asli, karena akan menjadi dasar administrasi seleksi.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">2</span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">Unggah Berkas</h1>
                              <p>
                                Setelah mengisi formulir, calon siswa wajib mengunggah dokumen pendukung. Dokumen ini digunakan sebagai bukti kelulusan dan identitas resmi. Berkas yang diperlukan meliputi
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">3</span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">Tes Seleksi</h1>
                              <p>
                                Peserta akan mengikuti beberapa tahap seleksi untuk menilai kemampuan akademik, psikologis, dan motivasi belajar. Tahap seleksi meliputi
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">4</span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">Home Visit</h1>
                              <p>
                                Panitia PPDB dapat melakukan kunjungan ke rumah calon siswa untuk mengenal lebih dekat kondisi lingkungan keluarga.
                                Tujuan dari home visit adalah memastikan kesiapan siswa dan orang tua dalam mendukung pendidikan penuh di SMK TI Bazma yang berbasis asrama.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">5</span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">Pengumuman</h1>
                              <p>
                                Hasil seleksi akan diumumkan secara resmi melalui website PPDB SMK TI Bazma.
                                juga diinformasikan lewat grup WhatsApp resmi.  Setiap calon siswa diharapkan memantau pengumuman sesuai dengan jadwal yang telah ditetapkan.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">!</span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">Keterangan Tambahan</h1>
                              <p>
                                Gap Year, SMK TI Bazma memberikan kesempatan bagi lulusan SMP/MTs  yang tidak langsung melanjutkan sekolah di tahun kelulusannya.
                                Bagi calon siswa yang mengambil masa jeda atau gap year maksimal satu tahun, tetap diperbolehkan untuk mengikuti proses PPDB.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tombol Lanjut */}
                      <div className="flex justify-center mt-10">
                        <button
                          onClick={() => {
                            alert("Lanjut ke step berikutnya...");
                            setIsSidebarOpen(false); // menutup sidebar saat lanjut
                          }}
                          className="px-8 py-2 bg-[#1E3A8A] text-white rounded-full hover:bg-[#162c6e] transition"
                        >
                          Lanjut
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}







              {/* Alur Pendaftaran */}
              <section className="mb-10">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                  <h2 className="text-lg font-semibold mb-10 text-center md:text-left">
                    Alur Pendaftaran
                  </h2>

                  {/* Versi desktop: deretan lurus */}
                  <div className="hidden md:flex relative justify-between items-start">
                    {steps.map((step, idx) => {
                      const isActive = idx === 0
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center text-center relative flex-1"
                        >
                          {/* Garis penghubung antar step */}
                          {idx !== steps.length - 1 && (
                            <div
                              className="absolute top-10 left-1/2 w-full h-[2px] bg-gray-300 z-0"
                              style={{
                                transform: "translateX(50%)",
                                width: "calc(50%)",
                              }}
                            ></div>
                          )}

                          {/* Icon dan nomor */}
                          <div className="relative z-10 inline-block">
                            <div
                              className={`absolute -top-3 -left-3 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${isActive ? "bg-green-500 text-white" : "bg-[#1E3A8A] text-white"
                                }`}
                            >
                              {idx + 1}
                            </div>
                            <img
                              src={isActive ? step.activeImg : step.inactiveImg}
                              alt={step.name}
                              className="w-20 h-20 md:w-24 md:h-24 object-contain"
                            />
                          </div>

                          {/* Label */}
                          <p
                            className={`mt-2 text-sm md:text-base ${isActive ? "font-semibold text-[#1E3A8A]" : "text-gray-600"
                              }`}
                          >
                            {step.name}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Versi mobile: grid 2 kolom */}
                  <div className="grid grid-cols-2 gap-6 md:hidden">
                    {steps.map((step, idx) => {
                      const isActive = idx === 0
                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="relative">
                            <div
                              className={`absolute -top-2 -left-2 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${isActive ? "bg-green-500 text-white" : "bg-[#1E3A8A] text-white"
                                }`}
                            >
                              {idx + 1}
                            </div>
                            <img
                              src={isActive ? step.activeImg : step.inactiveImg}
                              alt={step.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                            />
                          </div>
                          <p
                            className={`text-xs sm:text-sm mt-2 text-center ${isActive ? "font-semibold text-[#1E3A8A]" : "text-gray-600"
                              }`}
                          >
                            {step.name}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>



              {/* CTA */}
              <section className="mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Let’s Get Started!</h3>
                    <p className="text-sm text-gray-600">
                      Register now and become part of the next generation of excellence at SMK TI BAZMA.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/page-form")}
                    className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-5 py-2 rounded-full font-medium hover:bg-[#162d66] transition"
                  >
                    Register Now →
                  </button>
                </div>
                <div className="mt-4 border-b border-gray-300"></div>
              </section>

              {/* Aktivitas */}
              <section className="mt-10">
                <h1 className="text-lg font-semibold mb-4">
                  Rangkaian Seleksi Calon Peserta Didik Baru
                </h1>
                <div className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src="https://via.placeholder.com/900x300"
                      alt="Ujian Psikotest"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-bold">Ujian Psikotest</h3>
                      <p className="text-sm">27 Agustus, 2025</p>
                      <p className="mt-2 text-sm">
                        Calon siswa mengisi formulir pendaftaran online atau langsung di sekolah untuk memulai proses seleksi.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
          {activeMenu === "pendaftaran" && <PagePendaftaran />}
          {activeMenu === "pengumuman" && <PagePengumuman />}
          {activeMenu === "bantuan" && <PageBantuan />}
        </main>
      </div>
    </div>
  )
}
