'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { useIsMobile } from '@/components/ui/use-mobile'

interface Column<T> {
  key: keyof T
  header: string
  className?: string
  mobileHidden?: boolean
  mobileLabel?: string
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  renderCell?: (column: Column<T>, value: any, item: T) => React.ReactNode
  mobileCardRender?: (item: T, index: number) => React.ReactNode
}

export function ResponsiveTable<T extends Record<string, any>>({
  data,
  columns,
  className,
  renderCell,
  mobileCardRender
}: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile()

  if (isMobile && mobileCardRender) {
    return (
      <div className="space-y-4">
        {data.map((item, index) => mobileCardRender(item, index))}
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <Card key={index} className="p-4">
            <CardContent className="p-0 space-y-3">
              {columns
                .filter(col => !col.mobileHidden)
                .map((column) => (
                  <div key={String(column.key)} className="flex justify-between items-start">
                    <span className="text-sm font-medium text-muted-foreground min-w-0 flex-1">
                      {column.mobileLabel || column.header}:
                    </span>
                    <span className="text-sm font-medium text-right min-w-0 flex-1">
                      {renderCell 
                        ? renderCell(column, item[column.key], item)
                        : String(item[column.key] || '-')
                      }
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn('w-full caption-bottom text-sm', className)}>
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={cn(
                  'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b transition-colors hover:bg-muted/50">
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={cn('p-4 align-middle', column.className)}
                >
                  {renderCell 
                    ? renderCell(column, item[column.key], item)
                    : String(item[column.key] || '-')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}