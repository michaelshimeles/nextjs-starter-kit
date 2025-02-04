"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ProjectsData = [
  {
    id: 1,
    name: "Next.js 15",
    description:
      "A framework for React that enables server-side rendering and effortless deployment.",
    svg: `
<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_408_139" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
<circle cx="90" cy="90" r="90" fill="black"/>
</mask>
<g mask="url(#mask0_408_139)">
<circle cx="90" cy="90" r="87" fill="black" stroke="white" stroke-width="6"/>
<path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_139)"/>
<rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_139)"/>
</g>
<defs>
<linearGradient id="paint0_linear_408_139" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear_408_139" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
    `,
    url: "https://nextjs.org/",
    color: "from-[#000000] to-[#3B3B3B]",
  },
  {
    id: 2,
    name: "TypeScript",
    description:
      "A typed superset of JavaScript that enhances code maintainability and scalability.",
    svg: `
      <svg viewBox="0 0 256 256" width="256" height="256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8ZM77.1575 20.9877C77.1436 21.1129 77.0371 21.2066 76.9111 21.2066H63.7746C63.615 21.2066 63.4961 21.3546 63.5377 21.5087C64.1913 23.9314 66.1398 25.3973 68.7994 25.3973C69.6959 25.4161 70.5846 25.2317 71.3968 24.8582C72.1536 24.5102 72.8249 24.0068 73.3659 23.3828C73.4314 23.3073 73.5454 23.2961 73.622 23.3602L76.2631 25.6596C76.3641 25.7476 76.3782 25.8999 76.2915 26.0021C74.697 27.8832 72.1135 29.25 68.5683 29.25C63.1142 29.25 59.0001 25.4731 59.0001 19.7348C59.0001 16.9197 59.9693 14.559 61.5847 12.8921C62.4374 12.0349 63.4597 11.3584 64.5882 10.9043C65.7168 10.4502 66.9281 10.2281 68.1473 10.2517C73.6753 10.2517 77.25 14.1394 77.25 19.5075C77.2431 20.0021 77.2123 20.4961 77.1575 20.9877ZM63.6166 17.5038C63.5702 17.6581 63.6894 17.8084 63.8505 17.8084H72.5852C72.7467 17.8084 72.8659 17.6572 72.8211 17.5021C72.2257 15.4416 70.7153 14.0666 68.3696 14.0666C67.6796 14.0447 66.993 14.1696 66.3565 14.4326C65.7203 14.6957 65.149 15.0908 64.6823 15.5907C64.1914 16.1473 63.8285 16.7998 63.6166 17.5038ZM90.2473 10.2527C90.3864 10.2512 90.5 10.3636 90.5 10.5027V14.7013C90.5 14.8469 90.3762 14.9615 90.2311 14.9508C89.8258 14.9207 89.4427 14.8952 89.1916 14.8952C85.9204 14.8952 84 17.1975 84 20.2195V28.75C84 28.8881 83.8881 29 83.75 29H80C79.862 29 79.75 28.8881 79.75 28.75V10.7623C79.75 10.6242 79.862 10.5123 80 10.5123H83.75C83.8881 10.5123 84 10.6242 84 10.7623V13.287C84 13.3013 84.0116 13.3128 84.0258 13.3128C84.034 13.3128 84.0416 13.3089 84.0465 13.3024C85.5124 11.3448 87.676 10.2559 89.9617 10.2559L90.2473 10.2527Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
</svg>
      `,
    url: "https://www.typescriptlang.org/",
    color: "from-[#007ACC] to-[#2F74C0]",
  },
  {
    id: 3,
    name: "Tailwind CSS",
    description:
      "A utility-first CSS framework for building custom designs with ease.",
    svg: `
    <svg
  viewBox="0 0 256 154"
  width="256"
  height="154"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid"
  >
  <defs
    ><linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="gradient">
      <stop stop-color="#2298BD" offset="0%"></stop>
      <stop stop-color="#0ED7B5" offset="100%"></stop>
    </linearGradient></defs>
  <path
    d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8ZM90.2473 10.2527C90.3864 10.2512 90.5 10.3636 90.5 10.5027V14.7013C90.5 14.8469 90.3762 14.9615 90.2311 14.9508C89.8258 14.9207 89.4427 14.8952 89.1916 14.8952C85.9204 14.8952 84 17.1975 84 20.2195V28.75C84 28.8881 83.8881 29 83.75 29H80C79.862 29 79.75 28.8881 79.75 28.75V10.7623C79.75 10.6242 79.862 10.5123 80 10.5123H83.75C83.8881 10.5123 84 10.6242 84 10.7623V13.287C84 13.3013 84.0116 13.3128 84.0258 13.3128C84.034 13.3128 84.0416 13.3089 84.0465 13.3024C85.5124 11.3448 87.676 10.2559 89.9617 10.2559L90.2473 10.2527Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
</svg>

    `,
    url: "https://tailwindui.com/",
    color: "from-[#38BDF8] to-[#818CF8]",
  },
  {
    id: 4,
    name: "Shadcn UI",
    description:
      "Beautifully designed components that enhance your application's user interface.",
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path fill="none" stroke="#fff" stroke-width="25" stroke-linecap="round" d="M208 128l-80 80M192 40L40 192"/></svg>
    `,
    url: "https://ui.shadcn.com",
    color: "from-[#000000] to-[#3B3B3B]",
  },
  {
    id: 5,
    name: "Clerk Auth",
    description:
      "Seamless and secure authentication service for modern web applications.",
    svg: `<svg width="110" height="32" viewBox="0 0 110 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="16.0003" cy="16" rx="4.99998" ry="5" fill="#9785FF" style="fill:#9785FF;fill:color(display-p3 0.5922 0.5216 1.0000);fill-opacity:1;"/>
<path d="M25.0091 27.8382C25.4345 28.2636 25.3918 28.9679 24.8919 29.3027C22.3488 31.0062 19.2899 31.9997 15.9991 31.9997C12.7082 31.9997 9.64935 31.0062 7.10616 29.3027C6.60633 28.9679 6.56361 28.2636 6.98901 27.8382L10.6429 24.1843C10.9732 23.854 11.4855 23.8019 11.9012 24.0148C13.1303 24.6445 14.5232 24.9997 15.9991 24.9997C17.4749 24.9997 18.8678 24.6445 20.0969 24.0148C20.5126 23.8019 21.0249 23.854 21.3552 24.1843L25.0091 27.8382Z" fill="#9785FF" style="fill:#9785FF;fill:color(display-p3 0.5922 0.5216 1.0000);fill-opacity:1;"/>
<path opacity="0.6" d="M24.8928 2.697C25.3926 3.0318 25.4353 3.73609 25.0099 4.16149L21.356 7.81544C21.0258 8.14569 20.5134 8.19785 20.0978 7.98491C18.8687 7.35525 17.4758 7 15.9999 7C11.0294 7 6.99997 11.0294 6.99997 16C6.99997 17.4759 7.35522 18.8688 7.98488 20.0979C8.19782 20.5136 8.14565 21.0259 7.81541 21.3561L4.16147 25.0101C3.73607 25.4355 3.03178 25.3927 2.69698 24.8929C0.993522 22.3497 0 19.2909 0 16C0 7.16344 7.16341 0 15.9999 0C19.2908 0 22.3496 0.993529 24.8928 2.697Z" fill="#9785FF" style="fill:#9785FF;fill:color(display-p3 0.5922 0.5216 1.0000);fill-opacity:1;"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M100.405 21.2489C100.421 21.2324 100.442 21.2231 100.465 21.2231C100.493 21.2231 100.518 21.2375 100.533 21.2613L105.275 28.8821C105.321 28.9554 105.401 29 105.487 29L109.75 29C109.946 29 110.066 28.7848 109.963 28.6183L103.457 18.1226C103.399 18.0278 103.41 17.9056 103.485 17.823L109.752 10.908C109.898 10.7473 109.784 10.4901 109.567 10.4901H105.12C105.05 10.4901 104.983 10.5194 104.936 10.5711L97.6842 18.4755C97.5301 18.6435 97.25 18.5345 97.25 18.3065V3.25C97.25 3.11193 97.138 3 97 3H93.25C93.1119 3 93 3.11193 93 3.25V28.75C93 28.8881 93.1119 29 93.25 29L97 29C97.138 29 97.25 28.8881 97.25 28.75V24.7373C97.25 24.6741 97.2739 24.6132 97.317 24.567L100.405 21.2489ZM52.2502 3.25C52.2502 3.11193 52.3621 3 52.5002 3H56.2501C56.3882 3 56.5001 3.11193 56.5001 3.25V28.75C56.5001 28.8881 56.3882 29 56.2501 29H52.5002C52.3621 29 52.2502 28.8881 52.2502 28.75V3.25ZM46.958 23.5912C46.8584 23.5052 46.7094 23.5117 46.6137 23.602C46.0293 24.1537 45.3447 24.595 44.5947 24.9028C43.7719 25.2407 42.8873 25.4108 41.995 25.4028C41.2415 25.4252 40.4913 25.2963 39.7906 25.0241C39.09 24.7519 38.4537 24.3422 37.9209 23.8202C36.9531 22.8322 36.396 21.4215 36.396 19.7399C36.396 16.3735 38.6356 14.0709 41.995 14.0709C42.896 14.0585 43.7888 14.241 44.6094 14.6052C45.3533 14.9355 46.0214 15.4077 46.5748 15.9934C46.6694 16.0936 46.8266 16.1052 46.9309 16.015L49.4625 13.8244C49.5659 13.7349 49.5785 13.5786 49.4873 13.4767C47.583 11.3488 44.5997 10.25 41.7627 10.25C36.0506 10.25 32.0003 14.1031 32.0003 19.7719C32.0003 22.5756 33.0069 24.9365 34.7044 26.6036C36.402 28.2707 38.8203 29.25 41.6108 29.25C45.1097 29.25 47.9259 27.9082 49.577 26.187C49.6739 26.086 49.6632 25.9252 49.5572 25.8338L46.958 23.5912ZM77.1575 20.9877C77.1436 21.1129 77.0371 21.2066 76.9111 21.2066H63.7746C63.615 21.2066 63.4961 21.3546 63.5377 21.5087C64.1913 23.9314 66.1398 25.3973 68.7994 25.3973C69.6959 25.4161 70.5846 25.2317 71.3968 24.8582C72.1536 24.5102 72.8249 24.0068 73.3659 23.3828C73.4314 23.3073 73.5454 23.2961 73.622 23.3602L76.2631 25.6596C76.3641 25.7476 76.3782 25.8999 76.2915 26.0021C74.697 27.8832 72.1135 29.25 68.5683 29.25C63.1142 29.25 59.0001 25.4731 59.0001 19.7348C59.0001 16.9197 59.9693 14.559 61.5847 12.8921C62.4374 12.0349 63.4597 11.3584 64.5882 10.9043C65.7168 10.4502 66.9281 10.2281 68.1473 10.2517C73.6753 10.2517 77.25 14.1394 77.25 19.5075C77.2431 20.0021 77.2123 20.4961 77.1575 20.9877ZM63.6166 17.5038C63.5702 17.6581 63.6894 17.8084 63.8505 17.8084H72.5852C72.7467 17.8084 72.8659 17.6572 72.8211 17.5021C72.2257 15.4416 70.7153 14.0666 68.3696 14.0666C67.6796 14.0447 66.993 14.1696 66.3565 14.4326C65.7203 14.6957 65.149 15.0908 64.6823 15.5907C64.1914 16.1473 63.8285 16.7998 63.6166 17.5038ZM90.2473 10.2527C90.3864 10.2512 90.5 10.3636 90.5 10.5027V14.7013C90.5 14.8469 90.3762 14.9615 90.2311 14.9508C89.8258 14.9207 89.4427 14.8952 89.1916 14.8952C85.9204 14.8952 84 17.1975 84 20.2195V28.75C84 28.8881 83.8881 29 83.75 29H80C79.862 29 79.75 28.8881 79.75 28.75V10.7623C79.75 10.6242 79.862 10.5123 80 10.5123H83.75C83.8881 10.5123 84 10.6242 84 10.7623V13.287C84 13.3013 84.0116 13.3128 84.0258 13.3128C84.034 13.3128 84.0416 13.3089 84.0465 13.3024C85.5124 11.3448 87.676 10.2559 89.9617 10.2559L90.2473 10.2527Z" fill="white" style="fill:white;fill:white;fill-opacity:1;"/>
</svg>`,
    url: "https://clerk.com/",
    color: "from-[#6C47FF] to-[#4F37C8]",
  },
  {
    id: 6,
    name: "Convex DB",
    description:
      "A powerful backend platform with real-time database, file storage, and serverless functions.",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0001 2L21.0437 7V17L12.0001 22L2.95654 17V7L12.0001 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 22V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.0437 7L12.0001 12L2.95654 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.95654 17L12.0001 12L21.0437 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    url: "https://convex.link/rasmicstarter",
    color: "from-[#FF4F00] to-[#FF8A00]",
  },
  {
    id: 7,
    name: "Polar.sh",
    description:
      "Open-source solution for managing subscriptions and payments in your application.",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" stroke-width="2"/>
    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    url: "https://polar.sh",
    color: "from-[#0066FF] to-[#00CCFF]",
  },
];

export default function TechStack() {
  return (
    <section className="py-24 px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
          Built with Modern Tech Stack
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Powered by the latest technologies to ensure scalability, security,
          and developer experience.
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
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              {/* Gradient Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                <div
                  className={`h-full w-full bg-gradient-to-br ${project.color}`}
                ></div>
              </div>

              <div className="relative z-10">
                {/* Logo and External Link */}
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <div
                      className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
                      dangerouslySetInnerHTML={{ __html: project.svg }}
                    />
                  </div>
                  <Link
                    href={project.url}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>

                {/* Content */}
                <Link href={project.url} target="_blank" className="block">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
