import { NavBar } from '@/components/NavBar'

export default function Home() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      <div className='flex flex-col items-center mt-[4rem] p-3 '>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Nextjs Starter Template
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-3">
          Plan, Build & Scale.
        </p>
      </div>
    </main>
  )
}
