class PlatformService {
  constructor() {
    this.platforms = this.initializePlatforms();
  }

  async getAllPlatforms() {
    return Object.keys(this.platforms).map(platform => ({
      id: platform,
      name: this.platforms[platform].name,
      description: this.platforms[platform].description,
      category: this.platforms[platform].category,
      audienceSize: this.platforms[platform].audienceSize,
      primaryContentTypes: this.platforms[platform].contentTypes.slice(0, 3)
    }));
  }

  async getPlatformInfo(platform) {
    const platformData = this.platforms[platform.toLowerCase()];
    if (!platformData) return null;

    return {
      ...platformData,
      lastUpdated: new Date().toISOString(),
      popularityRank: this.getPlatformRank(platform),
      growthTrend: this.getGrowthTrend(platform)
    };
  }

  async getPlatformRequirements(platform, contentType) {
    const platformData = this.platforms[platform.toLowerCase()];
    if (!platformData) return null;

    const requirements = platformData.requirements;
    const contentRequirements = platformData.contentRequirements[contentType] || 
                               platformData.contentRequirements.general;

    return {
      platform,
      contentType,
      technical: requirements.technical,
      content: contentRequirements,
      monetization: requirements.monetization,
      verification: requirements.verification,
      policies: requirements.policies
    };
  }

  async getAlgorithmInsights(platform) {
    const platformData = this.platforms[platform.toLowerCase()];
    if (!platformData) return null;

    return platformData.algorithm;
  }

  async getMonetizationOptions(platform, audienceSize, niche) {
    const platformData = this.platforms[platform.toLowerCase()];
    if (!platformData) return null;

    const monetization = platformData.monetization;
    const availableOptions = monetization.options.filter(option => 
      audienceSize >= option.minimumRequirement.followers
    );

    return {
      platform,
      audienceSize,
      niche,
      available: availableOptions,
      requirements: monetization.generalRequirements,
      averageRates: this.getAverageRates(platform, audienceSize),
      tips: monetization.tips
    };
  }

  async getBestPractices(platform, contentType, niche) {
    const platformData = this.platforms[platform.toLowerCase()];
    if (!platformData) return null;

    const bestPractices = platformData.bestPractices;
    const contentSpecific = bestPractices.content[contentType] || 
                          bestPractices.content.general;

    return {
      platform,
      contentType,
      niche,
      general: bestPractices.general,
      content: contentSpecific,
      engagement: bestPractices.engagement,
      growth: bestPractices.growth,
      mistakes: bestPractices.commonMistakes
    };
  }

  async comparePlatforms(platforms, criteria) {
    const comparison = {};
    
    platforms.forEach(platform => {
      const platformData = this.platforms[platform.toLowerCase()];
      if (platformData) {
        comparison[platform] = this.extractComparisonData(platformData, criteria);
      }
    });

    return {
      platforms: comparison,
      recommendation: this.getRecommendation(comparison, criteria),
      summary: this.generateComparisonSummary(comparison)
    };
  }

