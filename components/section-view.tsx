"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Edit, Trash2, Plus, Monitor } from "lucide-react"
import { mockStudents } from "@/lib/mock-data"
import { AnimatedCard } from "@/components/animated-card"

interface SectionViewProps {
  sectionId: string
}

export function SectionView({ sectionId }: SectionViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
      )
    }
  }, [sectionId])

  if (sectionId === "dashboard") {
    return <DashboardOverview />
  }

  if (sectionId === "settings") {
    router.push("/dashboard/settings")
    return null
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <SectionDataTable sectionId={sectionId} />
    </div>
  )
}

function DashboardOverview() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      ".stat-card",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
    )

    // Number counting animation
    gsap.fromTo(
      ".stat-number",
      { textContent: 0 },
      {
        textContent: (i, target) => target.getAttribute("data-value"),
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
      <div className="relative">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1E3A8A] font-inter">Informasi</h1>
          <div className="absolute top-0 right-0 w-32 h-16 opacity-20">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path
                d="M0,25 Q25,0 50,25 T100,25"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-[#1E3A8A]"
              />
              <path
                d="M0,35 Q25,10 50,35 T100,35"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-[#1E3A8A]"
              />
            </svg>
          </div>
        </div>
      </div>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedCard className="stat-card bg-white border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-[#1E3A8A] text-white text-center py-4">
              <p className="text-sm font-medium font-poppins">Total Pendaftar</p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Monitor className="h-8 w-8 text-[#1E3A8A]" />
                </div>
                <div className="text-left">
                  <p className="stat-number text-4xl font-bold text-black font-inter" data-value={totalStudents}>
                    0
                  </p>
                  <p className="text-sm text-gray-600 font-poppins">Pendaftar</p>
                </div>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard className="stat-card bg-white border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-[#1E3A8A] text-white text-center py-4">
              <p className="text-sm font-medium font-poppins">Total Pendaftar</p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Monitor className="h-8 w-8 text-[#1E3A8A]" />
                </div>
                <div className="text-left">
                  <p className="stat-number text-4xl font-bold text-black font-inter" data-value={unverifiedStudents}>
                    0
                  </p>
                  <p className="text-sm text-gray-600 font-poppins">Tidak Terferivikasi</p>
                </div>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard className="stat-card bg-white border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-[#1E3A8A] text-white text-center py-4">
              <p className="text-sm font-medium font-poppins">Total Pendaftar</p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Monitor className="h-8 w-8 text-[#1E3A8A]" />
                </div>
                <div className="text-left">
                  <p className="stat-number text-4xl font-bold text-black font-inter" data-value={verifiedStudents}>
                    0
                  </p>
                  <p className="text-sm text-gray-600 font-poppins">Terferivikasi</p>
                </div>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  )
}

function SectionDataTable({ sectionId }: { sectionId: string }) {
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      ".table-row",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
    )

    // Animate search and filter section
    gsap.fromTo(".search-section", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
  }, [sectionId])

  const enhancedMockStudents = [
    {
      id: "1",
      name: "Mayoralven",
      username: "@mayoralven",
      school: "SMP Negeri 1 Jakarta",
      competency: "Administrator",
      psychotest: "info@mayoralven.com",
      result: "Marketing",
      status: "Active",
      avatar: "M",
    },
    {
      id: "2",
      name: "Lionesse Yami",
      username: "@lyami",
      school: "SMP Negeri 2 Bandung",
      competency: "Human resources",
      psychotest: "l.yami@emviul.com",
      result: "Marketing",
      status: "Active",
      avatar: "L",
    },
    {
      id: "3",
      name: "Christian Chang",
      username: "@cchang",
      school: "SMP Negeri 3 Surabaya",
      competency: "Product Designer",
      psychotest: "c.chang@emviul.com",
      result: "Marketing",
      status: "Onboarding",
      avatar: "CC",
    },
    {
      id: "4",
      name: "Jade Soils",
      username: "@jsoils",
      school: "SMP Negeri 4 Medan",
      competency: "UI Designer",
      psychotest: "j.soils@emviul.com",
      result: "Marketing",
      status: "Active",
      avatar: "J",
    },
    {
      id: "5",
      name: "Claude Bowman",
      username: "@cbowman",
      school: "SMP Negeri 5 Makassar",
      competency: "UX Designer",
      psychotest: "c.bowman@emviul.com",
      result: "Marketing",
      status: "Onboarding",
      avatar: "C",
    },
    {
      id: "6",
      name: "Mone Lara",
      username: "@Mlara",
      school: "SMP Negeri 6 Palembang",
      competency: "Accounting",
      psychotest: "m.lara@emviul.com",
      result: "Marketing",
      status: "Active",
      avatar: "ML",
    },
    {
      id: "7",
      name: "Brooke Barber",
      username: "@Bbarber",
      school: "SMP Negeri 7 Semarang",
      competency: "Devops",
      psychotest: "b.barber@emviul.com",
      result: "Marketing",
      status: "Active",
      avatar: "BB",
    },
    {
      id: "8",
      name: "Ayesha Drake",
      username: "@Adrake",
      school: "SMP Negeri 8 Yogyakarta",
      competency: "Backend",
      psychotest: "a.drake@emviul.com",
      result: "Marketing",
      status: "Inactive",
      avatar: "A",
    },
    {
      id: "9",
      name: "Arnold Warren",
      username: "@Awarren",
      school: "SMP Negeri 9 Denpasar",
      competency: "Sales manager",
      psychotest: "a.warren@emviul.com",
      result: "Marketing",
      status: "Inactive",
      avatar: "A",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">● Active</Badge>
      case "Onboarding":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">● Onboarding</Badge>
      case "Inactive":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">● Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-red-500",
    ]
    return colors[index % colors.length]
  }

  return (
    <div ref={tableRef} className="space-y-6">
      <AnimatedCard className="search-section border-0 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#1E3A8A] font-inter">Table Pendaftar</h2>
            <div className="flex gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-poppins rounded-lg px-4 py-2">
                <Plus className="mr-2 h-4 w-4" />
                New
              </Button>
              <Button variant="outline" className="font-poppins rounded-lg px-4 py-2 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export table
              </Button>
            </div>
          </div>
        </CardContent>
      </AnimatedCard>

      <AnimatedCard className="border-0 shadow-lg rounded-2xl" delay={0.2}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600 font-poppins">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 font-poppins">Nama ↓</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-poppins">Asal Sekolah ↓</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-poppins">Uji Kompetensi ↓</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-poppins">Uji Psikotes ↓</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-poppins">Hasil ↓</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-poppins">Edit ↓</th>
                </tr>
              </thead>
              <tbody>
                {enhancedMockStudents.map((student, index) => (
                  <tr key={student.id} className="table-row border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 ${getAvatarColor(index)} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white text-sm font-medium font-poppins">{student.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 font-poppins">{student.name}</p>
                          <p className="text-sm text-gray-500 font-poppins">{student.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(student.status)}</td>
                    <td className="p-4 text-gray-700 font-poppins">{student.competency}</td>
                    <td className="p-4 text-gray-700 font-poppins">{student.psychotest}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="font-poppins">
                        {student.result} +4
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-2">
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Edit className="h-4 w-4 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
