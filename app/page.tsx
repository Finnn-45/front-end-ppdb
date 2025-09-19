"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { LoginForm } from "@/components/login-form"
import { PPDBLogo } from "@/components/ppdb-logo"

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    if (isLoggedIn === "true") {
      router.push("/dashboard")
      return
    }

    const tl = gsap.timeline()

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" })
      .fromTo(
        titleRef.current,
        { y: -50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.6",
      )
      .fromTo(formRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
  }, [router])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div ref={titleRef} className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <PPDBLogo size="lg" animated={true} />
          </div>
          <h1 className="text-3xl font-bold text-primary font-serif mb-2 text-balance">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground font-poppins">PPDB SMK TI Bazma 2026</p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Login Form */}
        <div ref={formRef}>
          <LoginForm />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground font-poppins">© 2026 SMK TI Bazma. Semua hak dilindungi.</p>
        </div>
      </div>
    </div>
  )
}
