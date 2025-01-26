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
      <svg viewBox="0 0 256 256" width="256" height="256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" fill="#3178C6"/><path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" fill="#FFF"/></svg>
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
    d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z"
    fill="url(#gradient)"></path></svg>

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
    name: "Neon Database",
    description: "Serverless PostgreSQL for modern, scalable applications.",
    svg: '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="256" height="256" preserveAspectRatio="xMidYMid"><defs><linearGradient id="a" x1="100%" x2="12.069%" y1="100%" y2="0%"><stop offset="0%" stop-color="#62F755"/><stop offset="31.922%" stop-color="#F9FFB5"/><stop offset="70.627%" stop-color="#FFA770"/><stop offset="100%" stop-color="#FF7373"/></linearGradient><linearGradient id="b" x1="100%" x2="40.603%" y1="100%" y2="76.897%"><stop offset="0%" stop-color="#673800"/><stop offset="100%" stop-color="#B65E00"/></linearGradient></defs><path fill="#00E0D9" d="M0 44.139C0 19.762 19.762 0 44.139 0H211.86C236.238 0 256 19.762 256 44.139v142.649c0 25.216-31.915 36.16-47.388 16.256l-48.392-62.251v75.484c0 21.939-17.784 39.723-39.722 39.723h-76.36C19.763 256 0 236.238 0 211.861V44.14Zm44.139-8.825c-4.879 0-8.825 3.946-8.825 8.818v167.73c0 4.878 3.946 8.831 8.818 8.831h77.688c2.44 0 3.087-1.977 3.087-4.416v-101.22c0-25.222 31.914-36.166 47.395-16.255l48.391 62.243V44.14c0-4.879.455-8.825-4.416-8.825H44.14Z"/><path fill="url(#a)" d="M0 44.139C0 19.762 19.762 0 44.139 0H211.86C236.238 0 256 19.762 256 44.139v142.649c0 25.216-31.915 36.16-47.388 16.256l-48.392-62.251v75.484c0 21.939-17.784 39.723-39.722 39.723h-76.36C19.763 256 0 236.238 0 211.861V44.14Zm44.139-8.825c-4.879 0-8.825 3.946-8.825 8.818v167.73c0 4.878 3.946 8.831 8.818 8.831h77.688c2.44 0 3.087-1.977 3.087-4.416v-101.22c0-25.222 31.914-36.166 47.395-16.255l48.391 62.243V44.14c0-4.879.455-8.825-4.416-8.825H44.14Z"/><path fill="url(#b)" fill-opacity=".4" d="M0 44.139C0 19.762 19.762 0 44.139 0H211.86C236.238 0 256 19.762 256 44.139v142.649c0 25.216-31.915 36.16-47.388 16.256l-48.392-62.251v75.484c0 21.939-17.784 39.723-39.722 39.723h-76.36C19.763 256 0 236.238 0 211.861V44.14Zm44.139-8.825c-4.879 0-8.825 3.946-8.825 8.818v167.73c0 4.878 3.946 8.831 8.818 8.831h77.688c2.44 0 3.087-1.977 3.087-4.416v-101.22c0-25.222 31.914-36.166 47.395-16.255l48.391 62.243V44.14c0-4.879.455-8.825-4.416-8.825H44.14Z"/><path fill="#63F655" d="M211.861 0C236.238 0 256 19.762 256 44.139v142.649c0 25.216-31.915 36.16-47.388 16.256l-48.392-62.251v75.484c0 21.939-17.784 39.723-39.722 39.723a4.409 4.409 0 0 0 4.409-4.409V115.058c0-25.223 31.914-36.167 47.395-16.255l48.391 62.243V8.825c0-4.871-3.953-8.825-8.832-8.825Z"/></svg>',
    url: "https://neon.tech/",
    color: "from-[#00E699] to-[#00B377]",
  },
  {
    id: 7,
    name: "Drizzle ORM",
    description:
      "Modern database toolkit for TypeScript and Node.js, simplifying database interactions.",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="none" viewBox="0 0 160 160"><rect width="9.631" height="40.852" fill="#C5F74F" rx="4.816" transform="matrix(.87303 .48767 -.49721 .86763 43.48 67.304)"/><rect width="9.631" height="40.852" fill="#C5F74F" rx="4.816" transform="matrix(.87303 .48767 -.49721 .86763 76.94 46.534)"/><rect width="9.631" height="40.852" fill="#C5F74F" rx="4.816" transform="matrix(.87303 .48767 -.49721 .86763 128.424 46.535)"/><rect width="9.631" height="40.852" fill="#C5F74F" rx="4.816" transform="matrix(.87303 .48767 -.49721 .86763 94.957 67.304)"/></svg>',
    url: "https://prisma.io/",
    color: "from-[#2D3748] to-[#4F46E5]",
  },
  {
    id: 8,
    name: "Stripe Subscriptions & One time payments",
    description:
      "Payment processing solution for handling subscriptions and one-off transactions securely.",
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" width="76.57" height="32" viewBox="0 0 512 214"><path fill="#635BFF" d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774"/></svg>
    `,
    url: "https://stripe.com",
    color: "from-[#FFC107] to-[#FF9900]",
  },
  {
    id: 9,
    name: "Tanstack Query",
    description: "For client side fetching, caching, and revalidation.",
    svg: `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 633 633"><defs><linearGradient id="b" x1="50%" x2="50%" y1="0%" y2="71.65%"><stop offset="0%" stop-color="#6BDAFF"/><stop offset="31.922%" stop-color="#F9FFB5"/><stop offset="70.627%" stop-color="#FFA770"/><stop offset="100%" stop-color="#FF7373"/></linearGradient><linearGradient id="d" x1="43.996%" x2="53.441%" y1="8.54%" y2="93.872%"><stop offset="0%" stop-color="#673800"/><stop offset="100%" stop-color="#B65E00"/></linearGradient><linearGradient id="e" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2F8A00"/><stop offset="100%" stop-color="#90FF57"/></linearGradient><linearGradient id="f" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2F8A00"/><stop offset="100%" stop-color="#90FF57"/></linearGradient><linearGradient id="g" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2F8A00"/><stop offset="100%" stop-color="#90FF57"/></linearGradient><linearGradient id="h" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2F8A00"/><stop offset="100%" stop-color="#90FF57"/></linearGradient><linearGradient id="i" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2F8A00"/><stop offset="100%" stop-color="#90FF57"/></linearGradient><linearGradient id="j" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2F8A00"/><stop offset="100%" stop-color="#90FF57"/></linearGradient><linearGradient id="k" x1="92.9%" x2="8.641%" y1="45.768%" y2="54.892%"><stop offset="0%" stop-color="#EE2700"/><stop offset="100%" stop-color="#FF008E"/></linearGradient><linearGradient id="l" x1="61.109%" x2="43.717%" y1="3.633%" y2="43.072%"><stop offset="0%" stop-color="#FFF400"/><stop offset="100%" stop-color="#3C8700"/></linearGradient><linearGradient id="m" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#FFDF00"/><stop offset="100%" stop-color="#FF9D00"/></linearGradient><linearGradient id="n" x1="127.279%" x2="0%" y1="49.778%" y2="50.222%"><stop offset="0%" stop-color="#FFA400"/><stop offset="100%" stop-color="#FF5E00"/></linearGradient><linearGradient id="o" x1="127.279%" x2="0%" y1="47.531%" y2="52.469%"><stop offset="0%" stop-color="#FFA400"/><stop offset="100%" stop-color="#FF5E00"/></linearGradient><linearGradient id="p" x1="127.279%" x2="0%" y1="46.195%" y2="53.805%"><stop offset="0%" stop-color="#FFA400"/><stop offset="100%" stop-color="#FF5E00"/></linearGradient><linearGradient id="q" x1="127.279%" x2="0%" y1="35.33%" y2="64.67%"><stop offset="0%" stop-color="#FFA400"/><stop offset="100%" stop-color="#FF5E00"/></linearGradient><linearGradient id="r" x1="127.279%" x2="0%" y1="4.875%" y2="95.125%"><stop offset="0%" stop-color="#FFA400"/><stop offset="100%" stop-color="#FF5E00"/></linearGradient><linearGradient id="s" x1="78.334%" x2="31.668%" y1="0%" y2="100%"><stop offset="0%" stop-color="#FFA400"/><stop offset="100%" stop-color="#FF5E00"/></linearGradient><linearGradient id="t" x1="57.913%" x2="44.88%" y1="0%" y2="100%"><stop offset="0%" stop-color="#FFA400"/><stop offset="100%" stop-color="#FF5E00"/></linearGradient><linearGradient id="u" x1="50.495%" x2="49.68%" y1="0%" y2="100%"><stop offset="0%" stop-color="#FFA400"/><stop offset="100%" stop-color="#FF5E00"/></linearGradient><circle id="a" cx="308.5" cy="308.5" r="308.5"/><circle id="v" cx="307.5" cy="308.5" r="316.5"/></defs><g fill="none" fill-rule="evenodd" transform="translate(9 8)"><mask id="c" fill="#fff"><use xlink:href="#a"/></mask><use xlink:href="#a" fill="url(#b)"/><ellipse cx="81.5" cy="602.5" fill="#015064" stroke="#00CFE2" stroke-width="25" mask="url(#c)" rx="214.5" ry="185.968"/><ellipse cx="535.5" cy="602.5" fill="#015064" stroke="#00CFE2" stroke-width="25" mask="url(#c)" rx="214.5" ry="185.968"/><ellipse cx="81.5" cy="640.5" fill="#015064" stroke="#00A8B8" stroke-width="25" mask="url(#c)" rx="214.5" ry="185.968"/><ellipse cx="535.5" cy="640.5" fill="#015064" stroke="#00A8B8" stroke-width="25" mask="url(#c)" rx="214.5" ry="185.968"/><ellipse cx="81.5" cy="676.5" fill="#015064" stroke="#007782" stroke-width="25" mask="url(#c)" rx="214.5" ry="185.968"/><ellipse cx="535.5" cy="676.5" fill="#015064" stroke="#007782" stroke-width="25" mask="url(#c)" rx="214.5" ry="185.968"/><g mask="url(#c)"><path fill="url(#d)" stroke="#6E3A00" stroke-width="6.088" d="M98.318 88.007c7.691 37.104 16.643 72.442 26.856 106.013 10.212 33.571 25.57 68.934 46.07 106.088l-51.903 11.67c-10.057-60.01-17.232-99.172-21.525-117.487-4.293-18.315-10.989-51.434-20.089-99.357l20.591-6.927" transform="scale(-1 1) rotate(25 -300.37 -553.013)"/><g stroke="#2F8A00"><path fill="url(#e)" stroke-width="9.343" d="M108.544 66.538s-13.54-21.305-37.417-27.785c-15.917-4.321-33.933.31-54.048 13.892C33.464 65.975 47.24 73.52 58.405 75.28c16.749 2.64 50.14-8.74 50.14-8.74Z" transform="rotate(1 -6061.691 5926.397)"/><path fill="url(#f)" stroke-width="9.343" d="M108.544 67.138s-47.187-5.997-81.077 19.936C4.873 104.362-3.782 137.794 1.502 187.369c28.42-29.22 48.758-50.836 61.016-64.846 18.387-21.016 46.026-55.385 46.026-55.385Z" transform="rotate(1 -6061.691 5926.397)"/><path fill="url(#g)" stroke-width="9.343" d="M108.544 66.538c-1.96-21.705 3.98-38.018 17.82-48.94C140.203 6.674 154.85.808 170.303 0c-4.865 21.527-12.373 36.314-22.524 44.361-10.151 8.048-23.23 15.44-39.236 22.177Z" transform="rotate(1 -6061.691 5926.397)"/><path fill="url(#h)" stroke-width="9.343" d="M108.544 67.138c29.838-31.486 61.061-42.776 93.669-33.869C234.82 42.176 253.749 60.785 259 89.096c-34.898-3.657-59.974-6.343-75.228-8.058-15.254-1.716-40.33-6.349-75.228-13.9Z" transform="rotate(1 -6061.691 5926.397)"/><path fill="url(#i)" stroke-width="9.343" d="M108.544 67.138c34.868-9.381 64.503-3.658 88.905 17.17 24.402 20.829 39.656 46.686 45.762 77.571-39.626-7.574-68.4-20.115-86.322-37.624a395.051 395.051 0 0 1-48.345-57.117Z" transform="rotate(1 -6061.691 5926.397)"/><path fill="url(#j)" stroke-width="9.343" d="M108.544 67.138C76.206 82.6 57.608 105.366 52.75 135.436c-4.858 30.07-.292 62.89 13.698 98.462 24.873-41.418 38.905-71.368 42.096-89.849 3.191-18.48 3.191-44.118 0-76.91Z" transform="rotate(1 -6061.691 5926.397)"/><path stroke-linecap="round" stroke-width="5.91" d="M211.284 173.477c-13.851 21.992-23.291 42.022-28.32 60.093-5.03 18.071-8.175 33.143-9.436 45.216"/><path stroke-linecap="round" stroke-width="5.91" d="M209.814 176.884c-23.982 2.565-42.792 10.469-56.428 23.714-13.639 13.245-23.483 26.136-29.536 38.674M219.045 167.299c29.028-7.723 50.972-10.173 65.831-7.352 14.859 2.822 26.807 7.659 35.842 14.51M211.31 172.618c20.29 9.106 38.353 19.052 54.186 29.837 15.833 10.786 27.714 20.99 35.643 30.617"/></g><path stroke="#830305" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="6.937" d="m409.379 398.157-23.176 18.556M328.04 375.516l-22.313 28.398M312.904 353.698l53.18 59.816"/><path fill="url(#k)" d="M67.585 27.463H5.68C1.893 28.148 0 30.38 0 34.16c0 3.78 1.893 6.211 5.68 7.293h67.17l41.751-30.356c2.488-2.646 2.794-5.315.92-8.006s-4.6-3.626-8.177-2.803l-39.76 27.174Z" transform="scale(-1 1) rotate(-9 2092.128 2856.854)"/><path fill="#D8D8D8" stroke="#FFF" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="4.414" d="m402.861 391.51.471-4.088M382.21 388.752l.472-4.087M361.546 385.404l.485-3.845M337.59 371.883l2.56-2.498M324.276 359.567l2.56-2.497"/></g><ellipse cx="308.5" cy="720.5" fill="url(#l)" mask="url(#c)" rx="266" ry="316.5"/><ellipse cx="308.5" cy="720.5" stroke="#6DA300" stroke-opacity=".502" stroke-width="26" mask="url(#c)" rx="253" ry="303.5"/><g mask="url(#c)"><g transform="translate(389 -32)"><circle cx="168.5" cy="113.5" r="113.5" fill="url(#m)"/><circle cx="168.5" cy="113.5" r="106" stroke="#FFC900" stroke-opacity=".529" stroke-width="15"/><path stroke="url(#n)" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="12" d="M30 113H0"/><path stroke="url(#o)" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="12" d="M33.5 79.5 7 74"/><path stroke="url(#p)" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="12" d="m34 146-29 8"/><path stroke="url(#q)" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="12" d="m45 177-24 13"/><path stroke="url(#r)" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="12" d="m67 204-20 19"/><path stroke="url(#s)" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="12" d="m94.373 227-13.834 22.847"/><path stroke="url(#t)" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="12" d="M127.5 243.5 120 268"/><path stroke="url(#u)" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="12" d="m167.5 252.5.5 24.5"/></g></g><circle cx="307.5" cy="308.5" r="304" stroke="#000" stroke-width="25"/></g></svg>    `,
    url: "https://tanstack.com/query/v5",
    color: "from-[#3B82F6] to-[#1D4ED8]",
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
