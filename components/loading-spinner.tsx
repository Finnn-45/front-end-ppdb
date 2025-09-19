"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
}

export function LoadingSpinner({ size = "md", color = "text-primary" }: LoadingSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spinner = spinnerRef.current
    if (!spinner) return

    // Continuous rotation animation
    gsap.to(spinner, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "none",
    })
  }, [])

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        ref={spinnerRef}
        className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full ${color}`}
      />
    </div>
  )
}
