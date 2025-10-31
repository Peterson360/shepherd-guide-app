import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

const PrayerRequest = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to submit a prayer request.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from("prayer_requests").insert({
        user_id: user.id,
        name: name.trim(),
        message: message.trim(),
      });

      if (error) throw error;

      toast({
        title: "Prayer request submitted",
        description: "Thank you! We're praying with you. 🙏",
      });

      setName("");
      setMessage("");
      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Prayer Request</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Share Your Prayer Request
            </h2>
            <p className="text-muted-foreground">
              We believe in the power of prayer. Let us pray with you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Prayer Request</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Share what's on your heart..."
                rows={8}
                maxLength={1000}
              />
              <p className="text-sm text-muted-foreground text-right">
                {message.length}/1000 characters
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Prayer Request
                </>
              )}
            </Button>
          </form>

          {/* Encouraging Message */}
          <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg text-center">
            <p className="text-sm text-foreground italic">
              "The prayer of a righteous person is powerful and effective."
              <br />
              <span className="text-xs text-muted-foreground">- James 5:16</span>
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PrayerRequest;
