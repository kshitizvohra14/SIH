import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StartingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AGRI AI
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Login
              </Link>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 shadow-lg text-white">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-primary text-white border-0 px-4 py-2">🤖 AI-Powered Breed Identification</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Identify Cow & Buffalo Breeds with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Precision
            </span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Professional AI-powered breed identification platform designed for farmers, veterinarians, and agricultural
            students. Get instant breed analysis with detailed trait information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/home">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-all text-white"
              >
                🚀 Start Identifying
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary/30 hover:bg-primary/5 text-primary bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-primary">AGRI AI</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🔍</span>
                  </div>
                  AI-Powered Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Advanced machine learning algorithms analyze images to provide accurate breed identification with
                  detailed trait information including milk capacity and physical characteristics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  Comprehensive Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access detailed information about hundreds of cow and buffalo breeds, including milk production
                  capacity, physical traits, origin, and breeding recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  Professional Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Designed for farmers, veterinarians, and agricultural students with professional-grade accuracy and
                  detailed breed analysis for informed decision-making.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            Join thousands of farmers and veterinarians who trust{" "}
            <span className="text-primary font-semibold">AGRI AI</span> for accurate breed identification.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-all text-white"
            >
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AGRI AI
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
