import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { BarChartComponent } from './_components/bar-chart'
import { BarChartBetter } from './_components/bar-chart-better'

export default async function Dashboard() {


  return (
    <div className='flex flex-col justify-center items-start flex-wrap px-4 pt-4 gap-4'>
      <h3>WElcome in DASHBOARD</h3>
    </div>
  )
}
