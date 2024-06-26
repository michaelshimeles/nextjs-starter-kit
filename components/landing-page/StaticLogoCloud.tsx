const logos = [
  {
    name: 'Vercel',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg',
  },
  {
    name: 'Nextjs',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881475/nextjs_logo_dark_gfkf8m.svg',
  },
  {
    name: 'Webflow',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg',
  },
  {
    name: 'Airbnb',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg',
  },
  {
    name: 'Tina',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/afqhiygywyphuou6xtxc.svg',
  },
  {
    name: 'Mistral',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg',
  },
]

const StaticLogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="flex w-full flex-col items-center justify-center px-4 md:px-8">
        <div className="font-medium uppercase">Sponsored by</div>
        <div className="group relative flex gap-6 px-2">
          <div className="flex shrink-0 flex-row justify-around gap-6">
            {logos.map((logo, key) => (
              <img
                key={key}
                src={logo.url}
                className="h-10 w-28 px-2 brightness-0"
                alt={`${logo.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaticLogoCloud