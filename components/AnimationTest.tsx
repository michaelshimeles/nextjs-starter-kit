"use client"
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const AnimationTest = () => {
    const spinTransition = {
        loop: Infinity, // Loop infinitely
        ease: "linear", // Linear animation
        duration: 0.4, // Duration for one complete 360 degree rotation
        repeat: 60 / 2 // Repeat the animation for 1 minute (60 seconds / 2 seconds per rotation)
    };

    const handleTap = (event: any, info: any) => {
        // Start the continuous rotation animation here
        event.target.style.transition = `transform ${spinTransition.duration * spinTransition.repeat}s linear`;
        event.target.style.transform = `rotate(${360 * spinTransition.repeat}deg)`;
    };

    return (
        <motion.div
            // whileTap={{ scale: 1.1 }}
            // onTap={handleTap}
            drag={true}
        >
            <Button >Drag or Click Me</Button>
        </motion.div>
    );
}

export default AnimationTest;