  initializePlatforms() {
    return {
      youtube: {
        name: 'YouTube',
        description: 'World\'s largest video sharing platform',
        category: 'Video',
        audienceSize: '2.7 billion users',
        contentTypes: ['Long-form videos', 'YouTube Shorts', 'Live streams', 'Community posts', 'Premieres'],
        requirements: {
          technical: {
            videoFormats: ['MP4', 'MOV', 'AVI', 'WMV', 'FLV', 'WebM'],
            maxFileSize: '256GB',
            maxDuration: '12 hours',
            recommendedResolution: '1920x1080 (1080p)',
            aspectRatio: '16:9 for regular videos, 9:16 for Shorts'
          },
          monetization: {
            subscribers: 1000,
            watchHours: 4000,
            additionalRequirements: ['Good standing with policies', 'Live in eligible country']
          },
          verification: {
            requirement: 'Phone number verification',
            benefits: ['Custom thumbnail', 'Live streaming', 'Longer videos']
          },
          policies: ['Community guidelines', 'Copyright policies', 'Monetization policies']
        },
        contentRequirements: {
          video: {
            thumbnails: 'Custom thumbnails recommended (1280x720)',
            titles: 'Maximum 100 characters',
            descriptions: 'Maximum 5,000 characters',
            tags: 'Maximum 500 characters'
          },
          short: {
            duration: 'Maximum 60 seconds',
            format: 'Vertical (9:16) preferred',
            requirements: 'Original content, no watermarks'
          },
          general: {
            language: 'Multiple languages supported',
            captions: 'Auto-generated or custom',
            endScreens: 'Available for videos 25+ seconds'
          }
        },
        algorithm: {
          rankingFactors: [
            { factor: 'Watch time', weight: 'Very High', description: 'Total time viewers spend watching' },
            { factor: 'Click-through rate', weight: 'High', description: 'Percentage who click after seeing thumbnail' },
            { factor: 'Audience retention', weight: 'High', description: 'How long viewers stay engaged' },
            { factor: 'Engagement', weight: 'Medium', description: 'Likes, comments, shares, subscribes' },
            { factor: 'Session duration', weight: 'Medium', description: 'How long users stay on YouTube after your video' }
          ],
          optimization: [
            'Create compelling thumbnails and titles',
            'Hook viewers in the first 15 seconds',
            'Encourage engagement throughout the video',
            'Use end screens and cards effectively',
            'Post consistently at optimal times'
          ],
          updates: 'Algorithm updated continuously, major changes announced quarterly'
        },
        monetization: {
          options: [
            {
              type: 'YouTube Partner Program',
              description: 'Ad revenue sharing',
              minimumRequirement: { followers: 1000, watchHours: 4000 },
              averageEarnings: '$1-3 per 1000 views'
            },
            {
              type: 'Channel Memberships',
              description: 'Monthly subscriber payments',
              minimumRequirement: { followers: 1000 },
              averageEarnings: '$5-50 per member/month'
            },
            {
              type: 'Super Chat & Super Thanks',
              description: 'Live stream and video donations',
              minimumRequirement: { followers: 0 },
              averageEarnings: 'Varies widely'
            },
            {
              type: 'YouTube Shorts Fund',
              description: 'Creator fund for Shorts',
              minimumRequirement: { followers: 10000 },
              averageEarnings: '$100-10,000/month'
            }
          ],
          generalRequirements: ['18+ years old', 'No community guideline strikes', 'Located in eligible country'],
          tips: [
            'Focus on watch time over views',
            'Create playlists to increase session duration',
            'Use YouTube Studio analytics extensively',
            'Engage with comments within first hour'
          ]
        },
        bestPractices: {
          general: [
            'Maintain consistent upload schedule',
            'Optimize for search with keywords',
            'Create eye-catching thumbnails',
            'Write compelling titles without clickbait',
            'Engage with your community regularly'
          ],
          content: {
            video: [
              'Plan content with clear structure',
              'Use good lighting and audio quality',
              'Include clear call-to-actions',
              'Create engaging intros and outros',
              'Use end screens and cards effectively'
            ],
            short: [
              'Hook viewers immediately',
              'Use trending music and effects',
              'Include text overlays for context',
              'Post at peak engagement times',
              'Create series for better discovery'
            ],
            general: [
              'Research trending topics in your niche',
              'Collaborate with other creators',
              'Cross-promote on other platforms',
              'Analyze performance regularly'
            ]
          },
          engagement: [
            'Respond to comments quickly',
            'Ask questions to encourage discussion',
            'Pin important comments',
            'Use community tab for updates',
            'Host live streams regularly'
          ],
          growth: [
            'Optimize video SEO',
            'Create compelling series',
            'Collaborate with other YouTubers',
            'Promote on other social platforms',
            'Analyze competitors\' strategies'
          ],
          commonMistakes: [
            'Inconsistent posting schedule',
            'Poor thumbnail and title optimization',
            'Ignoring analytics insights',
            'Not engaging with community',
            'Focusing only on subscriber count'
          ]
        }
      },
      tiktok: {
        name: 'TikTok',
        description: 'Short-form video platform focused on entertainment',
        category: 'Short Video',
        audienceSize: '1 billion users',
        contentTypes: ['Short videos', 'Live streams', 'Stories', 'Duets', 'Stitches'],
        requirements: {
          technical: {
            videoFormats: ['MP4', 'MOV'],
            maxFileSize: '287.6MB (iOS), 72MB (Android)',
            maxDuration: '10 minutes',
            recommendedResolution: '1080x1920 (9:16)',
            aspectRatio: '9:16 (vertical) preferred'
          },
          monetization: {
            followers: 10000,
            views: 100000,
            additionalRequirements: ['18+ years old', 'Good standing with policies']
          },
          verification: {
            requirement: 'Phone number verification',
            benefits: ['Longer videos', 'Live streaming', 'Link in bio']
          },
          policies: ['Community guidelines', 'Copyright policies', 'Safety policies']
        },
        contentRequirements: {
          video: {
            captions: 'Auto-generated, manual recommended',
            hashtags: '3-5 relevant hashtags recommended',
            effects: 'Platform effects encouraged',
            music: 'Use trending sounds for better reach'
          },
          live: {
            minFollowers: 1000,
            duration: 'Up to 60 minutes',
            features: 'Virtual gifts, Q&A, polls'
          },
          general: {
            originalContent: 'Highly favored by algorithm',
            trending: 'Participation in trends increases visibility',
            consistency: 'Daily posting recommended'
          }
        },
        algorithm: {
          rankingFactors: [
            { factor: 'Completion rate', weight: 'Very High', description: 'Percentage of video watched' },
            { factor: 'Engagement rate', weight: 'Very High', description: 'Likes, comments, shares relative to views' },
            { factor: 'Shares', weight: 'High', description: 'Video shares and sends' },
            { factor: 'User interactions', weight: 'High', description: 'Profile visits, follows from video' },
            { factor: 'Video information', weight: 'Medium', description: 'Audio, hashtags, effects used' }
          ],
          optimization: [
            'Hook viewers in first 3 seconds',
            'Use trending sounds and hashtags',
            'Create shareable content',
            'Post at peak audience times',
            'Encourage interaction with questions'
          ],
          updates: 'Algorithm updates frequently, trend cycles are short'
        },
        monetization: {
          options: [
            {
              type: 'Creator Fund',
              description: 'Payment based on views',
              minimumRequirement: { followers: 10000, views: 100000 },
              averageEarnings: '$0.02-0.04 per 1000 views'
            },
            {
              type: 'Live Gifts',
              description: 'Virtual gifts during live streams',
              minimumRequirement: { followers: 1000 },
              averageEarnings: 'Varies by audience'
            },
            {
              type: 'Brand Partnerships',
              description: 'Sponsored content',
              minimumRequirement: { followers: 1000 },
              averageEarnings: '$100-500 per 100k followers'
            }
          ],
          generalRequirements: ['18+ years old', 'Consistent posting', 'Original content'],
          tips: [
            'Focus on engagement rate over follower count',
            'Participate in trending challenges',
            'Use popular sounds and music',
            'Create content that encourages interaction'
          ]
        },
        bestPractices: {
          general: [
            'Post consistently (daily recommended)',
            'Jump on trends quickly',
            'Use popular sounds and music',
            'Create vertical, mobile-first content',
            'Engage with trending hashtags'
          ],
          content: {
            video: [
              'Start with a strong hook',
              'Keep content under 30 seconds for better retention',
              'Use trending effects and filters',
              'Include captions for accessibility',
              'End with a call-to-action'
            ],
            general: [
              'Study trending content in your niche',
              'Experiment with different content formats',
              'Use analytics to find optimal posting times',
              'Create series or ongoing themes'
            ]
          },
          engagement: [
            'Respond to comments with videos',
            'Use duet and stitch features',
            'Ask questions in captions',
            'Encourage user-generated content',
            'Go live regularly to build community'
          ],
          growth: [
            'Collaborate with other TikTokers',
            'Cross-promote on other platforms',
            'Use relevant and trending hashtags',
            'Analyze competitor content',
            'Participate in challenges and trends'
          ],
          commonMistakes: [
            'Posting horizontal videos',
            'Using copyrighted music incorrectly',
            'Ignoring trending sounds',
            'Inconsistent posting schedule',
            'Not engaging with comments'
          ]
        }
      },
      instagram: {
        name: 'Instagram',
        description: 'Visual content platform for photos, videos, and stories',
        category: 'Visual/Photo',
        audienceSize: '2 billion users',
        contentTypes: ['Feed posts', 'Stories', 'Reels', 'IGTV', 'Live videos'],
        requirements: {
          technical: {
            imageFormats: ['JPEG', 'PNG'],
            videoFormats: ['MP4', 'MOV'],
            maxImageSize: '30MB',
            maxVideoSize: '4GB',
            recommendedResolution: '1080x1080 (posts), 1080x1920 (stories)',
            aspectRatio: 'Square (1:1), Portrait (4:5), Landscape (1.91:1)'
          },
          monetization: {
            followers: 1000,
            additionalRequirements: ['Business or Creator account', 'Located in eligible country']
          },
          verification: {
            requirement: 'Phone number and email verification',
            benefits: ['Shopping tags', 'Instagram Shopping', 'Branded content tools']
          },
          policies: ['Community guidelines', 'Terms of service', 'Commerce policies']
        },
        contentRequirements: {
          post: {
            captions: 'Maximum 2,200 characters',
            hashtags: 'Up to 30 hashtags (5-10 recommended)',
            tags: 'Up to 20 people per post',
            location: 'Geotagging available'
          },
          story: {
            duration: '15 seconds per story',
            features: 'Polls, questions, stickers, music',
            highlights: 'Save important stories permanently'
          },
          reel: {
            duration: 'Up to 90 seconds',
            music: 'Instagram music library',
            effects: 'AR filters and effects available'
          },
          general: {
            scheduling: 'Third-party tools or Creator Studio',
            insights: 'Available for business/creator accounts',
            shopping: 'Product tagging available'
          }
        },
        algorithm: {
          rankingFactors: [
            { factor: 'Relationship', weight: 'Very High', description: 'Interaction history with user' },
            { factor: 'Interest', weight: 'Very High', description: 'User\'s past behavior and preferences' },
            { factor: 'Timeliness', weight: 'High', description: 'How recent the post is' },
            { factor: 'Engagement', weight: 'High', description: 'Likes, comments, shares, saves' },
            { factor: 'Information', weight: 'Medium', description: 'Post type, hashtags, location' }
          ],
          optimization: [
            'Post when your audience is most active',
            'Use relevant hashtags (mix of popular and niche)',
            'Encourage early engagement',
            'Create shareable and saveable content',
            'Use all available features (stories, reels, IGTV)'
          ],
          updates: 'Algorithm updated regularly, chronological and algorithmic feeds available'
        },
        monetization: {
          options: [
            {
              type: 'Creator Fund',
              description: 'Payment for reels',
              minimumRequirement: { followers: 1000 },
              averageEarnings: 'Varies by region and engagement'
            },
            {
              type: 'Brand Partnerships',
              description: 'Sponsored posts and stories',
              minimumRequirement: { followers: 1000 },
              averageEarnings: '$10-100 per 1000 followers'
            },
            {
              type: 'Instagram Shopping',
              description: 'Sell products directly',
              minimumRequirement: { followers: 0 },
              averageEarnings: 'Depends on products and conversion'
            },
            {
              type: 'Affiliate Marketing',
              description: 'Promote others\' products',
              minimumRequirement: { followers: 500 },
              averageEarnings: '5-30% commission'
            }
          ],
          generalRequirements: ['Business or creator account', 'Compliance with policies', 'Authentic engagement'],
          tips: [
            'Focus on engagement rate over follower count',
            'Use Instagram Shopping features',
            'Create high-quality visual content',
            'Leverage stories for behind-the-scenes content'
          ]
        },
        bestPractices: {
          general: [
            'Maintain consistent visual aesthetic',
            'Post regularly (1-2 times daily)',
            'Use relevant hashtags strategically',
            'Engage with your community actively',
            'Leverage all content formats'
          ],
          content: {
            post: [
              'Use high-quality images',
              'Write compelling captions',
              'Include call-to-actions',
              'Use carousel posts for better engagement',
              'Maintain consistent brand aesthetic'
            ],
            story: [
              'Post multiple stories daily',
              'Use interactive features (polls, questions)',
              'Share behind-the-scenes content',
              'Create story highlights for important content',
              'Use story templates for consistency'
            ],
            reel: [
              'Follow trending audio and effects',
              'Create educational or entertaining content',
              'Use trending hashtags',
              'Keep content vertical and mobile-optimized',
              'Include captions for accessibility'
            ],
            general: [
              'Plan content calendar in advance',
              'Repurpose content across formats',
              'Use user-generated content',
              'Collaborate with other creators'
            ]
          },
          engagement: [
            'Respond to comments promptly',
            'Like and comment on followers\' posts',
            'Use Instagram Stories polls and questions',
            'Host live sessions regularly',
            'Create shareable content'
          ],
          growth: [
            'Use strategic hashtag research',
            'Collaborate with influencers',
            'Cross-promote on other platforms',
            'Run Instagram ads strategically',
            'Analyze insights regularly'
          ],
          commonMistakes: [
            'Using too many hashtags',
            'Posting low-quality content',
            'Ignoring Instagram Stories',
            'Not engaging with community',
            'Inconsistent posting schedule'
          ]
        }
      },
      twitter: {
        name: 'Twitter',
        description: 'Microblogging platform for real-time conversations',
        category: 'Microblogging',
        audienceSize: '450 million users',
        contentTypes: ['Tweets', 'Threads', 'Spaces', 'Fleets', 'Videos'],
        requirements: {
          technical: {
            textLimit: '280 characters per tweet',
            imageFormats: ['JPEG', 'PNG', 'GIF', 'WebP'],
            videoFormats: ['MP4', 'MOV'],
            maxImageSize: '5MB',
            maxVideoSize: '512MB',
            videoLength: 'Up to 2 minutes 20 seconds'
          },
          monetization: {
            followers: 500,
            additionalRequirements: ['18+ years old', 'Located in eligible country']
          },
          verification: {
            requirement: 'Phone number verification',
            benefits: ['Blue checkmark eligibility', 'Advanced features']
          },
          policies: ['Twitter Rules', 'Hateful conduct policy', 'Violent extremism policy']
        },
        contentRequirements: {
          tweet: {
            length: '280 characters',
            media: 'Up to 4 images or 1 video per tweet',
            links: 'URLs automatically shortened',
            mentions: 'Unlimited mentions allowed'
          },
          thread: {
            length: 'Unlimited connected tweets',
            engagement: 'Higher engagement than single tweets',
            format: 'Number threads for clarity'
          },
          general: {
            hashtags: '1-2 hashtags recommended',
            timing: 'Real-time platform, timing crucial',
            engagement: 'Quick responses expected'
          }
        },
        algorithm: {
          rankingFactors: [
            { factor: 'Engagement rate', weight: 'Very High', description: 'Likes, retweets, replies, clicks' },
            { factor: 'Recency', weight: 'High', description: 'How recent the tweet is' },
            { factor: 'Relationship', weight: 'High', description: 'User\'s interaction with your account' },
            { factor: 'Conversation', weight: 'Medium', description: 'Quality of replies and discussion' },
            { factor: 'Media richness', weight: 'Medium', description: 'Images, videos, links included' }
          ],
          optimization: [
            'Tweet during peak hours for your audience',
            'Use engaging visuals and media',
            'Create conversation-starting content',
            'Engage with trending topics relevant to your niche',
            'Use threads for longer-form content'
          ],
          updates: 'Timeline algorithm optional, chronological feed available'
        },
        monetization: {
          options: [
            {
              type: 'Super Follows',
              description: 'Subscription-based exclusive content',
              minimumRequirement: { followers: 500 },
              averageEarnings: '$2.99-9.99 per subscriber/month'
            },
            {
              type: 'Tip Jar',
              description: 'Direct tips from followers',
              minimumRequirement: { followers: 0 },
              averageEarnings: 'Varies by audience'
            },
            {
              type: 'Twitter Spaces',
              description: 'Monetized audio conversations',
              minimumRequirement: { followers: 1000 },
              averageEarnings: 'Tips and sponsorships'
            },
            {
              type: 'Brand Partnerships',
              description: 'Sponsored tweets and campaigns',
              minimumRequirement: { followers: 1000 },
              averageEarnings: '$5-25 per 1000 followers'
            }
          ],
          generalRequirements: ['Active account', 'Good standing with policies', 'Authentic engagement'],
          tips: [
            'Build thought leadership in your niche',
            'Engage with trending topics',
            'Use Twitter Analytics to optimize',
            'Create valuable thread content'
          ]
        },
        bestPractices: {
          general: [
            'Tweet consistently (3-5 times daily)',
            'Engage with trending topics',
            'Use relevant hashtags sparingly',
            'Respond quickly to mentions and replies',
            'Share valuable insights and opinions'
          ],
          content: {
            tweet: [
              'Keep tweets concise and clear',
              'Use compelling hooks',
              'Include relevant media when possible',
              'Ask questions to encourage engagement',
              'Share valuable insights or tips'
            ],
            thread: [
              'Number your tweets in threads',
              'Include a compelling opener',
              'Provide value throughout the thread',
              'End with a call-to-action',
              'Pin important threads to profile'
            ],
            general: [
              'Share mix of original and curated content',
              'Use Twitter polls for engagement',
              'Live-tweet events in your niche',
              'Share behind-the-scenes content'
            ]
          },
          engagement: [
            'Reply to comments and mentions promptly',
            'Retweet and comment on others\' content',
            'Join relevant Twitter chats',
            'Use Twitter Lists to manage feeds',
            'Host Twitter Spaces regularly'
          ],
          growth: [
            'Follow and engage with industry leaders',
            'Participate in trending conversations',
            'Cross-promote with other platforms',
            'Use Twitter Analytics for insights',
            'Collaborate with other Twitter users'
          ],
          commonMistakes: [
            'Overusing hashtags',
            'Posting only promotional content',
            'Not engaging with followers',
            'Ignoring trending topics',
            'Inconsistent posting schedule'
          ]
        }
      },
      linkedin: {
        name: 'LinkedIn',
        description: 'Professional networking and business content platform',
        category: 'Professional',
        audienceSize: '900 million users',
        contentTypes: ['Posts', 'Articles', 'Videos', 'Stories', 'Live events'],
        requirements: {
          technical: {
            imageFormats: ['JPEG', 'PNG', 'GIF'],
            videoFormats: ['MP4', 'MOV', 'WMV', 'AVI'],
            maxImageSize: '5MB',
            maxVideoSize: '5GB',
            videoLength: 'Up to 10 minutes',
            articleLength: 'Up to 125,000 characters'
          },
          monetization: {
            followers: 150,
            additionalRequirements: ['Complete profile', 'Professional network']
          },
          verification: {
            requirement: 'Email and work verification',
            benefits: ['Credibility badge', 'Enhanced features']
          },
          policies: ['Professional community policies', 'User agreement', 'Privacy policy']
        },
        contentRequirements: {
          post: {
            length: '3,000 characters maximum',
            hashtags: '3-5 relevant hashtags recommended',
            media: 'Professional photos and videos',
            formatting: 'Professional tone and formatting'
          },
          article: {
            length: 'Long-form content (1,500+ words)',
            formatting: 'Headers, bullet points, images',
            SEO: 'Keyword optimization important',
            publishing: 'LinkedIn Publishing platform'
          },
          general: {
            professionalism: 'Business-focused content required',
            networking: 'Relationship building emphasized',
            thoughtLeadership: 'Industry insights valued'
          }
        },
        algorithm: {
          rankingFactors: [
            { factor: 'Relevance', weight: 'Very High', description: 'Professional relevance to user\'s industry' },
            { factor: 'Engagement quality', weight: 'Very High', description: 'Comments and meaningful interactions' },
            { factor: 'Author credibility', weight: 'High', description: 'Profile completeness and connections' },
            { factor: 'Content freshness', weight: 'Medium', description: 'Recency of post' },
            { factor: 'Network activity', weight: 'Medium', description: 'Activity within user\'s network' }
          ],
          optimization: [
            'Post during business hours',
            'Create industry-relevant content',
            'Encourage meaningful comments',
            'Use professional imagery',
            'Engage with your network\'s content'
          ],
          updates: 'Algorithm favors professional, high-quality content'
        },
        monetization: {
          options: [
            {
              type: 'LinkedIn Creator Accelerator Program',
              description: 'Funding and resources for creators',
              minimumRequirement: { followers: 150 },
              averageEarnings: '$15,000 program + resources'
            },
            {
              type: 'Speaking Opportunities',
              description: 'Paid speaking engagements',
              minimumRequirement: { followers: 500 },
              averageEarnings: '$500-5,000 per event'
            },
            {
              type: 'Consulting Services',
              description: 'Professional consulting',
              minimumRequirement: { followers: 1000 },
              averageEarnings: '$100-500 per hour'
            },
            {
              type: 'Course Sales',
              description: 'Professional development courses',
              minimumRequirement: { followers: 500 },
              averageEarnings: '$50-500 per course'
            }
          ],
          generalRequirements: ['Complete professional profile', 'Industry expertise', 'Professional network'],
          tips: [
            'Build thought leadership in your industry',
            'Share valuable professional insights',
            'Network actively with industry professionals',
            'Offer valuable resources and content'
          ]
        },
        bestPractices: {
          general: [
            'Post consistently (3-5 times per week)',
            'Share industry insights and trends',
            'Engage professionally with your network',
            'Use LinkedIn features (polls, articles, events)',
            'Build genuine professional relationships'
          ],
          content: {
            post: [
              'Share professional experiences and lessons',
              'Post industry news with commentary',
              'Ask thoughtful questions',
              'Share behind-the-scenes professional content',
              'Celebrate team and industry achievements'
            ],
            article: [
              'Write in-depth industry analyses',
              'Share professional expertise',
              'Include data and research',
              'Use professional formatting',
              'Include relevant keywords for SEO'
            ],
            general: [
              'Focus on professional value',
              'Share mix of original and curated content',
              'Use professional photography',
              'Write compelling headlines'
            ]
          },
          engagement: [
            'Comment thoughtfully on others\' posts',
            'Share others\' content with commentary',
            'Respond to comments professionally',
            'Send personalized connection requests',
            'Participate in relevant groups'
          ],
          growth: [
            'Connect with industry professionals',
            'Publish regular LinkedIn articles',
            'Participate in industry discussions',
            'Speak at virtual events',
            'Cross-promote professional content'
          ],
          commonMistakes: [
            'Posting non-professional content',
            'Being overly promotional',
            'Not engaging with network',
            'Incomplete profile optimization',
            'Ignoring LinkedIn groups and events'
          ]
        }
      }
    };
  }

