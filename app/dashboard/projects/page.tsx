import { Button } from '@/components/ui/button'
import React from 'react'

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            You have no projects
          </h1>
          <p className="text-sm text-muted-foreground mb-3">
            Projects will show when you start using Nextjs Starter Kit
          </p>
          <Button>Create Project</Button>
        </div>
      </div>
    </main>)
}
