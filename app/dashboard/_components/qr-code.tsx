"use client"

import { ApplePass } from "@/lib/types"
import { QRCodeCanvas } from "qrcode.react"

export default function QRCode({ pass, size }: { pass: ApplePass, size?: number }) {
    return (
        <QRCodeCanvas
            size={size || 100}
            value={`${process.env.NEXT_PUBLIC_APP_URL}/api/add/${pass?.slug}`}
            className="w-full"
        />
    )
}