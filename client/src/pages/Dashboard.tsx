import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  Lightbulb,
  Clock,
  Award
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApi } from '../contexts/ApiContext';

const Dashboard: React.FC = () => {
  const { getDashboard, loading } = useApi();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    // Simulate getting dashboard data
    const fetchDashboard = async () => {
      try {
        // For demo purposes, we'll use mock data
        const mockData = {
          user: {
            name: 'Content Creator',
            platform: 'YouTube',
            niche: 'Technology',
            experienceLevel: 'intermediate'
          },
          overview: {
            totalFollowers: 15420,
            totalEngagement: 1250,
            contentPublished: 45,
            reachGrowth: 23.5
          },
          recentMetrics: {
            youtube: {
              data: [
                { date: '2024-01-01', views: 1200, likes: 45, comments: 12 },
                { date: '2024-01-02', views: 1350, likes: 52, comments: 18 },
                { date: '2024-01-03', views: 1100, likes: 38, comments: 9 },
                { date: '2024-01-04', views: 1650, likes: 67, comments: 25 },
                { date: '2024-01-05', views: 1800, likes: 78, comments: 32 },
                { date: '2024-01-06', views: 1450, likes: 55, comments: 19 },
                { date: '2024-01-07', views: 2100, likes: 95, comments: 41 }
              ]
            }
          },
          recommendations: [
            {
              type: 'tip',
              priority: 'high',
              title: 'Optimal Posting Time',
              description: 'Your audience is most active at 6 PM. Consider scheduling your next video for maximum reach.',
              action: 'Schedule content',
              category: 'timing'
            },
            {
              type: 'opportunity',
              priority: 'medium',
              title: 'Trending Topic Alert',
              description: 'AI and automation content is trending in your niche. Create content around this topic.',
              action: 'Create content',
              category: 'content_ideas'
            },
            {
              type: 'insight',
              priority: 'medium',
              title: 'Engagement Pattern',
              description: 'Your videos perform 40% better when they include tutorials. Consider this format.',
              action: 'View insights',
              category: 'performance'
            }
          ],
          goals: {
            growth: {
              target: '20,000 subscribers',
              current: '15,420 subscribers',
              progress: 77,
              status: 'on_track'
            },
            engagement: {
              target: '5% engagement rate',
              current: '3.8% engagement rate',
              progress: 76,
              status: 'on_track'
            }
          },
          insights: [
            {
              type: 'performance',
              title: 'Best Performing Content',
              value: 'Tutorial videos',
              change: '+40%',
              description: 'Tutorial content generates 40% more engagement'
            },
            {
              type: 'audience',
              title: 'Peak Activity Time',
              value: '6:00 PM - 8:00 PM',
              description: 'Your audience is most active during evening hours'
            },
            {
              type: 'growth',
              title: 'Subscriber Growth',
              value: '+12% this month',
              change: '+3%',
              description: 'Above average growth for your niche'
            }
          ]
        };
        setDashboardData(mockData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboard();
  }, []);

  const overviewCards = [
    {
      title: 'Total Followers',
      value: dashboardData?.overview?.totalFollowers || 0,
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Views',
      value: dashboardData?.overview?.totalEngagement || 0,
      change: '+8.2%',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Content Published',
      value: dashboardData?.overview?.contentPublished || 0,
      change: '+5',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Reach Growth',
      value: `${dashboardData?.overview?.reachGrowth || 0}%`,
      change: '+4.1%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const chartData = dashboardData?.recentMetrics?.youtube?.data || [];

  const contentPerformanceData = [
    { name: 'Tutorials', value: 40, color: '#0ea5e9' },
    { name: 'Reviews', value: 25, color: '#8b5cf6' },
    { name: 'Vlogs', value: 20, color: '#10b981' },
    { name: 'Shorts', value: 15, color: '#f59e0b' }
  ];

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {dashboardData.user.name}! 👋
            </h1>
            <p className="text-primary-100 mt-1">
              Here's what's happening with your {dashboardData.user.platform} content today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm text-primary-100">Current Level</div>
              <div className="text-lg font-semibold capitalize">{dashboardData.user.experienceLevel}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 text-success-500" />
                      <span className="text-sm text-success-600 ml-1">{card.change}</span>
                    </div>
                  </div>
                  <div className={`${card.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Views Over Time</h3>
            <p className="text-sm text-gray-500">Last 7 days performance</p>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Performance */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Content Performance</h3>
            <p className="text-sm text-gray-500">By content type</p>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentPerformanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contentPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {contentPerformanceData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommendations */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
              Recommendations
            </h3>
          </div>
          <div className="card-content space-y-4">
            {dashboardData.recommendations.map((rec: any, index: number) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <span className={`badge ${
                    rec.priority === 'high' ? 'badge-danger' : 
                    rec.priority === 'medium' ? 'badge-warning' : 'badge-primary'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-2">
                  {rec.action} →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary-500" />
              Goal Progress
            </h3>
          </div>
          <div className="card-content space-y-6">
            {Object.entries(dashboardData.goals).map(([key, goal]: [string, any]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">{key}</h4>
                    <p className="text-sm text-gray-500">{goal.current} / {goal.target}</p>
                  </div>
                  <span className={`badge ${
                    goal.status === 'on_track' ? 'badge-success' : 
                    goal.status === 'needs_attention' ? 'badge-warning' : 'badge-danger'
                  }`}>
                    {goal.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{goal.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-500" />
            Quick Insights
          </h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardData.insights.map((insight: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{insight.value}</div>
                <div className="text-sm font-medium text-gray-600 mt-1">{insight.title}</div>
                <div className="text-xs text-gray-500 mt-2">{insight.description}</div>
                {insight.change && (
                  <div className="flex items-center justify-center mt-2">
                    <ArrowUpRight className="h-3 w-3 text-success-500" />
                    <span className="text-xs text-success-600 ml-1">{insight.change}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn-outline flex flex-col items-center p-4 h-auto">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">Schedule Content</span>
            </button>
            <button className="btn-outline flex flex-col items-center p-4 h-auto">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span className="text-sm">View Analytics</span>
            </button>
            <button className="btn-outline flex flex-col items-center p-4 h-auto">
              <Target className="h-6 w-6 mb-2" />
              <span className="text-sm">Set Goals</span>
            </button>
            <button className="btn-primary flex flex-col items-center p-4 h-auto">
              <Lightbulb className="h-6 w-6 mb-2" />
              <span className="text-sm">Get Insights</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;