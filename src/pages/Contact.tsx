import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Mail, Phone } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  const whatsappNumber = "+1234567890"; // Replace with actual number
  const email = "contact@tglwglobal.com"; // Replace with actual email
  const phone = "+1234567890"; // Replace with actual number

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Contact Us</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              We're Here For You
            </h2>
            <p className="text-muted-foreground">
              Reach out to us anytime. We'd love to hear from you.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-auto py-6 justify-start"
              onClick={handleWhatsApp}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    Message us on WhatsApp
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full h-auto py-6 justify-start"
              onClick={handleEmail}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full h-auto py-6 justify-start"
              onClick={handleCall}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Call Us</p>
                  <p className="text-sm text-muted-foreground">{phone}</p>
                </div>
              </div>
            </Button>
          </div>

          {/* Office Hours */}
          <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
            <h3 className="font-semibold text-foreground mb-4">Office Hours</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">After Service</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground italic">
              "May the Lord bless you and keep you"
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Contact;
