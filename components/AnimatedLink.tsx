"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';

const AnimatedLink = ({ href, children, ...rest }: any) => {
    const variants = {
        initial: { scale: 1 },
        animate: { scale: 1.1 },
        exit: { scale: 1 }
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        const section = document.querySelector(href);
        section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Link href={href} passHref>
            <motion.a
                onClick={handleClick}
                variants={variants}
                initial="initial"
                whileHover="animate"
                exit="exit"
                {...rest}
            >
                {children}
            </motion.a>
        </Link>
    );
};

export default AnimatedLink;
