'use client'

import * as React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  children: React.ReactNode
  className?: string
}

export function MobileNav({ children, className }: MobileNavProps) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <div className={cn("flex flex-col gap-2 w-full", className)}>
        {children}
      </div>
    )
  }
  
  return (
    <div className={cn("flex gap-2", className)}>
      {children}
    </div>
  )
}

interface MobileButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode
}

export function MobileButton({ children, className, ...props }: MobileButtonProps) {
  const isMobile = useIsMobile()
  
  return (
    <Button 
      className={cn(
        isMobile ? "w-full min-h-[44px]" : "",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

interface MobileGridProps {
  children: React.ReactNode
  className?: string
  cols?: number
}

export function MobileGrid({ children, className, cols = 2 }: MobileGridProps) {
  const isMobile = useIsMobile()
  
  const gridClass = isMobile 
    ? "grid grid-cols-1 gap-3"
    : `grid grid-cols-1 md:grid-cols-${cols} lg:grid-cols-${Math.min(cols * 2, 4)} gap-4`
  
  return (
    <div className={cn(gridClass, className)}>
      {children}
    </div>
  )
}

interface MobileHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export function MobileHeader({ title, subtitle, actions, className }: MobileHeaderProps) {
  const isMobile = useIsMobile()
  
  return (
    <div className={cn(
      "flex gap-4",
      isMobile ? "flex-col items-start" : "flex-row items-center justify-between",
      className
    )}>
      <div>
        <h1 className={cn(
          "font-bold tracking-tight",
          isMobile ? "text-xl" : "text-2xl md:text-3xl"
        )}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn(
            "text-muted-foreground",
            isMobile ? "text-sm" : "text-base"
          )}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className={cn(
          isMobile ? "w-full" : "flex-shrink-0"
        )}>
          {actions}
        </div>
      )}
    </div>
  )
}

interface MobileSearchProps extends React.ComponentProps<'input'> {
  placeholder?: string
}

export function MobileSearch({ placeholder = "Search...", className, ...props }: MobileSearchProps) {
  const isMobile = useIsMobile()
  
  return (
    <input
      type="search"
      placeholder={placeholder}
      className={cn(
        "flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        isMobile ? "w-full mb-4" : "w-64",
        className
      )}
      {...props}
    />
  )
}