import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.jpg";
import {
  BookOpen,
  Heart,
  Clock,
  MessageSquare,
  Phone,
  LogOut,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAdminCheck();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username, church_branch")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUsername(profile.username);
        setBranch(profile.church_branch);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", icon: Sunrise };
    if (hour < 17) return { text: "Good afternoon", icon: Sun };
    if (hour < 20) return { text: "Good evening", icon: Sunset };
    return { text: "Good night", icon: Moon };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "May God's peace be with you.",
    });
    navigate("/auth");
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <h1 className="font-bold text-lg">TGLW Global</h1>
              <p className="text-xs text-muted-foreground">{branch}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Greeting Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-none shadow-card">
          <div className="flex items-center gap-3 mb-2">
            <GreetingIcon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              {greeting.text}, {username}!
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">You are loved. ❤️</p>
        </Card>

        {/* Today's Schedule */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Today's Schedule</h3>
          <div className="grid gap-4">
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Morning Devotional</p>
                    <p className="text-sm text-muted-foreground">10:00 AM</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Meditation Time</p>
                    <p className="text-sm text-muted-foreground">3:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Prayer Time</p>
                    <p className="text-sm text-muted-foreground">6:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => navigate("/prayer-timer")}
            >
              <Clock className="w-8 h-8" />
              <span>Prayer Timer</span>
            </Button>

            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => navigate("/prayer-request")}
            >
              <MessageSquare className="w-8 h-8" />
              <span>Prayer Request</span>
            </Button>

            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => navigate("/contact")}
            >
              <Phone className="w-8 h-8" />
              <span>Contact Us</span>
            </Button>

            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => navigate("/about")}
            >
              <BookOpen className="w-8 h-8" />
              <span>About</span>
            </Button>

            {isAdmin && (
              <Button
                variant="default"
                className="h-24 flex-col gap-2 col-span-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate("/admin")}
              >
                <Shield className="w-8 h-8" />
                <span>Admin Dashboard</span>
              </Button>
            )}
          </div>
        </section>

        {/* Daily Affirmation */}
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-none text-center">
          <p className="text-lg font-medium text-foreground italic">
            "You are chosen. You are loved. God's grace surrounds you today."
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
