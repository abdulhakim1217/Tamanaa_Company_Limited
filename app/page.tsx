import { redirect } from "next/navigation"

export default async function HomePage() {
  // Redirect to dashboard in standalone mode
  redirect("/dashboard")
}
