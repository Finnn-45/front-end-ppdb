"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card } from "@/components/ui/card"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  hover?: boolean
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  direction = "up",
  hover = true,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Initial animation based on direction
    const initialProps = {
      up: { y: 30, opacity: 0 },
      down: { y: -30, opacity: 0 },
      left: { x: -30, opacity: 0 },
      right: { x: 30, opacity: 0 },
    }

    const finalProps = {
      up: { y: 0, opacity: 1 },
      down: { y: 0, opacity: 1 },
      left: { x: 0, opacity: 1 },
      right: { x: 0, opacity: 1 },
    }

    gsap.fromTo(card, initialProps[direction], {
      ...finalProps[direction],
      duration: 0.6,
      delay,
      ease: "power2.out",
    })

    // Hover animations
    if (hover) {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [delay, direction, hover])

  return (
    <Card ref={cardRef} className={`cursor-pointer ${className}`}>
      {children}
    </Card>
  )
}
