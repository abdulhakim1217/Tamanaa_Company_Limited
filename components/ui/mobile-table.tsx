'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

interface MobileTableProps {
  children: React.ReactNode
  className?: string
}

export function MobileTable({ children, className }: MobileTableProps) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <div className={cn("space-y-3", className)}>
        {children}
      </div>
    )
  }
  
  return (
    <div className={cn("table-container overflow-x-auto", className)}>
      <table className="w-full caption-bottom text-sm">
        {children}
      </table>
    </div>
  )
}

interface MobileTableRowProps {
  children: React.ReactNode
  className?: string
  mobileCard?: React.ReactNode
}

export function MobileTableRow({ children, className, mobileCard }: MobileTableRowProps) {
  const isMobile = useIsMobile()
  
  if (isMobile && mobileCard) {
    return <>{mobileCard}</>
  }
  
  if (isMobile) {
    return (
      <Card className="p-3">
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
    )
  }
  
  return (
    <tr className={cn("border-b transition-colors hover:bg-muted/50", className)}>
      {children}
    </tr>
  )
}

interface MobileTableCellProps {
  children: React.ReactNode
  className?: string
  label?: string
  hideOnMobile?: boolean
}

export function MobileTableCell({ children, className, label, hideOnMobile }: MobileTableCellProps) {
  const isMobile = useIsMobile()
  
  if (isMobile && hideOnMobile) {
    return null
  }
  
  if (isMobile && label) {
    return (
      <div className="flex justify-between items-center py-1">
        <span className="text-sm font-medium text-muted-foreground">{label}:</span>
        <span className="text-sm font-medium">{children}</span>
      </div>
    )
  }
  
  if (isMobile) {
    return <div className="py-1">{children}</div>
  }
  
  return (
    <td className={cn("p-4 align-middle", className)}>
      {children}
    </td>
  )
}

export function MobileTableHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return null
  }
  
  return (
    <thead className={className}>
      <tr className="border-b">
        {children}
      </tr>
    </thead>
  )
}

export function MobileTableHead({ children, className }: { children: React.ReactNode, className?: string }) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return null
  }
  
  return (
    <th className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground", className)}>
      {children}
    </th>
  )
}

export function MobileTableBody({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  )
}