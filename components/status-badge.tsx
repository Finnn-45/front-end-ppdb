"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"

interface StatusBadgeProps {
  status: "approved" | "pending" | "rejected" | "incomplete"
  showIcon?: boolean
}

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const statusConfig = {
    approved: {
      label: "Diterima",
      variant: "default" as const,
      icon: CheckCircle,
      className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
    },
    pending: {
      label: "Dalam Proses",
      variant: "secondary" as const,
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
    },
    rejected: {
      label: "Ditolak",
      variant: "destructive" as const,
      icon: XCircle,
      className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
    },
    incomplete: {
      label: "Belum Lengkap",
      variant: "outline" as const,
      icon: AlertCircle,
      className: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={`${config.className} font-poppins`}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  )
}
