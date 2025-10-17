"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import {
  Home,
  FileText,
  Megaphone,
  HelpCircle,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { SMKLogo } from "@/components/smk-logo";
import PageBantuan from "@/components/page-bantuan";
import PagePengumuman from "@/components/page-pengumuman";
import PagePendaftaran from "@/components/page-pendaftaran";

type NotificationItem = {
  id: string | number;
  title?: string;
  message?: string;
  created_at?: string;
  // tambahkan field lain sesuai response backend
};


// Step Alur Pendaftaran
const steps = [
  {
    name: "Pendaftaran",
    activeImg: "/icons/1 (1).png",
    inactiveImg: "/icons/1 (2).png",
  },
  {
    name: "Seleksi Berkas",
    activeImg: "/icons/1 (3).png",
    inactiveImg: "/icons/1 (4).png",
  },
  {
    name: "Tes Akademik",
    activeImg: "/icons/1 (5).png",
    inactiveImg: "/icons/1 (6).png",
  },
  {
    name: "Tes Psikotest",
    activeImg: "/icons/1 (7).png",
    inactiveImg: "/icons/1 (8).png",
  },
  {
    name: "Wawancara",
    activeImg: "/icons/1 (9).png",
    inactiveImg: "/icons/1 (10).png",
  },
  {
    name: "Pengumuman",
    activeImg: "/icons/1 (11).png",
    inactiveImg: "/icons/1 (12).png",
  },
];

export function DashboardLayout() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
 
  // --- Notifikasi states ---
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loadingNotif, setLoadingNotif] = useState(false);
  const [notifError, setNotifError] = useState<string | null>(null);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const lastNotifIdsRef = useRef<Set<string | number>>(new Set());
  const toastRef = useRef<HTMLDivElement | null>(null);

  const NOTIF_ENDPOINT = "https://api.smkbazma.sch.id/notifikasi"; // ganti jika perlu

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_username");
    router.push("/");
  };

  
const menuItems = [
  { id: "dashboard", name: "Home", icon: Home },
  { id: "pendaftaran", name: "Pendaftaran", icon: FileText },
  { id: "pengumuman", name: "Pengumuman", icon: Megaphone },
  { id: "bantuan", name: "Bantuan", icon: HelpCircle },
];

// Autoplay carousel
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  }, 4000); // ganti setiap 4 detik

  return () => clearInterval(timer);
}, []);

