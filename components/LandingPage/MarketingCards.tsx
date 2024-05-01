
"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'

const ProjectsData = [
  {
    id: 1,
    name: 'Prettyfolio',
    description: 'A curated collection of portfolios for inspiration.',
    link: 'https://prettyfolio.com',
    image: 'https://ansubkhan.com/images/projects/prettyfolio.png',
  },
  {
    id: 2,
    name: 'Enchant',
    description: 'A vibrant theme for Visual Studio Code.',
    link: 'https://enchant.ansubkhan.com',
    image: 'https://ansubkhan.com/images/projects/enchant.png',
  },
  {
    id: 3,
    name: 'Ansubkhan.com',
    description: 'My personal website, blogs and newsletter.',
    link: 'https://ansubkhan.com',
    image: 'https://ansubkhan.com/images/projects/portfolio.png',
  },
  {
    id: 4,
    name: 'Quote Vault',
    description: 'Social media, but for sharing quotes.',
    link: 'https://quote-vault.vercel.app',
    image: 'https://ansubkhan.com/images/projects/quote-vault.png',
  },
  {
    id: 5,
    name: 'Quote Vault',
    description: 'Social media, but for sharing quotes.',
    link: 'https://quote-vault.vercel.app',
    image: 'https://ansubkhan.com/images/projects/quote-vault.png',
  },
  {
    id: 6,
    name: 'Quote Vault',
    description: 'Social media, but for sharing quotes.',
    link: 'https://quote-vault.vercel.app',
    image: 'https://ansubkhan.com/images/projects/quote-vault.png',
  },
  {
    id: 7,
    name: 'Quote Vault',
    description: 'Social media, but for sharing quotes.',
    link: 'https://quote-vault.vercel.app',
    image: 'https://ansubkhan.com/images/projects/quote-vault.png',
  },
  {
    id: 8,
    name: 'Quote Vault',
    description: 'Social media, but for sharing quotes.',
    link: 'https://quote-vault.vercel.app',
    image: 'https://ansubkhan.com/images/projects/quote-vault.png',
  },
]

const SpringAnimatedFeatures = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className='flex flex-col mb-[3rem]'>
        <h1 className="scroll-m-20 text-3xl sm:text-xl md:text-3xl font-semibold tracking-tight lg:text-4xl text-center max-w-[700px]">
          Insert cool headline here
        </h1>
        <p className="mx-auto max-w-[500px] text-gray-500 md:text-lg text-center mt-2 dark:text-gray-400">
          Make sure to add a headline and subheadline that makes potential users say wow.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-6">
        {ProjectsData.map((project) => {
          return (
            <motion.div
              whileHover={{
                y: -8,
              }}
              transition={{
                type: 'spring',
                bounce: 0.7,
              }}
              key={project.id}
              className="mt-5 text-left border p-6 rounded-md"
            >
              <a target="_blank" rel="noopener noreferrer" href={project.link}>
                <Image
                  src={project.image}
                  width={30}
                  height={30}
                  className="mb-3 rounded-lg"
                  alt={project.name}
                />
                <div className="mb-1 text-sm font-medium text-gray-900">
                  {project.name}
                </div>
                <div className="max-w-[250px] text-sm font-normal text-gray-500">
                  {project.description}
                </div>
              </a>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SpringAnimatedFeatures
