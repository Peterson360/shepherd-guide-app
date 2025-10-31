import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, MapPin, Users } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">About Us</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Church Info */}
        <Card className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">TGLW Global</h2>
              <p className="text-muted-foreground">The Gospel Living Word</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To spread the Gospel of Jesus Christ and empower believers to live
                transformed lives through the power of God's Word. We are committed to
                building a global community of faith, hope, and love.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a beacon of light in the world, reaching souls across all nations,
                and establishing churches that reflect God's glory. We envision a world
                where every person experiences the transforming love of Christ.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Our Location
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                With branches across multiple cities and countries, TGLW Global is
                building a worldwide family of believers. Visit your local branch to
                experience worship, fellowship, and spiritual growth.
              </p>
            </div>
          </div>
        </Card>

        {/* Man of God */}
        <Card className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Leadership</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
                MG
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Pastor [Name]
                </h3>
                <p className="text-sm text-muted-foreground">
                  Senior Pastor & Founder
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Called by God and anointed to lead His people, our pastor has dedicated
              their life to serving the Kingdom. With a heart for souls and a passion
              for God's Word, they have been instrumental in transforming countless lives
              and building a thriving community of faith.
            </p>

            <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
              <p className="text-sm text-foreground italic">
                "My prayer is that you would encounter God's love in a fresh way and
                experience the abundant life Jesus promised."
              </p>
            </div>
          </div>
        </Card>

        {/* Developer Credit */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
          <p className="text-sm text-muted-foreground">
            Developed with ❤️ by{" "}
            <span className="font-semibold text-foreground">Zakaria Sisu</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built to serve the Kingdom of God
          </p>
        </Card>
      </main>
    </div>
  );
};

export default About;
