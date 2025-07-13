import React from 'react';
import { cn } from '~/lib/utils';

type HeadingProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ variant = 'h3', children, className = '' }: HeadingProps) {
  const Tag = variant;

  const styles: Record<string, string> = {
    h1: 'text-4xl font-bold',
    h2: 'font-bold text-black-200 text-[32px]',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
  };

  return <Tag className={cn(`${styles[variant]}`, className)}>{children}</Tag>;
}
