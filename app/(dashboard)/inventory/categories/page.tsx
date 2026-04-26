import { getProductCategories } from "@/lib/database"
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
import { Plus, Search, MoreHorizontal, Tags, Package, FolderTree } from "lucide-react"
import Link from "next/link"

export default async function CategoriesPage() {
  // Fetch real data from database
  let categories
  try {
    categories = await getProductCategories()
  } catch (error) {
    console.error("Error fetching categories:", error)
    // Fallback to mock data if database is not set up
    categories = [
      {
        id: "1",
        name: "Electronics",
        description: "Electronic devices and accessories",
        product_count: 45,
        parent_name: null,
      },
      {
        id: "2",
        name: "Office Supplies",
        description: "Office consumables and supplies",
        product_count: 128,
        parent_name: null,
      },
      {
        id: "3",
        name: "Furniture",
        description: "Office and home furniture",
        product_count: 23,
        parent_name: null,
      },
    ]
  }

  const stats = [
    { 
      title: "Total Categories", 
      value: categories.length, 
      icon: Tags, 
      color: "bg-primary" 
    },
    { 
      title: "Products Categorized", 
      value: categories.reduce((sum: number, c: any) => sum + (c.product_count || 0), 0), 
      icon: Package, 
      color: "bg-success" 
    },
    { 
      title: "Root Categories", 
      value: categories.filter((c: any) => !c.parent_name).length, 
      icon: FolderTree, 
      color: "bg-chart-2" 
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Categories</h1>
          <p className="text-muted-foreground">
            Organize your products into categories
          </p>
        </div>
        <Button asChild>
          <Link href="/inventory/categories/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
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

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Categories</CardTitle>
              <CardDescription>{categories.length} categories configured</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: any) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                        <Tags className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">
                      {category.description || 'No description'}
                    </p>
                  </TableCell>
                  <TableCell>
                    {category.parent_name ? (
                      <Badge variant="outline">{category.parent_name}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Root Category</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{category.product_count || 0}</span>
                    </div>
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
                          <Link href={`/inventory/categories/${category.id}`}>
                            View Products
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/inventory/categories/${category.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Add Subcategory
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
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