  getPlatformRank(platform) {
    const ranks = {
      youtube: 2,
      instagram: 4,
      tiktok: 7,
      twitter: 15,
      linkedin: 25
    };
    return ranks[platform.toLowerCase()] || 'Not ranked';
  }

  getGrowthTrend(platform) {
    const trends = {
      youtube: 'Stable growth',
      instagram: 'Steady growth',
      tiktok: 'Rapid growth',
      twitter: 'Moderate decline',
      linkedin: 'Strong growth'
    };
    return trends[platform.toLowerCase()] || 'Unknown';
  }

  getAverageRates(platform, audienceSize) {
    const rateMultipliers = {
      youtube: 0.01,
      instagram: 0.008,
      tiktok: 0.005,
      twitter: 0.003,
      linkedin: 0.015
    };

    const baseRate = (audienceSize * (rateMultipliers[platform.toLowerCase()] || 0.01));
    
    return {
      sponsored_post: `$${Math.round(baseRate)}`,
      story: `$${Math.round(baseRate * 0.3)}`,
      video: `$${Math.round(baseRate * 1.5)}`,
      range: `$${Math.round(baseRate * 0.5)}-${Math.round(baseRate * 2)}`
    };
  }

  extractComparisonData(platformData, criteria) {
    return {
      name: platformData.name,
      category: platformData.category,
      audienceSize: platformData.audienceSize,
      contentTypes: platformData.contentTypes,
      monetizationOptions: platformData.monetization.options.length,
      minimumFollowers: Math.min(...platformData.monetization.options.map(o => o.minimumRequirement.followers)),
      algorithmComplexity: platformData.algorithm.rankingFactors.length,
      bestFor: this.getBestUseCase(platformData),
      difficulty: this.getDifficultyScore(platformData)
    };
  }

