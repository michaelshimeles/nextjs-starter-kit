import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Image from "next/image";

export function OrbitingCirclesComponent() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Build Fast
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="h-[30px] w-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Icons.typescript />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[30px] w-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Icons.tailwind />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        reverse
        radius={190}
        duration={20}
      >
        <Icons.nextjs />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        reverse
        radius={190}
        duration={20}
        delay={20}
      >
        <Icons.supabase />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  typescript: (props: IconProps) => (
    <Image src="https://utfs.io/f/5b51351d-218b-4931-a296-0a9275030aaf-8myeez.png" alt=""
      width={100}
      height={100}
    />
  ),
  tailwind: (props: IconProps) => (
    <Image src="https://utfs.io/f/666774c0-dc3a-4d5a-84b7-cc96e682db61-bhgw4o.png" alt=""
      width={100}
      height={100}
    // className="bg-black p-2 rounded"
    />
  ),
  supabase: (props: IconProps) => (
    <Image src="https://utfs.io/f/c62a5d13-91e4-476f-9d36-786d9995c97f-rqpuxo.png" alt=""
      width={100}
      height={100}
    // className="bg-black p-2 rounded"
    />
  ),
  nextjs: (props: IconProps) => (
    <Image src="https://utfs.io/f/a8df6965-e6df-417a-ab0b-b3ad33d701d7-hcfblw.png" alt=""
      width={100}
      height={100}
      className="bg-white p-1 rounded"
    />
  ),
};
