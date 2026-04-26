import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, Calendar } from "lucide-react"

export default function ProductionReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Production Reports</h1>
          <p className="text-muted-foreground">
            View and download production analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Select Period
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Production Analytics
          </CardTitle>
          <CardDescription>
            Comprehensive production reports and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Production reports and analytics dashboard coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}