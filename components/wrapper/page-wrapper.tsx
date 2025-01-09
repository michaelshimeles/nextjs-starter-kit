import Footer from './footer'
import NavBar from './navbar'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex min-w-screen min-h-screen flex-col pt-[4rem] items-center bg-gradient-to-b from-pink-400 to-pink-200 justify-between">
        {children}
      </main>
      <Footer />
    </>
  )
}