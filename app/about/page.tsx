import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Emily Chen",
      role: "Lead Veterinarian",
      expertise: "Dairy Cattle Specialist",
      image: "/professional-woman-veterinarian.jpg",
    },
    {
      name: "Prof. Michael Rodriguez",
      role: "AI Research Director",
      expertise: "Machine Learning & Computer Vision",
      image: "/professional-man-researcher.png",
    },
    {
      name: "Sarah Thompson",
      role: "Agricultural Consultant",
      expertise: "Livestock Management",
      image: "/professional-woman-farmer.jpg",
    },
  ]

  const features = [
    {
      title: "Advanced AI Recognition",
      description: "State-of-the-art machine learning algorithms trained on thousands of breed images",
      icon: "🤖",
    },
    {
      title: "Comprehensive Database",
      description: "Detailed information on over 200 cow and buffalo breeds worldwide",
      icon: "📚",
    },
    {
      title: "Professional Accuracy",
      description: "95%+ accuracy rate validated by veterinary professionals",
      icon: "🎯",
    },
    {
      title: "Real-time Analysis",
      description: "Get instant breed identification results in seconds",
      icon: "⚡",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">BreedID</h1>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            About BreedID
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Revolutionizing Livestock <span className="text-primary">Breed Identification</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto">
            BreedID combines cutting-edge artificial intelligence with decades of veterinary expertise to provide the
            most accurate and comprehensive breed identification platform for farmers, veterinarians, and agricultural
            professionals worldwide.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We believe that accurate breed identification is fundamental to successful livestock management. Our
                  mission is to democratize access to professional-grade breed identification tools, empowering farmers
                  and veterinarians with the knowledge they need to make informed decisions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By leveraging advanced AI technology and comprehensive breed databases, we're making it easier than
                  ever to identify breeds, understand their characteristics, and optimize livestock management
                  practices.
                </p>
              </div>
              <div className="relative">
                <img src="/diverse-cows-and-buffaloes-in-pastoral-setting.jpg" alt="Diverse cattle breeds" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose BreedID?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines the latest in AI technology with expert veterinary knowledge to deliver unparalleled
              accuracy and comprehensive breed information.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of veterinarians, AI researchers, and agricultural experts work together to bring you the
              most accurate breed identification platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img src="/ai-technology-neural-network-visualization.jpg" alt="AI Technology" className="rounded-lg shadow-lg" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Advanced Technology</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our AI models are trained on extensive datasets containing thousands of images from hundreds of
                  breeds. Using deep learning and computer vision techniques, we achieve industry-leading accuracy in
                  breed identification.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Convolutional Neural Networks (CNNs)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Transfer Learning from ImageNet</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Continuous Model Improvement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Real-time Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of professionals who trust BreedID for accurate breed identification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link href="/home">
              <Button variant="outline" size="lg">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">B</span>
                </div>
                <span className="font-semibold">BreedID</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional breed identification platform for the modern agricultural industry.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/home" className="block hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="/about" className="block hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="#" className="block hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="#" className="block hover:text-foreground transition-colors">
                  Help Center
                </Link>
                <Link href="#" className="block hover:text-foreground transition-colors">
                  Contact
                </Link>
                <Link href="#" className="block hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="#" className="block hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="block hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 BreedID. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
