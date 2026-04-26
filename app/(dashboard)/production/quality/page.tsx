import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, FileText, Scale } from "lucide-react"
import Link from "next/link"

// Mock quality control data
const qualityTests = [
  {
    id: "1",
    batch_number: "B2024-045",
    product_type: "Premium Basmati",
    test_date: "2024-04-24T10:30:00Z",
    tested_by: "Quality Team A",
    moisture_content: "12.3%",
    foreign_matter: "0.02%",
    broken_grains: "1.5%",
    chalky_grains: "2.1%",
    overall_grade: "A+",
    status: "passed",
    certificate_issued: true,
    notes: "Excellent quality, meets export standards",
  },
  {
    id: "2",
    batch_number: "B2024-046",
    product_type: "Standard Rice IRRI-6",
    test_date: "2024-04-24T14:15:00Z",
    tested_by: "Quality Team B",
    moisture_content: "13.1%",
    foreign_matter: "0.05%",
    broken_grains: "3.2%",
    chalky_grains: "4.8%",
    overall_grade: "A",
    status: "passed",
    certificate_issued: true,
    notes: "Good quality for domestic market",
  },
  {
    id: "3",
    batch_number: "B2024-047",
    product_type: "Parboiled Rice",
    test_date: "2024-04-24T16:45:00Z",
    tested_by: "Quality Team A",
    moisture_content: "14.2%",
    foreign_matter: "0.08%",
    broken_grains: "5.1%",
    chalky_grains: "6.2%",
    overall_grade: "B+",
    status: "conditional",
    certificate_issued: false,
    notes: "Requires additional drying before packaging",
  },
  {
    id: "4",
    batch_number: "B2024-048",
    product_type: "Broken Rice",
    test_date: "2024-04-24T09:20:00Z",
    tested_by: "Quality Team B",
    moisture_content: "15.8%",
    foreign_matter: "0.12%",
    broken_grains: "85.0%",
    chalky_grains: "8.5%",
    overall_grade: "C",
    status: "failed",
    certificate_issued: false,
    notes: "Excessive moisture content, needs re-processing",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "passed":
      return <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Passed
      </Badge>
    case "conditional":
      return <Badge className="bg-warning/10 text-warning-foreground border-warning/20">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Conditional
      </Badge>
    case "failed":
      return <Badge variant="destructive">
        <XCircle className="w-3 h-3 mr-1" />
        Failed
      </Badge>
    case "pending":
      return <Badge variant="outline">
        <Scale className="w-3 h-3 mr-1" />
        Pending
      </Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getGradeBadge(grade: string) {
  const colors: Record<string, string> = {
    "A+": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    "A": "bg-green-500/10 text-green-600 border-green-500/20",
    "B+": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    "B": "bg-orange-500/10 text-orange-600 border-orange-500/20",
    "C": "bg-red-500/10 text-red-600 border-red-500/20",
  }
  return (
    <Badge variant="outline" className={colors[grade] || ""}>
      {grade}
    </Badge>
  )
}

export default function QualityControlPage() {
  const stats = [
    { 
      title: "Tests Today", 
      value: qualityTests.filter(test => 
        new Date(test.test_date).toDateString() === new Date().toDateString()
      ).length, 
      icon: ShieldCheck, 
      color: "bg-primary" 
    },
    { 
      title: "Passed Tests", 
      value: qualityTests.filter(test => test.status === 'passed').length, 
      icon: CheckCircle2, 
      color: "bg-success" 
    },
    { 
      title: "Failed Tests", 
      value: qualityTests.filter(test => test.status === 'failed').length, 
      icon: XCircle, 
      color: "bg-destructive" 
    },
    { 
      title: "Certificates Issued", 
      value: qualityTests.filter(test => test.certificate_issued).length, 
      icon: FileText, 
      color: "bg-chart-2" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quality Control</h1>
          <p className="text-muted-foreground">
            Monitor rice quality testing and certification
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Quality Test
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat.color}/10`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.replace("bg-", "text-")}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quality Tests Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Quality Test Results</CardTitle>
              <CardDescription>Recent quality control tests and certifications</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search batch numbers..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch</TableHead>
                <TableHead>Product Type</TableHead>
                <TableHead>Test Date</TableHead>
                <TableHead>Quality Metrics</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Certificate</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{test.batch_number}</p>
                        <p className="text-sm text-muted-foreground">
                          {test.tested_by}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{test.product_type}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(test.test_date).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      <div>Moisture: <span className="font-medium">{test.moisture_content}</span></div>
                      <div>Foreign Matter: <span className="font-medium">{test.foreign_matter}</span></div>
                      <div>Broken: <span className="font-medium">{test.broken_grains}</span></div>
                    </div>
                  </TableCell>
                  <TableCell>{getGradeBadge(test.overall_grade)}</TableCell>
                  <TableCell>{getStatusBadge(test.status)}</TableCell>
                  <TableCell>
                    {test.certificate_issued ? (
                      <Badge className="bg-success/10 text-success border-success/20">
                        <FileText className="w-3 h-3 mr-1" />
                        Issued
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/production/quality/${test.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          Download Certificate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Scale className="w-4 h-4 mr-2" />
                          Retest Batch
                        </DropdownMenuItem>
                        {test.status === 'conditional' && (
                          <DropdownMenuItem>
                            Approve Conditionally
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}