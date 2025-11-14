"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { mockStudents } from "@/lib/mock-data"
import { CardContent } from "@/components/ui/card"
import { AnimatedCard } from "@/components/animated-card"
import { Monitor } from "lucide-react"

// Import pages
// import PageData from "@/components/page-data"
//import PageAcceptedData from "@/components/page-accepted-data"
//import PageVerifiedData from "@/components/page-verified-data"
//import PageProfileSettings from "@/components/page-profile-settings"

interface SectionViewProps {
  sectionId: string
}

export function SectionView({ sectionId }: SectionViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
      )
    }
  }, [sectionId])

  /* switch (sectionId) {
    case "dashboard":
      return <div ref={containerRef}><DashboardOverview /></div>
    case "table-data":
      return <div ref={containerRef}><PageData /></div>
    case "data-diterima":
      return <div ref={containerRef}><PageAcceptedData /></div>
    case "data-verifikasi":
      return <div ref={containerRef}><PageVerifiedData /></div>
    case "settings":
      return <div ref={containerRef}><PageProfileSettings /></div>
    default:
      return (
        <div ref={containerRef} className="p-6 bg-white rounded-xl shadow">
          Halaman tidak ditemukan
        </div>
      )
  }
} */ 

function DashboardOverview() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      ".stat-card",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
    )

    gsap.fromTo(
      ".stat-number",
      { textContent: 0 },
      {
        textContent: (i: number, target: Element) =>
          (target as HTMLElement).getAttribute("data-value"),
        duration: 2,
        delay: 0.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.2,
      },
    )

  }, [])

  const totalStudents = mockStudents.length
  const verifiedStudents = mockStudents.filter((s) => s.status === "approved").length
  const unverifiedStudents = mockStudents.filter((s) => s.status === "pending").length

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#1E3A8A] font-inter">Informasi</h1>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Pendaftar" value={totalStudents} />
        <StatCard title="Belum Terverifikasi" value={unverifiedStudents} />
        <StatCard title="Terverifikasi" value={verifiedStudents} />
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <AnimatedCard className="stat-card bg-white border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-[#1E3A8A] text-white text-center py-3">
          <p className="text-sm font-medium font-poppins">{title}</p>
        </div>
        <div className="p-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Monitor className="h-8 w-8 text-[#1E3A8A]" />
            </div>
            <div className="text-left">
              <p className="stat-number text-4xl font-bold text-black font-inter" data-value={value}>
                0
              </p>
              <p className="text-sm text-gray-600 font-poppins">Murid</p>
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  )
}
}