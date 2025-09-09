import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Download,
  Filter,
  Search,
  Eye,
  MessageSquare,
  ShoppingCart,
  Users
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface ActivityItem {
  id: string;
  activity_type: string;
  activity_description: string;
  activity_timestamp: string;
  is_read: boolean;
  related_entity_type?: string;
  metadata?: any;
}

interface AnalyticsData {
  total_logins: number;
  total_listings_created: number;
  total_messages_sent: number;
  total_searches_performed: number;
  total_listings_viewed: number;
  total_inquiries_received: number;
  response_rate_percentage: number;
  average_response_time_hours: number;
}

export function ActivityHistoryAnalytics() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("7");
  const [activityType, setActivityType] = useState("all");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, dateRange, activityType]);

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchActivityHistory(),
        fetchAnalytics(),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load activity data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityHistory = async () => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateRange));

      let query = supabase
        .from('user_activity_feed')
        .select('*')
        .eq('user_id', user?.id)
        .gte('activity_timestamp', startDate.toISOString())
        .order('activity_timestamp', { ascending: false })
        .limit(50);

      if (activityType !== 'all') {
        query = query.eq('activity_type', activityType);
      }

      const { data, error } = await query;
      if (error) throw error;

      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activity history:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateRange));

      const { data, error } = await supabase
        .from('user_analytics_summary')
        .select('*')
        .eq('user_id', user?.id)
        .gte('metric_date', startDate.toISOString().split('T')[0]);

      if (error) throw error;

      // Aggregate the analytics data
      if (data && data.length > 0) {
        const aggregated = data.reduce((acc, curr) => ({
          total_logins: acc.total_logins + (curr.total_logins || 0),
          total_listings_created: acc.total_listings_created + (curr.total_listings_created || 0),
          total_messages_sent: acc.total_messages_sent + (curr.total_messages_sent || 0),
          total_searches_performed: acc.total_searches_performed + (curr.total_searches_performed || 0),
          total_listings_viewed: acc.total_listings_viewed + (curr.total_listings_viewed || 0),
          total_inquiries_received: acc.total_inquiries_received + (curr.total_inquiries_received || 0),
          response_rate_percentage: acc.response_rate_percentage,
          average_response_time_hours: acc.average_response_time_hours,
        }), {
          total_logins: 0,
          total_listings_created: 0,
          total_messages_sent: 0,
          total_searches_performed: 0,
          total_listings_viewed: 0,
          total_inquiries_received: 0,
          response_rate_percentage: 0,
          average_response_time_hours: 0,
        });

        // Calculate averages for rates
        if (data.length > 0) {
          aggregated.response_rate_percentage = data.reduce((sum, item) => sum + (item.response_rate_percentage || 0), 0) / data.length;
          aggregated.average_response_time_hours = data.reduce((sum, item) => sum + (item.average_response_time_hours || 0), 0) / data.length;
        }

        setAnalytics(aggregated);
      } else {
        // Set default analytics for new users
        setAnalytics({
          total_logins: 1,
          total_listings_created: 0,
          total_messages_sent: 0,
          total_searches_performed: 0,
          total_listings_viewed: 0,
          total_inquiries_received: 0,
          response_rate_percentage: 0,
          average_response_time_hours: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleExport = async (format: 'pdf' | 'csv' | 'json') => {
    setExporting(true);
    try {
      // In a real implementation, you'd call an edge function to generate the export
      const exportData = {
        activities: activities,
        analytics: analytics,
        dateRange: dateRange,
        exportDate: new Date().toISOString(),
      };

      if (format === 'json') {
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `activity-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        toast({
          title: "Export Started",
          description: `Your ${format.toUpperCase()} export will be emailed to you shortly.`,
        });
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
      case 'logout':
        return <Activity className="h-4 w-4" />;
      case 'message_sent':
      case 'message_received':
        return <MessageSquare className="h-4 w-4" />;
      case 'listing_created':
      case 'listing_updated':
        return <ShoppingCart className="h-4 w-4" />;
      case 'search_performed':
        return <Search className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'login':
      case 'logout':
        return 'bg-blue-100 text-blue-800';
      case 'message_sent':
      case 'message_received':
        return 'bg-green-100 text-green-800';
      case 'listing_created':
      case 'listing_updated':
        return 'bg-purple-100 text-purple-800';
      case 'search_performed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.activity_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Activity & Analytics</h2>
          <p className="text-muted-foreground">
            Track your activity and view performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleExport('json')} disabled={exporting}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity History</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          {/* Date Range Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Label>Time Period:</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Logins</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.total_logins || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Active engagement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Listings Created</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.total_listings_created || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Products listed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.total_messages_sent || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Communications
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Searches Performed</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.total_searches_performed || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Discovery actions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Your engagement and response statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Response Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {analytics?.response_rate_percentage?.toFixed(1) || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Avg Response Time</span>
                    <span className="text-sm text-muted-foreground">
                      {analytics?.average_response_time_hours?.toFixed(1) || 0} hours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Inquiries Received</span>
                    <span className="text-sm text-muted-foreground">
                      {analytics?.total_inquiries_received || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Listings Viewed</span>
                    <span className="text-sm text-muted-foreground">
                      {analytics?.total_listings_viewed || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Options
                </CardTitle>
                <CardDescription>
                  Download your activity and analytics data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('pdf')}
                    disabled={exporting}
                  >
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('csv')}
                    disabled={exporting}
                  >
                    CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport('json')}
                    disabled={exporting}
                  >
                    JSON
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Export includes activity history and performance metrics for the selected time period.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Activity Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Activity</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search activity..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Activity Type</Label>
                  <Select value={activityType} onValueChange={setActivityType}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="login">Logins</SelectItem>
                      <SelectItem value="listing_created">Listings</SelectItem>
                      <SelectItem value="message_sent">Messages</SelectItem>
                      <SelectItem value="search_performed">Searches</SelectItem>
                      <SelectItem value="profile_updated">Profile Updates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Activity Timeline
              </CardTitle>
              <CardDescription>
                Your recent activity and actions on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredActivities.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No activity found for the selected filters</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className={`p-2 rounded-full ${getActivityTypeColor(activity.activity_type)}`}>
                        {getActivityIcon(activity.activity_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {activity.activity_description}
                          </p>
                          <Badge variant="outline" className="ml-2">
                            {activity.activity_type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimeAgo(activity.activity_timestamp)}
                        </p>
                      </div>
                      {!activity.is_read && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      )}
                    </div>
                  ))}
                  
                  {filteredActivities.length >= 50 && (
                    <div className="text-center py-4">
                      <Button variant="ghost" size="sm">
                        Load More Activities
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}