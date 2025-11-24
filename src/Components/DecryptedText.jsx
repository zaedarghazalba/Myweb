import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export default function DecryptedText({ text, className }) {
    const [displayText, setDisplayText] = useState('');
    const [isScrambling, setIsScrambling] = useState(true);

    useEffect(() => {
        let iteration = 0;
        const maxIterations = text.length;
        const intervalDuration = 30; // ms per frame

        const interval = setInterval(() => {
            setDisplayText((prev) => {
                return text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('');
            });

            if (iteration >= maxIterations) {
                clearInterval(interval);
                setIsScrambling(false);
            }

            iteration += 1 / 3; // Slower reveal speed
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.h1
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.h1>
    );
}
