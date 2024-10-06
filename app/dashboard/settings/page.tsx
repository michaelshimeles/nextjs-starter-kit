"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import config from '@/config';
import { useUser } from '@clerk/nextjs'

export default function Settings() {
  let user = null;

  if (config?.auth?.enabled) {
      user = useUser();
  }

  return (
    <div className='flex justify-start items-center flex-wrap px-4 pt-5 gap-4'>
      <div className="flex flex-col gap-3 mb-[5rem] w-full max-w-[700px]">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 w-full text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          My Profile
        </h2>
        <div className='flex w-full gap-3 mt-3'>
          <div className='flex flex-col gap-3 w-full'>
            <Label>First Name</Label>
            <Input disabled defaultValue={user?.user?.firstName ? user?.user?.firstName : ""} />
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <Label>Last Name</Label>
            <Input disabled defaultValue={user?.user?.lastName ? user?.user?.lastName : ""} />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-3'>
            <Label>E-mail</Label>
            <Input disabled defaultValue={user?.user?.emailAddresses?.[0]?.emailAddress!} />
          </div>
        </div>
      </div>
    </div>
  )
}
