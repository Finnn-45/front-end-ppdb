export function SMKLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {/* Outer hexagon structure */}
      <path
        d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Inner geometric cuts */}
      <path d="M30 25 L50 15 L70 25 L70 45 L50 35 L30 45 Z" fill="currentColor" opacity="0.8" />

      {/* Central diamond */}
      <path d="M50 40 L60 50 L50 60 L40 50 Z" fill="currentColor" />

      {/* Bottom geometric section */}
      <path d="M30 55 L50 65 L70 55 L70 75 L50 85 L30 75 Z" fill="currentColor" opacity="0.6" />

      {/* Angular cuts for modern look */}
      <path d="M25 30 L35 25 L35 35 Z" fill="currentColor" opacity="0.4" />
      <path d="M75 30 L65 25 L65 35 Z" fill="currentColor" opacity="0.4" />
      <path d="M25 70 L35 75 L35 65 Z" fill="currentColor" opacity="0.4" />
      <path d="M75 70 L65 75 L65 65 Z" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
