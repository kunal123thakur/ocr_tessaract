import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={clsx(
        'rounded-xl border border-gray-200 dark:border-gray-700 p-6',
        glass 
          ? 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-xl' 
          : 'bg-white dark:bg-gray-800 shadow-lg',
        hover && 'cursor-pointer transition-all duration-300 hover:shadow-xl',
        className
      )}
    >
      {children}
    </motion.div>
  );
};