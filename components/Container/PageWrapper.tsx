import React from 'react'
import { NavBar } from '../NavBar'
import Footer from '../LandingPage/Footer'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex min-w-screen flex-col items-center dark:bg-black bg-white justify-between dark:bg-dot-white/[0.2] bg-dot-black/[0.2">
        <div className="absolute z-[-99] pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
      </main>
      <Footer />
    </>
  )
}
