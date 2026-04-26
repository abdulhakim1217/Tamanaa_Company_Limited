import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wheat } from "lucide-react"
import Link from "next/link"

export default function RawMaterialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Raw Materials</h1>
          <p className="text-muted-foreground">
            Manage raw rice materials and inventory
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wheat className="w-5 h-5" />
            Raw Materials Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This page is under development. Please use the Raw Rice Stock page in Inventory for now.
          </p>
          <Button asChild>
            <Link href="/inventory/raw-materials">
              Go to Raw Rice Stock
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}