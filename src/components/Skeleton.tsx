import { VariantProps, cva } from 'class-variance-authority'
import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const skeletonVariants = cva(['animate-pulse rounded-sm w-full min-h-[1rem]'], {
  variants: {
    bg: {
      dark600: ['dark:bg-gray-600'],
      dark700: ['dark:bg-gray-700'],
      dark800: ['dark:bg-gray-800'],
    },
  },
  defaultVariants: {
    bg: 'dark700',
  },
})

type SkeletonProps = {
  className?: string
  children?: ReactNode
} & VariantProps<typeof skeletonVariants>

export const Skeleton: FC<SkeletonProps> = ({ className, children, bg }) => {
  return (
    <div className={twMerge(skeletonVariants({ bg, className }), className)}>
      {children}
    </div>
  )
}
