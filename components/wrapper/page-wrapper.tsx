import Footer from './footer'
import NavBar from './navbar'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 flex flex-col pt-[4rem] items-center bg-gradient-to-b from-pink-400 to-pink-200">
        {children}
      </main>
      <Footer />
    </div>
  )
}