import React from 'react'
import { NavBar } from '../NavBar'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
    <NavBar />
    <main className="flex min-w-screen flex-col items-center justify-between ">
      {children}
    </main>
    </>
  )
}
