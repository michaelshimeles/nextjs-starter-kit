"use client"
import { motion } from "motion/react"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const ProjectsData = [
  {
    id: 1,
    name: 'Next.js 15',
    description: 'A framework for React that enables server-side rendering and effortless deployment.',
    image: 'https://utfs.io/f/a8df6965-e6df-417a-ab0b-b3ad33d701d7-hcfblw.png',
    imageDark: "https://utfs.io/f/c5588304-c7ff-43f9-b164-3b9c78474b73-rv0oux.png",
    url: "https://nextjs.org/",
    color: "from-[#000000] to-[#3B3B3B]"
  },
  {
    id: 2,
    name: 'TypeScript',
    description: 'A typed superset of JavaScript that enhances code maintainability and scalability.',
    image: 'https://utfs.io/f/5b51351d-218b-4931-a296-0a9275030aaf-8myeez.png',
    url: "https://www.typescriptlang.org/",
    color: "from-[#007ACC] to-[#2F74C0]"
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for building custom designs with ease.',
    image: 'https://utfs.io/f/666774c0-dc3a-4d5a-84b7-cc96e682db61-bhgw4o.png',
    url: "https://tailwindui.com/",
    color: "from-[#38BDF8] to-[#818CF8]"
  },
  {
    id: 4,
    name: 'Shadcn UI',
    description: 'Beautifully designed components that enhance your application\'s user interface.',
    image: 'https://utfs.io/f/bc4c7cdb-dc42-452c-8744-0ad2c3232e7f-exyul9.png',
    imageDark: "https://utfs.io/f/f9ae4f1b-76a1-4505-afc0-dfcbea05012d-62drog.png",
    url: "https://ui.shadcn.com",
    color: "from-[#000000] to-[#3B3B3B]"
  },
  {
    id: 5,
    name: 'Clerk Auth',
    description: 'Seamless and secure authentication service for modern web applications.',
    image: 'https://utfs.io/f/aee7360d-54f1-4ed1-a4b4-49a56b455bf4-1ker11.png',
    url: "https://clerk.com/",
    color: "from-[#6C47FF] to-[#4F37C8]"
  },
  {
    id: 6,
    name: 'Neon Database',
    description: 'Serverless PostgreSQL for modern, scalable applications.',
    image: 'https://utfs.io/f/c62a5d13-91e4-476f-9d36-786d9995c97f-rqpuxo.png',
    url: "https://neon.tech/",
    color: "from-[#00E699] to-[#00B377]"
  },
  {
    id: 7,
    name: 'Drizzle ORM',
    description: 'Modern database toolkit for TypeScript and Node.js, simplifying database interactions.',
    image: 'https://utfs.io/f/c3933696-cd5c-4de7-a24e-1822df8c4215-g7gclc.png',
    url: "https://prisma.io/",
    color: "from-[#2D3748] to-[#4F46E5]"
  },
  {
    id: 8,
    name: 'Stripe Subscriptions & One time payments',
    description: 'Payment processing solution for handling subscriptions and one-off transactions securely.',
    image: 'https://utfs.io/f/a2fbe9db-35f8-4738-a4c4-0b9a29f4efc7-er2coj.png',
    url: "https://stripe.com",
    color: "from-[#FFC107] to-[#FF9900]"
  },
  {
    id: 9,
    name: 'Tanstack Query',
    description: 'For client side fetching, caching, and revalidation.',
    image: 'https://utfs.io/f/ee162388-f998-4740-bfc4-9d9a7050f485-90gb5l.png',
    url: "https://tanstack.com/query/v5",
    color: "from-[#3B82F6] to-[#1D4ED8]"
  }
]

export default function TechStack() {
  return (
    <section className="py-24 px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
          Built with Modern Tech Stack
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Powered by the latest technologies to ensure scalability, security, and developer experience.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {ProjectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={project.url} target="_blank" className="block">
              <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                {/* Gradient Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                  <div className={`h-full w-full bg-gradient-to-br ${project.color}`}></div>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 p-2.5">
                      <Image
                        src={project.imageDark || project.image}
                        alt={project.name}
                        width={30}
                        height={30}
                        loading="eager"
                        className="hidden dark:block w-full h-full object-contain"
                      />
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={30}
                        height={30}
                        loading="eager"
                        className="dark:hidden w-full h-full object-contain"
                      />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
