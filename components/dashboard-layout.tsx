"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Home, Table, CheckCircle, Shield, Settings } from "lucide-react"
import { SectionView } from "@/components/section-view"
import { AnimatedButton } from "@/components/animated-button"
import { SMKLogo } from "@/components/smk-logo"

const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "table-data", name: "Table data", icon: Table },
  { id: "data-diterima", name: "Data diterima", icon: CheckCircle },
  { id: "data-verifikasi", name: "Data Verifikasi", icon: Shield },
  { id: "settings", name: "Settings and profile", icon: Settings },
]

export function DashboardLayout() {
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sidebarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      sidebarRef.current,
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    ).fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3",
    )

    // Animate sidebar menu items
    gsap.fromTo(
      ".sidebar-item",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.5, ease: "power2.out" },
    )
  }, [])

  const handleLogout = () => {
    const tl = gsap.timeline()

    tl.to(".dashboard-container", {
      scale: 0.95,
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.in",
    }).to(".dashboard-container", {
      y: -20,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        localStorage.removeItem("admin_logged_in")
        localStorage.removeItem("admin_username")
        router.push("/")
      },
    })
  }

  const handleMenuClick = (menuId: string) => {
    if (activeMenu === menuId) return

    setActiveMenu(menuId)

    const tl = gsap.timeline()

    tl.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
    }).to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    })
  }

  return (
    <div className="dashboard-container min-h-screen bg-gray-50 flex">
      <div ref={sidebarRef} className="w-80 bg-[#1E3A8A] text-white flex flex-col rounded-r-3xl">
        {/* Admin Profile Section */}
        <div className="p-8 pb-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold font-inter">M</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold font-inter text-white">Admin</h3>
              <p className="text-sm text-blue-200 font-poppins">admin@ppdb.com</p>
            </div>
          </div>
          <div className="w-full h-px bg-blue-600/30"></div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-6 space-y-3">
          {menuItems.map((item) => (
            <div key={item.id} className="sidebar-item">
              <AnimatedButton
                variant="ghost"
                className={`w-full justify-start text-left font-poppins rounded-2xl py-4 px-6 transition-all duration-300 ${
                  activeMenu === item.id
                    ? "bg-white text-[#1E3A8A] hover:bg-white shadow-lg transform scale-105"
                    : "text-white hover:bg-blue-700/50 hover:transform hover:scale-102"
                }`}
                onClick={() => handleMenuClick(item.id)}
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.name}
              </AnimatedButton>
            </div>
          ))}
        </div>

        <div className="p-6 pt-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md p-1">
              <SMKLogo className="w-8 h-8 text-[#1E3A8A]" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-inter text-white">SMK TI BAZMA</h4>
              <p className="text-xs text-blue-200 font-poppins">Islamic Boarding School</p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="sidebar-item">
            <AnimatedButton
              variant="ghost"
              className="w-full justify-center bg-white text-[#1E3A8A] hover:bg-gray-100 font-poppins rounded-2xl py-3 font-medium shadow-md"
              onClick={handleLogout}
            >
              Logout
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main ref={contentRef} className="flex-1 p-8">
          <SectionView sectionId={activeMenu} />
        </main>
      </div>
    </div>
  )
}
