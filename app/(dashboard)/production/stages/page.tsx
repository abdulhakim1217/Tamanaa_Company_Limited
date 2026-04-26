import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Droplets, Sparkles, Package, CheckCircle2 } from "lucide-react"

const processingStages = [
  {
    id: 1,
    name: "Cleaning & Pre-cleaning",
    description: "Remove impurities, stones, and foreign materials",
    icon: Droplets,
    status: "active",
    duration: "15-20 min",
  },
  {
    id: 2,
    name: "Hulling",
    description: "Remove outer husk from paddy rice",
    icon: Scale,
    status: "active",
    duration: "10-15 min",
  },
  {
    id: 3,
    name: "Whitening & Polishing",
    description: "Remove bran layer and polish rice grains",
    icon: Sparkles,
    status: "active",
    duration: "20-25 min",
  },
  {
    id: 4,
    name: "Grading & Sorting",
    description: "Separate rice by size and quality",
    icon: Scale,
    status: "active",
    duration: "15-20 min",
  },
  {
    id: 5,
    name: "Packaging",
    description: "Pack rice into bags of various sizes",
    icon: Package,
    status: "active",
    duration: "10-15 min",
  },
]

export default function ProcessingStagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Processing Stages</h1>
          <p className="text-muted-foreground">
            Rice processing workflow and stages
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {processingStages.map((stage) => (
          <Card key={stage.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <stage.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{stage.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{stage.duration}</p>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {stage.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{stage.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}