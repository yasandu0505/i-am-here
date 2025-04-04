import React from "react"

export default function DashboardPreview() {
  return (
    <svg
      width="800"
      height="600"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background */}
      <rect width="800" height="600" rx="12" fill="#FCFCFC" />

      {/* Sidebar */}
      <rect x="0" y="0" width="180" height="600" fill="#F3F4F6" />
      <rect x="20" y="20" width="140" height="40" rx="8" fill="#E5E7EB" />
      <circle cx="40" cy="40" r="12" fill="#6366F1" />
      <rect x="60" y="34" width="80" height="12" rx="2" fill="#9CA3AF" />

      {/* Sidebar Menu Items */}
      <rect x="20" y="80" width="140" height="36" rx="6" fill="#6366F1" opacity="0.1" />
      <circle cx="36" cy="98" r="8" fill="#6366F1" />
      <rect x="52" y="94" width="80" height="8" rx="2" fill="#6366F1" />

      {/* Other menu items */}
      {[140, 186, 232, 278].map((y, i) => (
        <React.Fragment key={i}>
          <circle cx="36" cy={y} r="8" fill="#9CA3AF" />
          <rect x="52" y={y - 4} width="80" height="8" rx="2" fill="#9CA3AF" />
        </React.Fragment>
      ))}

      {/* Top Navigation */}
      <rect x="180" y="0" width="620" height="60" fill="#FFFFFF" />
      <rect x="200" y="20" width="200" height="20" rx="4" fill="#F3F4F6" />
      <circle cx="760" cy="30" r="16" fill="#F3F4F6" />

      {/* Main Content Area */}
      <rect x="200" y="80" width="580" height="100" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />

      {/* Stats Cards */}
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <rect
            x={220 + i * 140}
            y="100"
            width="120"
            height="60"
            rx="8"
            fill="#FFFFFF"
            stroke="#E5E7EB"
            strokeWidth="1"
          />
          <circle cx={240 + i * 140} cy="120" r="10" fill={i === 0 ? "#6366F1" : "#9CA3AF"} />
          <rect x={260 + i * 140} y="116" width="60" height="8" rx="2" fill="#9CA3AF" />
          <rect x={240 + i * 140} y="136" width="80" height="14" rx="2" fill={i === 0 ? "#6366F1" : "#111827"} />
        </React.Fragment>
      ))}

      {/* Central QR Code and Mobile Phone Illustration */}
      <rect x="200" y="200" width="580" height="380" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="220" y="220" width="300" height="24" rx="4" fill="#111827" />
      <rect x="220" y="254" width="200" height="16" rx="2" fill="#9CA3AF" />

      {/* QR Code */}
      <rect x="240" y="290" width="180" height="180" rx="8" fill="#111827" />

      {/* QR Code Pattern - Larger and more detailed */}
      <rect x="260" y="310" width="20" height="20" fill="#FFFFFF" />
      <rect x="300" y="310" width="20" height="20" fill="#FFFFFF" />
      <rect x="340" y="310" width="20" height="20" fill="#FFFFFF" />
      <rect x="380" y="310" width="20" height="20" fill="#FFFFFF" />

      <rect x="260" y="350" width="20" height="20" fill="#FFFFFF" />
      <rect x="300" y="350" width="20" height="20" fill="#FFFFFF" />
      <rect x="340" y="350" width="20" height="20" fill="#FFFFFF" />
      <rect x="380" y="350" width="20" height="20" fill="#FFFFFF" />

      <rect x="260" y="390" width="20" height="20" fill="#FFFFFF" />
      <rect x="300" y="390" width="20" height="20" fill="#FFFFFF" />
      <rect x="340" y="390" width="20" height="20" fill="#FFFFFF" />
      <rect x="380" y="390" width="20" height="20" fill="#FFFFFF" />

      <rect x="260" y="430" width="20" height="20" fill="#FFFFFF" />
      <rect x="300" y="430" width="20" height="20" fill="#FFFFFF" />
      <rect x="340" y="430" width="20" height="20" fill="#FFFFFF" />
      <rect x="380" y="430" width="20" height="20" fill="#FFFFFF" />

      {/* QR Code Center Logo */}
      <rect x="300" y="350" width="60" height="60" rx="8" fill="#6366F1" />
      <path d="M330 365 L330 395 M315 380 L345 380" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

      {/* Mobile Phone */}
      <rect x="500" y="280" width="200" height="360" rx="20" fill="#111827" />
      <rect x="510" y="290" width="180" height="320" rx="4" fill="#FFFFFF" />

      {/* Phone Camera */}
      <circle cx="600" cy="280" r="4" fill="#4B5563" />

      {/* Phone Home Button */}
      <rect x="580" y="620" width="40" height="10" rx="5" fill="#4B5563" />

      {/* Phone Screen Content */}
      <rect x="520" y="300" width="160" height="30" rx="4" fill="#F3F4F6" />
      <rect x="530" y="310" width="100" height="10" rx="2" fill="#6366F1" />

      {/* Camera Viewfinder */}
      <rect x="530" y="340" width="140" height="180" rx="4" fill="#F9FAFB" />

      {/* Scan Animation Lines */}
      <rect x="540" y="380" width="120" height="2" rx="1" fill="#6366F1" opacity="0.7" />
      <rect x="540" y="420" width="120" height="2" rx="1" fill="#6366F1" opacity="0.7" />
      <rect x="540" y="460" width="120" height="2" rx="1" fill="#6366F1" opacity="0.7" />

      {/* Scan Frame */}
      <rect
        x="550"
        y="360"
        width="100"
        height="140"
        rx="4"
        stroke="#6366F1"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Scan Button */}
      <circle cx="600" cy="540" r="24" fill="#6366F1" />
      <circle cx="600" cy="540" r="18" fill="#FFFFFF" />
      <circle cx="600" cy="540" r="12" fill="#6366F1" />

      {/* Scan Status Text */}
      <rect x="550" y="580" width="100" height="16" rx="2" fill="#6366F1" />

      {/* Connection Lines between QR and Phone */}
      <path d="M420 380 C460 380, 480 380, 530 420" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="420" cy="380" r="4" fill="#6366F1" />
      <circle cx="530" cy="420" r="4" fill="#6366F1" />

      {/* Success Checkmark */}
      <circle cx="460" cy="400" r="12" fill="#6366F1" opacity="0.2" />
      <path
        d="M454 400 L458 404 L466 396"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

