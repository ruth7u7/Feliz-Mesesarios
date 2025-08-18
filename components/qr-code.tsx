"use client";

import QRCode from "react-qr-code";

interface QRCodeComponentProps {
  url: string;
  size?: number;
  className?: string;
}

export default function QRCodeComponent({
  url,
  size = 128,
  className = ""
}: QRCodeComponentProps) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow-lg inline-block ${className}`}>
      <QRCode
        value={url}
        size={size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox={`0 0 ${size} ${size}`}
        level="H"
      />
    </div>
  );
}
