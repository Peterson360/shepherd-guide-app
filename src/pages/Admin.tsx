import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Book, Video, FileText, LogOut } from "lucide-react";
import { PrayerRequestsManager } from "@/components/admin/PrayerRequestsManager";
import { DevotionalsManager } from "@/components/admin/DevotionalsManager";
import { MediaLinksManager } from "@/components/admin/MediaLinksManager";
import { AboutContentManager } from "@/components/admin/AboutContentManager";
import { UsersManager } from "@/components/admin/UsersManager";

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdminCheck();
  const [stats, setStats] = useState({
    users: 0,
    prayerRequests: 0,
    devotionals: 0,
    mediaLinks: 0
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      const [usersCount, prayerCount, devotionalsCount, mediaCount] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('prayer_requests').select('*', { count: 'exact', head: true }),
        supabase.from('devotionals').select('*', { count: 'exact', head: true }),
        supabase.from('media_links').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        users: usersCount.count || 0,
        prayerRequests: prayerCount.count || 0,
        devotionals: devotionalsCount.count || 0,
        mediaLinks: mediaCount.count || 0
      });
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage TGLW Global content and users</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.users}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered members</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Prayer Requests</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.prayerRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">Submitted prayers</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Devotionals</CardTitle>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Book className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.devotionals}</div>
              <p className="text-xs text-muted-foreground mt-1">Daily devotionals</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Media Links</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Video className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.mediaLinks}</div>
              <p className="text-xs text-muted-foreground mt-1">Video resources</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="prayer-requests" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted/50 p-1">
            <TabsTrigger value="prayer-requests" className="data-[state=active]:bg-background">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Prayer Requests</span>
              <span className="sm:hidden">Prayers</span>
            </TabsTrigger>
            <TabsTrigger value="devotionals" className="data-[state=active]:bg-background">
              <Book className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Devotionals</span>
              <span className="sm:hidden">Daily</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-background">
              <Video className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Media Links</span>
              <span className="sm:hidden">Media</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-background">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">About Content</span>
              <span className="sm:hidden">About</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-background">
              <Users className="h-4 w-4 mr-2" />
              <span>Users</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prayer-requests">
            <PrayerRequestsManager />
          </TabsContent>

          <TabsContent value="devotionals">
            <DevotionalsManager />
          </TabsContent>

          <TabsContent value="media">
            <MediaLinksManager />
          </TabsContent>

          <TabsContent value="about">
            <AboutContentManager />
          </TabsContent>

          <TabsContent value="users">
            <UsersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
