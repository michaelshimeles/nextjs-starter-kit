import { ArrowRight, Github } from 'lucide-react';
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from 'next/image';
import { TITLE_TAILWIND_CLASS } from '@/utils/constants';

export default function HeroSection() {
    return (
        <div className='flex flex-col justify-center items-center flex-wrap px-4 pt-4 gap-4'>
            <h3>Welcome in Hero Section</h3>
        </div>
    )
}
