export function SMKLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="86.000000pt"
      height="116.000000pt"
      viewBox="0 0 86.000000 116.000000"
      className={className}
    >
      {/* 🔵 Bagian utama biru tua */}
      <path
        d="M0 0 C3.86458293 1.73239924 7.20511832 4.15997821 10.625 6.625 ... Z"
        fill="#1D2B6F"
        transform="translate(36,14)"
      />

      {/* 🔴 Bagian merah */}
      <path
        d="M0 0 C4.817241 2.41188864 8.85954508 5.86992041 13.08398438 9.18554688 ... Z"
        fill="#E5252A"
        transform="translate(21.12109375,72.55859375)"
      />

      {/* 🟢 Bagian hijau */}
      <path
        d="M0 0 C2.83412717 1.30216654 3.71143177 2.39612626 5.3125 5.0625 ... Z"
        fill="#A3C725"
        transform="translate(75.6875,42.9375)"
      />

      {/* 🔵 Aksen biru */}
      <path
        d="M0 0 C4.25667279 2.34946226 7.75535555 4.33204869 9.34375 9.203125 ... Z"
        fill="#1D2B6F"
        transform="translate(44.59375,55.671875)"
      />

      {/* 🔴 Aksen merah */}
      <path
        d="M0 0 C5.875 3.75 5.875 3.75 7 6 ... Z"
        fill="#E5252A"
        transform="translate(66,36)"
      />

      {/* 🟢 Aksen hijau */}
      <path
        d="M0 0 C2.5 1.25 2.5 1.25 4.5 4.25 ... Z"
        fill="#A3C725"
        transform="translate(21.5,72.75)"
      />
    </svg>
  );
}
