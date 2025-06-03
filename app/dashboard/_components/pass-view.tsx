"use client";
import { ApplePass } from "@/lib/types";
import { motion } from "motion/react";
import QRCode from "./qr-code";
import Image from "next/image";

export default function PassView({ pass }: { pass: ApplePass }) {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="rounded-md shadow-xl overflow-hidden text-black font-[-apple-system,BlinkMacSystemFont]"
        style={{
          backgroundColor: pass.backgroundColor!,
          width: 350,
          padding: 20,
          height: 450,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex justify-between items-center font-semibold mb-4">
          <div className="flex items-center gap-2 text-xs">
            {pass.logoUrl ? (
              <Image
                src={pass.logoUrl}
                alt="logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="font-medium">
                {pass.logoText || "LOGO TEXT"}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold tracking-tight">
              {pass.headerFieldLabel || "Header Field Label"}
            </div>
            <div className="text-md font-medium">
              {pass.headerFieldValue || "Header Field Value"}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <div>{pass.primaryFieldLabel || "Primary Field Label"}</div>
            <div>{pass.primaryFieldValue || "Primary Field Value"}</div>
          </div>
          <div className="w-full h-28 bg-zinc-900 mb-4 flex items-center justify-center rounded-lg overflow-hidden max-w-[144px]">
            {pass.thumbnailUrl ? (
              <Image
                src={pass.thumbnailUrl}
                alt="strip"
                width={350}
                height={28}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-xs">[thumbnail image]</span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm font-semibold py-3 px-2 rounded-lg mb-3 backdrop-blur-sm">
          <div>
            <div className="font-semibold tracking-tight">
              {pass.secondaryFieldLabel || "Secondary Field Label"}
            </div>
            <div className="font-medium text-lg">
              {pass.secondaryFieldValue || "secondaryFieldValue"}
            </div>
          </div>
          {pass.auxiliaryFieldLabel || pass.auxiliaryFieldValue ? (
            <div className="text-right">
              <div className="font-semibold tracking-tight">
                {pass.auxiliaryFieldLabel || "auxiliaryFieldLabel"}
              </div>
              <div className="font-medium text-lg">
                {pass.auxiliaryFieldValue || "auxiliaryFieldValue"}
              </div>
            </div>
          ) : null}
        </div>
        {pass.barcodeFormat && (
          <motion.div
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col items-center mb-[15rem] justify-center bg-white p-3 rounded-lg shadow-sm">
              <QRCode pass={pass} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