// --- Carousel items ---
const carouselItems = [
  {
    id: 1,
    image: "/gambar2.png",
    title: "Ujian Psikotest",
    date: "20 - 25 April, 2025",
    desc: "Calon siswa mengisi formulir pendaftaran online atau langsung di sekolah untuk memulai proses seleksi.",
  },
  {
    id: 2,
    image: "/gambar3.png",
    title: "Tes Akademik",
    date: "24 - 25 Januari, 2025",
    desc: "Peserta mengikuti tes akademik untuk mengukur kemampuan dasar dan pengetahuan umum.",
  },
  {
    id: 3,
    image: "/gambar4.png",
    title: "Pengumuman",
    date: " 22 - 23 Mei, 2025",
    desc: "Hasil seleksi diumumkan resmi melalui website SPMB SMK TI Bazma.",
  },
];

  const handleMenuClick = (menuId: string, idx: number) => {
    if (activeMenu === menuId) return;
    setActiveMenu(menuId);
    setIsSidebarOpen(false);
    const tl = gsap.timeline();
    tl.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.1,
      ease: "power2.in",
    }).to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      ease: "power2.out",
    });

    const target = buttonRefs.current[idx];
    if (target && highlightRef.current) {
      gsap.to(highlightRef.current, {
        y: target.offsetTop,
        height: target.offsetHeight,
        duration: 0.1,
        ease: "power3.out",
      });
    }
  };

  // Lock scroll saat modal Tata Cara Pendaftaran terbuka
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      router.push("/"); // 🔒 paksa balik ke login
    }
  }, [router]);

  useEffect(() => {
    gsap.fromTo(
      ".step-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
    );
  }, [activeMenu]);

  useEffect(() => {
    const idx = menuItems.findIndex((item) => item.id === activeMenu);
    if (idx >= 0) {
      const target = buttonRefs.current[idx];
      if (target && highlightRef.current) {
        gsap.set(highlightRef.current, {
          y: target.offsetTop,
          height: target.offsetHeight,
        });
      }
    }
  }, []); // only on mount

  // --- Fetch notifikasi (initial + polling) ---
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const processNewNotifications = (newList: NotificationItem[]) => {
      // update lastNotifIdsRef and detect new ones
      const prevIds = lastNotifIdsRef.current;
      const incomingIds = new Set(newList.map((n) => n.id));

      // find items that are in incoming but not in prev
      const newlyArrived = newList.filter((n) => !prevIds.has(n.id));

      // update ref set
      lastNotifIdsRef.current = incomingIds;

      // if ada notifikasi baru, tampilkan toast (gunakan only latest)
      if (newlyArrived.length > 0 && isMounted) {
        const latest = newlyArrived[0];
        showToast(
          `${latest.title ?? "Notifikasi baru"}`,
          `${latest.message ?? "Ada update dari admin."}`
        );
      }
    };

    const fetchNotifications = async () => {
      setLoadingNotif(true);
      setNotifError(null);
      try {
        const res = await fetch(NOTIF_ENDPOINT, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Gagal mengambil data notifikasi");
        const data = await res.json();
        const arr: NotificationItem[] = Array.isArray(data) ? data : [];
        if (!isMounted) return;
        setNotifications(arr);
        // jika pertama kali mount, set last ids tanpa men-trigger toast
        if (lastNotifIdsRef.current.size === 0) {
          lastNotifIdsRef.current = new Set(arr.map((n) => n.id));
        } else {
          processNewNotifications(arr);
        }
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setNotifError(err?.message ?? "Unknown error");
      } finally {
        if (isMounted) setLoadingNotif(false);
      }
    };

    // initial fetch
    fetchNotifications();

    // polling tiap 30s
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30_000);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  // Toast helper
  const showToast = (title: string, message: string) => {
    if (!toastRef.current) return;
    const el = toastRef.current;
    el.querySelector(".toast-title")!.textContent = title;
    el.querySelector(".toast-body")!.textContent = message;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { y: -30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.35,
        ease: "power3.out",
        onComplete: () => {
          // auto hide after 4s
          gsap.to(el, {
            delay: 4,
            y: -30,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power3.in",
          });
        },
      }
    );
  };

  // small animation for sidebar mobile open/close
  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(".mobile-sidebar", { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(".mobile-sidebar", {
        x: "-100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      router.push("/login"); // 🔒 paksa balik ke login
    }
  }, [router]);

  return (
    <div className="dashboard-container min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-80 bg-[#1E3A8A] text-white flex-col rounded-r-3xl z-[10]">
        <div className="p-2 pb-2 flex items-center ">
          <div className="transform scale-60">
            <SMKLogo className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight">SMK TI BAZMA</h2>
            <p className="text-xs text-blue-200">Islamic Boarding School</p>
          </div>
        </div>

        <div className="w-full h-px bg-blue-600/30"></div>

        <div className="relative flex-1 px-6 mt-6">
          <div
            ref={highlightRef}
            className="absolute left-4 right-4 bg-white rounded-full shadow-lg opacity-90 transition-all duration-300"
            style={{ top: 0, height: "3rem" }}
          ></div>
          <div className="relative space-y-3">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                ref={(el) => {
                  buttonRefs.current[idx] = el; // assign ke ref
                  // tidak return apapun, otomatis void
                }}
                onClick={() => handleMenuClick(item.id, idx)}
                className={`w-full flex items-center text-left font-poppins py-3 px-6 transition-all duration-100 ${
                  activeMenu === item.id
                    ? "text-[#1E3A8A] font-semibold"
                    : "text-white"
                }`}
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pt-2">
          <div className="p-2 pb-2 flex items-center ">
            <div className="transform scale-60">
              <SMKLogo className="w-2 h-2" />
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
<div className="md:hidden fixed top-0 left-0 w-72 h-full bg-[#1E3A8A] text-white rounded-r-3xl z-[50] mobile-sidebar -translate-x-full flex flex-col justify-between">
  {/* Header Logo + Close */}
  <div>
    <div className="p-5 flex items-center justify-between border-b border-blue-800/30">
      <div className="flex items-center gap-3">
        <div className="transform scale-75">
          <SMKLogo className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-base font-bold leading-tight">SMK TI BAZMA</h2>
          <p className="text-[11px] text-blue-200">Islamic Boarding School</p>
        </div>
      </div>
      <button onClick={() => setIsSidebarOpen(false)}>
        <X className="h-6 w-6 text-white hover:text-blue-200 transition-colors" />
      </button>
    </div>

    {/* Menu Items */}
    <div className="px-6 mt-6 space-y-3">
      {menuItems.map((item, idx) => (
        <button
          key={item.id}
          onClick={() => handleMenuClick(item.id, idx)}
          className={`w-full flex items-center text-left font-poppins py-3 px-4 rounded-lg transition-all duration-300 ${
            activeMenu === item.id
              ? "bg-white text-[#1E3A8A]"
              : "text-white hover:bg-blue-700"
          }`}
        >
          <item.icon className="mr-4 h-5 w-5" />
          {item.name}
        </button>
      ))}
    </div>
  </div>

  {/* Footer Logout */}
  <div className="px-6 pb-6 border-t border-blue-800/30">
    <button
      onClick={handleLogout}
      className="w-full bg-white text-[#1E3A8A] hover:bg-gray-100 font-poppins rounded-xl py-3 font-medium shadow-md transition-all duration-300"
    >
      Logout
    </button>
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
      <div className="flex-1 flex flex-col md:ml-80 relative">
        {/* Navbar Mobile */}
        <div className="md:hidden w-full bg-white px-4 py-3 flex items-center justify-between shadow">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-[#1E3A8A]" />
          </button>

          {/* Judul tengah */}
          <h1 className="font-semibold text-[#1E3A8A] text-base">Dashboard</h1>

          {/* Tombol notifikasi kanan */}
          <button
            onClick={() => setNotifPanelOpen(true)}
            aria-label="Notifikasi"
            title="Lihat Notifikasi"
            className="relative p-2 hover:scale-110 active:scale-95 transition-transform duration-200"
          >
            <Bell className="h-6 w-6 text-[#1E3A8A]" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-semibold rounded-full bg-red-500 text-white">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Pop-up modal Notifikasi */}
          {notifPanelOpen && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white w-[90%] sm:w-[28rem] max-h-[80vh] rounded-xl shadow-2xl p-4 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg text-[#1E3A8A] flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#1E3A8A]" />
                    Notifikasi
                  </h4>
                  <button
                    onClick={() => setNotifPanelOpen(false)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>

                {/* Deskripsi singkat */}
                <p className="text-sm text-gray-600 mb-4">
                  Semua pemberitahuan terbaru dari panitia SPMB muncul di sini.
                </p>

                {/* Status Loading / Error / Kosong */}
                {loadingNotif && (
                  <p className="text-sm text-gray-500">Memuat notifikasi...</p>
                )}
                {notifError && (
                  <p className="text-sm text-red-500">Error: {notifError}</p>
                )}
                {!loadingNotif && notifications.length === 0 && !notifError && (
                  <p className="text-sm text-gray-500">
                    Belum ada notifikasi saat ini.
                  </p>
                )}

                {/* Daftar Notifikasi */}
                <ul className="space-y-3">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Bell className="h-5 w-5 text-[#1E3A8A]" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-sm font-semibold text-gray-800">
                            {n.title ?? "Pemberitahuan Baru"}
                          </h5>
                          <p className="text-xs text-gray-600 mt-1">
                            {n.message ?? "Tidak ada detail pesan."}
                          </p>
                          {n.created_at && (
                            <p className="text-[11px] text-gray-400 mt-1">
                              {new Date(n.created_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Toast (hidden by default) */}
        <div
          ref={toastRef}
          className="pointer-events-none fixed left-1/2 transform -translate-x-1/2 top-6 z-[70] bg-white rounded-xl shadow-lg px-4 py-3 w-[min(90%,28rem)] max-w-[28rem] opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-start gap-3">
            <div className="pt-0.5">
              <Bell className="h-5 w-5 text-[#1E3A8A]" />
            </div>
            <div className="flex-1">
              <div className="toast-title font-semibold text-sm text-[#1E3A8A]">
                Notifikasi
              </div>
              <div className="toast-body text-xs text-gray-700 mt-1">
                Pesan notifikasi
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main ref={contentRef} className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeMenu === "dashboard" && (
            <div>
              {/* --------------------------- DASHBOARD --------------------------- */}
              {/* Header Home dengan Notifikasi di Desktop */}
              <section className="w-full bg-white border-b px-8 py-3 flex justify-between items-center">
                {/* Kiri - Teks Home */}
                <p className="text-sm text-gray-700 font-medium">
                  <b>Home</b>
                </p>

                {/* 🔔 Tombol Notifikasi - tampil hanya di Desktop */}
                <button
                  onClick={() => setNotifPanelOpen(true)}
                  aria-label="Notifikasi"
                  title="Lihat Notifikasi"
                  className="hidden md:block relative p-2 hover:scale-110 active:scale-95 transition-transform duration-200"
                >
                  <Bell className="h-6 w-6 text-[#1E3A8A]" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-semibold rounded-full bg-red-500 text-white">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* 🔔 Modal Notifikasi (sama dengan versi mobile) */}
                {notifPanelOpen && (
                  <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-[90%] sm:w-[28rem] max-h-[80vh] rounded-xl shadow-2xl p-4 sm:p-6 overflow-y-auto">
                      {/* Header modal */}
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-lg text-[#1E3A8A] flex items-center gap-2">
                          <Bell className="h-5 w-5 text-[#1E3A8A]" />
                          Notifikasi
                        </h4>
                        <button
                          onClick={() => setNotifPanelOpen(false)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        Semua pemberitahuan terbaru dari panitia SPMB muncul di
                        sini.
                      </p>

                      {/* Status Loading / Error / Kosong */}
                      {loadingNotif && (
                        <p className="text-sm text-gray-500">
                          Memuat notifikasi...
                        </p>
                      )}
                      {notifError && (
                        <p className="text-sm text-red-500">
                          Error: {notifError}
                        </p>
                      )}
                      {!loadingNotif &&
                        notifications.length === 0 &&
                        !notifError && (
                          <p className="text-sm text-gray-500">
                            Belum ada notifikasi saat ini.
                          </p>
                        )}

                      {/* Daftar Notifikasi */}
                      <ul className="space-y-3">
                        {notifications.map((n) => (
                          <li
                            key={n.id}
                            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                <Bell className="h-5 w-5 text-[#1E3A8A]" />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-sm font-semibold text-gray-800">
                                  {n.title ?? "Pemberitahuan Baru"}
                                </h5>
                                <p className="text-xs text-gray-600 mt-1">
                                  {n.message ?? "Tidak ada detail pesan."}
                                </p>
                                {n.created_at && (
                                  <p className="text-[11px] text-gray-400 mt-1">
                                    {new Date(n.created_at).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </section>

              <header className="mt-16 mb-8 flex justify-between items-center">
                <div className="flex justify-center md:justify-start w-full md:w-1/3 mb-4 md:mb-0"></div>
                <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-2/3">
                  <h1 className="text-2xl font-bold text-[#1E3A8A]">
                    Selesksi Penerimaan Murid Baru
                  </h1>
                  <p className="text-gray-600">
                    Daftarkan dirimu di sini. Semua informasi ada di sini.
                  </p>
                </div>
              </header>

              <section className="relative">
                <img
                  src="/image 9.png"
                  alt="Megaphone"
                  className="absolute -top-30 left-6 w-32 h-auto md:w-40 z-10"
                />
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
                  {/* overlay menutupi seluruh layar */}
                  <div
                    className="fixed inset-0 bg-black/60 z-[1000]"
                    onClick={() => setShowModal(false)}
                  />

                  {/* konten modal */}
                  <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-10 max-h-[90vh] overflow-y-auto">
                      <button
                        onClick={() => setShowModal(false)}
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
                            <span className="text-2xl font-bold text-[#1E3A8A]">
                              1
                            </span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">
                                Daftar Online
                              </h1>
                              <p>
                                Calon siswa membuka website resmi SPMB SMK TI
                                Bazma dan mengisi formulir pendaftaran. Pastikan
                                semua data sesuai identitas asli, karena akan
                                menjadi dasar administrasi seleksi.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">
                              2
                            </span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">
                                Unggah Berkas
                              </h1>
                              <p>
                                Setelah mengisi formulir, calon siswa wajib
                                mengunggah dokumen pendukung. Dokumen ini
                                digunakan sebagai bukti kelulusan dan identitas
                                resmi. Berkas yang diperlukan meliputi
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">
                              3
                            </span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">
                                Tes Seleksi
                              </h1>
                              <p>
                                Peserta akan mengikuti beberapa tahap seleksi
                                untuk menilai kemampuan akademik, psikologis,
                                dan motivasi belajar. Tahap seleksi meliputi
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">
                              4
                            </span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">
                                Home Visit
                              </h1>
                              <p>
                                Panitia SPMB dapat melakukan kunjungan ke rumah
                                calon siswa untuk mengenal lebih dekat kondisi
                                lingkungan keluarga. Tujuan dari home visit
                                adalah memastikan kesiapan siswa dan orang tua
                                dalam mendukung pendidikan penuh di SMK TI Bazma
                                yang berbasis asrama.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">
                              5
                            </span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">
                                Pengumuman
                              </h1>
                              <p>
                                Hasil seleksi akan diumumkan secara resmi
                                melalui website SPMB SMK TI Bazma. juga
                                diinformasikan lewat grup WhatsApp resmi. Setiap
                                calon siswa diharapkan memantau pengumuman
                                sesuai dengan jadwal yang telah ditetapkan.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <span className="text-2xl font-bold text-[#1E3A8A]">
                              !
                            </span>
                            <div>
                              <h1 className="text-lg font-semibold text-gray-900">
                                Keterangan Tambahan
                              </h1>
                              <p>
                                Gap Year, SMK TI Bazma memberikan kesempatan
                                bagi lulusan SMP/MTs yang tidak langsung
                                melanjutkan sekolah di tahun kelulusannya. Bagi
                                calon siswa yang mengambil masa jeda atau gap
                                year maksimal satu tahun, tetap diperbolehkan
                                untuk mengikuti proses SPMB.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tombol Lanjut */}
                      <div className="flex justify-center mt-10">
                        <button
                          onClick={() => {
                            setShowModal(false);
                            setIsSidebarOpen(false); // menutup sidebar juga
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
                      const isActive = idx === 0;
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
                              className={`absolute -top-3 -left-3 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                isActive
                                  ? "bg-green-500 text-white"
                                  : "bg-[#1E3A8A] text-white"
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
                            className={`mt-2 text-sm md:text-base ${
                              isActive
                                ? "font-semibold text-[#1E3A8A]"
                                : "text-gray-600"
                            }`}
                          >
                            {step.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Versi mobile: grid 2 kolom */}
                  <div className="grid grid-cols-2 gap-6 md:hidden">
                    {steps.map((step, idx) => {
                      const isActive = idx === 0;
                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="relative">
                            <div
                              className={`absolute -top-2 -left-2 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                                isActive
                                  ? "bg-green-500 text-white"
                                  : "bg-[#1E3A8A] text-white"
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
                            className={`text-xs sm:text-sm mt-2 text-center ${
                              isActive
                                ? "font-semibold text-[#1E3A8A]"
                                : "text-gray-600"
                            }`}
                          >
                            {step.name}
                          </p>
                        </div>
                      );
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
                      Register now and become part of the next generation of
                      excellence at SMK TI BAZMA.
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
  <div className="bg-white rounded-xl shadow overflow-hidden relative w-full">
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    >
      {carouselItems.map((item) => (
        <div
          key={item.id}
          className="flex-shrink-0 w-full relative h-64"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover object-bottom" // 👈 Fokus ke bagian atas gambar
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-sm">{item.date}</p>
            <p className="mt-2 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
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
  );
}
