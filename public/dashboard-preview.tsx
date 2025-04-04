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
      <rect x="0" y="0" width="200" height="600" fill="#F3F4F6" />
      <rect x="20" y="20" width="160" height="40" rx="8" fill="#E5E7EB" />
      <circle cx="40" cy="40" r="12" fill="#6366F1" />
      <rect x="60" y="34" width="100" height="12" rx="2" fill="#9CA3AF" />

      {/* Sidebar Menu Items */}
      <rect x="20" y="80" width="160" height="36" rx="6" fill="#6366F1" opacity="0.1" />
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
      <rect x="200" y="0" width="600" height="60" fill="#FFFFFF" />
      <rect x="220" y="20" width="200" height="20" rx="4" fill="#F3F4F6" />
      <circle cx="760" cy="30" r="16" fill="#F3F4F6" />

      {/* Main Content */}
      <rect x="220" y="80" width="560" height="100" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />

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

      {/* Attendance Chart */}
      <rect x="220" y="200" width="360" height="240" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="240" y="220" width="200" height="20" rx="4" fill="#111827" />

      {/* Chart Bars */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const height = [160, 100, 140, 180, 120, 90, 130][i]
        return (
          <React.Fragment key={i}>
            <rect
              x={260 + i * 40}
              y={400 - height}
              width="24"
              height={height}
              rx="4"
              fill="#6366F1"
              opacity={0.7 + i * 0.05}
            />
            <rect x={260 + i * 40} y="410" width="24" height="10" rx="2" fill="#9CA3AF" />
          </React.Fragment>
        )
      })}

      {/* Recent Activity */}
      <rect x="600" y="200" width="180" height="240" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="620" y="220" width="140" height="20" rx="4" fill="#111827" />

      {/* Activity Items */}
      {[0, 1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <rect x="620" y={260 + i * 36} width="140" height="24" rx="4" fill="#F3F4F6" />
          <circle cx="632" cy={272 + i * 36} r="6" fill={i < 2 ? "#6366F1" : "#9CA3AF"} />
          <rect x="644" y={268 + i * 36} width="100" height="6" rx="2" fill="#9CA3AF" />
          <rect x="644" y={278 + i * 36} width="60" height="4" rx="1" fill="#D1D5DB" />
        </React.Fragment>
      ))}

      {/* QR Code Section */}
      <rect x="220" y="460" width="560" height="120" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="240" y="480" width="200" height="20" rx="4" fill="#111827" />

      {/* QR Code */}
      <rect x="240" y="510" width="70" height="70" rx="4" fill="#111827" />

      {/* QR Code Pattern */}
      <rect x="250" y="520" width="10" height="10" fill="#FFFFFF" />
      <rect x="270" y="520" width="10" height="10" fill="#FFFFFF" />
      <rect x="290" y="520" width="10" height="10" fill="#FFFFFF" />
      <rect x="250" y="540" width="10" height="10" fill="#FFFFFF" />
      <rect x="270" y="540" width="10" height="10" fill="#FFFFFF" />
      <rect x="290" y="540" width="10" height="10" fill="#FFFFFF" />
      <rect x="250" y="560" width="10" height="10" fill="#FFFFFF" />
      <rect x="270" y="560" width="10" height="10" fill="#FFFFFF" />
      <rect x="290" y="560" width="10" height="10" fill="#FFFFFF" />

      {/* QR Code Info */}
      <rect x="330" y="510" width="120" height="12" rx="2" fill="#111827" />
      <rect x="330" y="530" width="200" height="8" rx="2" fill="#9CA3AF" />
      <rect x="330" y="546" width="180" height="8" rx="2" fill="#9CA3AF" />
      <rect x="330" y="570" width="100" height="10" rx="5" fill="#6366F1" />
    </svg>
  )
}

