
const logos = [
  {
    name: 'Prime',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg',
  },
  {
    name: 'Trustpilot',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tkfspxqmjflfllbuqxsi.svg',
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
    name: 'Stackoverflow',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/ts1j4mkooxqmscgptafa.svg',
  },
  {
    name: 'mistral',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg',
  },
]

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
          }}
        >
          {Array(5)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo, key) => (
                  <img
                    key={key}
                    src={logo.url}
                    className="h-10 w-28 px-2"
                    alt={`${logo.name}`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedLogoCloud