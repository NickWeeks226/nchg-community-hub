import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  MessageSquare, 
  Eye, 
  Star, 
  Plus, 
  Search,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface DashboardMetrics {
  active_listings: number;
  total_views: number;
  messages_pending: number;
  account_score: number;
  completion_percentage: number;
  saved_searches?: number;
  inquiries_sent?: number;
}

interface ActivityItem {
  id: string;
  activity_type: string;
  activity_description: string;
  activity_timestamp: string;
  is_read: boolean;
  related_entity_type?: string;
}

interface ProfileData {
  first_name: string;
  last_name: string;
  user_role: string;
  account_status: string;
  email_verified: boolean;
}

export function ProfileDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    active_listings: 0,
    total_views: 0,
    messages_pending: 0,
    account_score: 75,
    completion_percentage: 25,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      initializeDashboard();
    }
  }, [user]);

  const initializeDashboard = async () => {
    try {
      await Promise.all([
        initializeMetrics(),
        fetchMetrics(),
        fetchProfile(),
        fetchRecentActivity(),
        logActivity('login', 'User viewed dashboard'),
      ]);
    } catch (error) {
      console.error('Error initializing dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeMetrics = async () => {
    try {
      const { error } = await supabase.rpc('initialize_user_metrics', {
        p_user_id: user?.id,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error initializing metrics:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('user_dashboard_metrics')
        .select('metric_type, metric_value')
        .eq('user_id', user?.id);

      if (error) throw error;

      const metricsMap = data?.reduce((acc, item) => {
        acc[item.metric_type as keyof DashboardMetrics] = item.metric_value;
        return acc;
      }, {} as DashboardMetrics) || {};

      setMetrics(prev => ({ ...prev, ...metricsMap }));
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, user_role, account_status, email_verified')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('user_activity_feed')
        .select('id, activity_type, activity_description, activity_timestamp, is_read, related_entity_type')
        .eq('user_id', user?.id)
        .order('activity_timestamp', { ascending: false })
        .limit(5);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  };

  const logActivity = async (type: string, description: string) => {
    try {
      await supabase.rpc('log_user_activity', {
        p_user_id: user?.id,
        p_activity_type: type,
        p_description: description,
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const getVerificationStatus = () => {
    if (!profile) return { status: 'pending', color: 'secondary', text: 'Pending' };
    
    if (profile.account_status === 'active' && profile.email_verified) {
      return { status: 'verified', color: 'default', text: 'Verified' };
    } else if (profile.email_verified) {
      return { status: 'partial', color: 'secondary', text: 'Partially Verified' };
    }
    return { status: 'pending', color: 'destructive', text: 'Verification Pending' };
  };

  const getAccountCompletionTasks = () => {
    const tasks = [
      { id: 'email', label: 'Verify Email', completed: profile?.email_verified },
      { id: 'profile', label: 'Complete Profile', completed: metrics.completion_percentage >= 80 },
      { id: 'phone', label: 'Add Phone Number', completed: false }, // This would need to be checked from profile
      { id: 'address', label: 'Add Address', completed: false }, // This would need to be checked from addresses
    ];
    return tasks;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Coming Soon`,
      description: `The ${action.toLowerCase()} feature is currently under development.`,
    });
    logActivity('button_click', `Clicked ${action} quick action`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const verification = getVerificationStatus();
  const completionTasks = getAccountCompletionTasks();
  const completedTasks = completionTasks.filter(task => task.completed).length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome back, {profile?.first_name || 'User'}!
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your account today.
          </p>
        </div>
        <Badge variant={verification.color as any} className="w-fit">
          {verification.status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
          {verification.status === 'partial' && <Clock className="w-3 h-3 mr-1" />}
          {verification.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
          {verification.text}
        </Badge>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.active_listings}</div>
            <p className="text-xs text-muted-foreground">
              Ready for inquiries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total_views}</div>
            <p className="text-xs text-muted-foreground">
              Across all listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.messages_pending}</div>
            <p className="text-xs text-muted-foreground">
              Require response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.account_score}%</div>
            <p className="text-xs text-muted-foreground">
              Trust & reliability
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Completion */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Account Completion
            </CardTitle>
            <CardDescription>
              Complete your profile to unlock all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{completedTasks}/{completionTasks.length} completed</span>
              </div>
              <Progress value={(completedTasks / completionTasks.length) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              {completionTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2 text-sm">
                  {task.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={task.completed ? "text-green-600" : "text-muted-foreground"}>
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">Start exploring to see your activity here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none">
                        {activity.activity_description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTimeAgo(activity.activity_timestamp)}
                      </p>
                    </div>
                    {!activity.is_read && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                    )}
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full">
                  View All Activity
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleQuickAction('Create Listing')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Listing
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleQuickAction('Check Messages')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Check Messages
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleQuickAction('Search Products')}
            >
              <Search className="mr-2 h-4 w-4" />
              Search Products
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleQuickAction('View Analytics')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}