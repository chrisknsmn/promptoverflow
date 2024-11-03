import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold">Next Template</h1>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* About */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Service {i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    This is a brief description of Service {i}. It explains the key benefits and features of this particular service offering.
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Callout */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
                <p className="mb-6">Sign up for our newsletter to receive updates and special offers.</p>
                <form className="max-w-md mx-auto space-y-4">
                  <Input type="email" placeholder="Enter your email" required />
                  <Button type="submit" className="w-full">Subscribe</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
