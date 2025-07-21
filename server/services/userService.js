class UserService {
  constructor() {
    // In a real application, this would be connected to a database
    this.users = new Map();
    this.preferences = new Map();
    this.metrics = new Map();
  }

  async createProfile(profileData) {
    const userId = this.generateUserId();
    const profile = {
      id: userId,
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.users.set(userId, profile);
    return profile;
  }

  async getProfile(userId) {
    return this.users.get(userId) || null;
  }

  async updateProfile(userId, updateData) {
    const existingProfile = this.users.get(userId);
    if (!existingProfile) return null;

    const updatedProfile = {
      ...existingProfile,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    this.users.set(userId, updatedProfile);
    return updatedProfile;
  }

  async savePreferences(userId, preferences) {
    const userPreferences = {
      userId,
      ...preferences,
      updatedAt: new Date().toISOString()
    };

    this.preferences.set(userId, userPreferences);
    return userPreferences;
  }

  async getPreferences(userId) {
    return this.preferences.get(userId) || this.getDefaultPreferences();
  }

  async saveMetrics(userId, platform, metrics) {
    const key = `${userId}-${platform}`;
    const existingMetrics = this.metrics.get(key) || [];
    
    const newMetric = {
      ...metrics,
      timestamp: new Date().toISOString(),
      platform
    };

    existingMetrics.push(newMetric);
    
    // Keep only last 100 metrics entries per platform
    if (existingMetrics.length > 100) {
      existingMetrics.splice(0, existingMetrics.length - 100);
    }

    this.metrics.set(key, existingMetrics);
    return newMetric;
  }

  async getMetricsHistory(userId, platform, timeframe = '30d') {
    const key = `${userId}-${platform}`;
    const metrics = this.metrics.get(key) || [];
    
    const cutoffDate = this.getTimeframeCutoff(timeframe);
    const filteredMetrics = metrics.filter(metric => 
      new Date(metric.timestamp) >= cutoffDate
    );

    return {
      platform,
      timeframe,
      metrics: filteredMetrics,
      summary: this.calculateMetricsSummary(filteredMetrics),
      trends: this.calculateTrends(filteredMetrics)
    };
  }

  async getDashboardData(userId) {
    const profile = await this.getProfile(userId);
    if (!profile) return null;

    const preferences = await this.getPreferences(userId);
    const platforms = preferences.platforms || [profile.platform];
    
    const dashboardData = {
      user: {
        id: userId,
        name: profile.name || 'Content Creator',
        platform: profile.platform,
        niche: profile.niche,
        experienceLevel: profile.experienceLevel || 'beginner'
      },
      overview: await this.getOverviewData(userId, platforms),
      recentMetrics: await this.getRecentMetrics(userId, platforms),
      recommendations: await this.getPersonalizedRecommendations(userId, profile),
      goals: await this.getGoalsProgress(userId, preferences.goals || []),
      notifications: await this.getNotifications(userId),
      quickActions: this.getQuickActions(profile),
      insights: await this.getInsights(userId, platforms)
    };

    return dashboardData;
  }

  // Helper methods
  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  getDefaultPreferences() {
    return {
      notifications: {
        email: true,
        push: true,
        frequency: 'weekly'
      },
      dashboard: {
        theme: 'light',
        defaultView: 'overview',
        chartsType: 'line'
      },
      privacy: {
        publicProfile: false,
        shareAnalytics: false,
        allowMessages: true
      },
      platforms: [],
      goals: ['growth', 'engagement'],
      focusAreas: ['content_quality', 'audience_growth']
    };
  }

  getTimeframeCutoff(timeframe) {
    const now = new Date();
    const timeframes = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365
    };
    
    const days = timeframes[timeframe] || 30;
    return new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  }

  calculateMetricsSummary(metrics) {
    if (metrics.length === 0) return null;

    const latest = metrics[metrics.length - 1];
    const oldest = metrics[0];
    
    const summary = {};
    Object.keys(latest).forEach(key => {
      if (typeof latest[key] === 'number' && key !== 'timestamp') {
        const currentValue = latest[key];
        const previousValue = oldest[key] || 0;
        const change = previousValue !== 0 ? 
          ((currentValue - previousValue) / previousValue) * 100 : 0;
        
        summary[key] = {
          current: currentValue,
          previous: previousValue,
          change: Math.round(change * 100) / 100,
          trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
        };
      }
    });

    return summary;
  }

  calculateTrends(metrics) {
    if (metrics.length < 2) return {};

    const trends = {};
    const keys = Object.keys(metrics[0]).filter(key => 
      typeof metrics[0][key] === 'number' && key !== 'timestamp'
    );

    keys.forEach(key => {
      const values = metrics.map(m => m[key] || 0);
      const trend = this.calculateLinearTrend(values);
      
      trends[key] = {
        direction: trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable',
        strength: Math.abs(trend),
        confidence: this.calculateTrendConfidence(values)
      };
    });

    return trends;
  }

  calculateLinearTrend(values) {
    const n = values.length;
    if (n < 2) return 0;

    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, y, x) => sum + x * y, 0);
    const sumXX = (n * (n - 1) * (2 * n - 1)) / 6;

    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  }

  calculateTrendConfidence(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Simple confidence based on coefficient of variation
    const coefficientOfVariation = mean !== 0 ? standardDeviation / Math.abs(mean) : 1;
    return Math.max(0, Math.min(1, 1 - coefficientOfVariation));
  }

  async getOverviewData(userId, platforms) {
    const overview = {
      totalFollowers: 0,
      totalEngagement: 0,
      contentPublished: 0,
      reachGrowth: 0
    };

    for (const platform of platforms) {
      const metrics = await this.getMetricsHistory(userId, platform, '30d');
      if (metrics.metrics.length > 0) {
        const latest = metrics.metrics[metrics.metrics.length - 1];
        overview.totalFollowers += latest.followers || 0;
        overview.totalEngagement += latest.engagement || 0;
        overview.contentPublished += latest.posts || 0;
        overview.reachGrowth += latest.reach || 0;
      }
    }

    return overview;
  }

  async getRecentMetrics(userId, platforms) {
    const recentMetrics = {};
    
    for (const platform of platforms) {
      const metrics = await this.getMetricsHistory(userId, platform, '7d');
      recentMetrics[platform] = {
        data: metrics.metrics.slice(-7), // Last 7 data points
        summary: metrics.summary,
        trends: metrics.trends
      };
    }

    return recentMetrics;
  }

  async getPersonalizedRecommendations(userId, profile) {
    const recommendations = [];
    
    // Generate recommendations based on user profile
    if (profile.experienceLevel === 'beginner') {
      recommendations.push({
        type: 'tip',
        priority: 'high',
        title: 'Establish Consistent Posting Schedule',
        description: 'Create a regular posting schedule to build audience expectations and improve algorithm performance.',
        action: 'Create content calendar',
        category: 'content_strategy'
      });
    }

    if (profile.niche) {
      recommendations.push({
        type: 'opportunity',
        priority: 'medium',
        title: `Trending in ${profile.niche}`,
        description: `Explore trending topics in the ${profile.niche} space to increase visibility.`,
        action: 'View trending topics',
        category: 'content_ideas'
      });
    }

    recommendations.push({
      type: 'insight',
      priority: 'medium',
      title: 'Engagement Rate Analysis',
      description: 'Your engagement rate could be improved with more interactive content.',
      action: 'Get engagement tips',
      category: 'performance'
    });

    return recommendations;
  }

  async getGoalsProgress(userId, goals) {
    const progress = {};
    
    goals.forEach(goal => {
      // Simulate progress data
      progress[goal] = {
        target: this.getGoalTarget(goal),
        current: this.getGoalCurrent(goal),
        progress: Math.random() * 100,
        timeframe: '3 months',
        status: Math.random() > 0.5 ? 'on_track' : 'needs_attention'
      };
    });

    return progress;
  }

  getGoalTarget(goal) {
    const targets = {
      growth: '10,000 followers',
      engagement: '5% engagement rate',
      monetization: '$1,000/month revenue',
      awareness: '50,000 monthly reach'
    };
    return targets[goal] || 'Custom goal';
  }

  getGoalCurrent(goal) {
    const current = {
      growth: '7,500 followers',
      engagement: '3.2% engagement rate',
      monetization: '$450/month revenue',
      awareness: '32,000 monthly reach'
    };
    return current[goal] || 'In progress';
  }

  async getNotifications(userId) {
    // Simulate notifications
    return [
      {
        id: 'notif_1',
        type: 'achievement',
        title: 'Milestone Reached!',
        message: 'You\'ve reached 1,000 followers on Instagram!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        read: false
      },
      {
        id: 'notif_2',
        type: 'tip',
        title: 'Optimal Posting Time',
        message: 'Your audience is most active in 2 hours. Consider scheduling your next post!',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        read: false
      },
      {
        id: 'notif_3',
        type: 'trending',
        title: 'Trending Topic Alert',
        message: 'New trending topic in your niche: "AI Content Creation"',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        read: true
      }
    ];
  }

  getQuickActions(profile) {
    const actions = [
      {
        id: 'create_content',
        title: 'Create New Content',
        description: 'Start creating your next post',
        icon: 'plus',
        action: '/create'
      },
      {
        id: 'analyze_performance',
        title: 'Analyze Performance',
        description: 'Review your latest content metrics',
        icon: 'chart',
        action: '/analytics'
      },
      {
        id: 'schedule_posts',
        title: 'Schedule Posts',
        description: 'Plan your upcoming content',
        icon: 'calendar',
        action: '/schedule'
      },
      {
        id: 'find_trends',
        title: 'Find Trending Topics',
        description: 'Discover what\'s trending in your niche',
        icon: 'trending',
        action: '/trends'
      }
    ];

    // Customize actions based on user profile
    if (profile.experienceLevel === 'beginner') {
      actions.unshift({
        id: 'getting_started',
        title: 'Getting Started Guide',
        description: 'Learn the basics of content creation',
        icon: 'book',
        action: '/guide'
      });
    }

    return actions;
  }

  async getInsights(userId, platforms) {
    const insights = [];

    // Performance insights
    insights.push({
      type: 'performance',
      title: 'Best Performing Content Type',
      value: 'Video content',
      change: '+25%',
      description: 'Videos generate 25% more engagement than other content types',
      actionable: true,
      action: 'Create more video content'
    });

    // Audience insights
    insights.push({
      type: 'audience',
      title: 'Peak Engagement Time',
      value: '6:00 PM - 8:00 PM',
      change: null,
      description: 'Your audience is most active during evening hours',
      actionable: true,
      action: 'Schedule posts for peak hours'
    });

    // Growth insights
    insights.push({
      type: 'growth',
      title: 'Follower Growth Rate',
      value: '12% this month',
      change: '+3%',
      description: 'Above average growth rate for your niche',
      actionable: false,
      action: null
    });

    // Content insights
    insights.push({
      type: 'content',
      title: 'Hashtag Performance',
      value: '#contentcreator',
      change: '+18%',
      description: 'This hashtag increased your reach by 18%',
      actionable: true,
      action: 'Use similar hashtags'
    });

    return insights;
  }
}

module.exports = new UserService();