  getBestUseCase(platformData) {
    const useCases = {
      'Video': 'Long-form video content and education',
      'Short Video': 'Entertainment and viral content',
      'Visual/Photo': 'Lifestyle and visual brands',
      'Microblogging': 'Real-time updates and discussions',
      'Professional': 'B2B content and thought leadership'
    };
    return useCases[platformData.category] || 'General content creation';
  }

  getDifficultyScore(platformData) {
    // Calculate difficulty based on monetization requirements and algorithm complexity
    const minFollowers = Math.min(...platformData.monetization.options.map(o => o.minimumRequirement.followers));
    const algorithmFactors = platformData.algorithm.rankingFactors.length;
    
    if (minFollowers <= 500 && algorithmFactors <= 4) return 'Easy';
    if (minFollowers <= 1000 && algorithmFactors <= 5) return 'Medium';
    return 'Hard';
  }

  getRecommendation(comparison, criteria) {
    // Simple recommendation logic based on criteria
    const platforms = Object.keys(comparison);
    
    if (criteria.goal === 'monetization') {
      return platforms.reduce((best, current) => 
        comparison[current].minimumFollowers < comparison[best].minimumFollowers ? current : best
      );
    }
    
    if (criteria.goal === 'growth') {
      return platforms.find(p => comparison[p].difficulty === 'Easy') || platforms[0];
    }
    
    return platforms[0]; // Default recommendation
  }

  generateComparisonSummary(comparison) {
    const platforms = Object.keys(comparison);
    
    return {
      totalPlatforms: platforms.length,
      easiestToStart: platforms.find(p => comparison[p].difficulty === 'Easy'),
      bestForMonetization: platforms.reduce((best, current) => 
        comparison[current].minimumFollowers < comparison[best].minimumFollowers ? current : best
      ),
      mostCompetitive: platforms.reduce((most, current) => 
        comparison[current].minimumFollowers > comparison[most].minimumFollowers ? current : most
      )
    };
  }
}

module.exports = new PlatformService();