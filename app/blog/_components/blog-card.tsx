import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ info }: any) {
  return (
    <Link key={info?.id} href={`/blog/${info?.slug}`}>
      <article
        className="flex flex-col space-y-2 p-4 rounded-md border"
      >
        <Image
          src={info?.image}
          alt={""}
          width={804}
          height={452}
          className="rounded-md border bg-muted transition-colors"
        />
        <div className='flex lg:flex-row w-full justify-between items-center'>
          <h2 className="text-lg lg:text-2xl font-bold">{info?.title}</h2>
        </div>
        <p className="text-muted-foreground">{info?.subtitle}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(info?.created_at)?.toLocaleDateString()}
        </p>
      </article>
    </Link>)
}
