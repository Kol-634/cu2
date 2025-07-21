const express = require('express');
const router = express.Router();
const optimizationService = require('../services/optimizationService');

// Get personalized content strategy
router.post('/strategy', async (req, res) => {
  try {
    const { 
      platform, 
      contentType, 
      niche, 
      experienceLevel, 
      goals, 
      currentMetrics,
      targetAudience,
      budget
    } = req.body;
    
    if (!platform || !contentType || !niche) {
      return res.status(400).json({ 
        error: 'Platform, content type, and niche are required' 
      });
    }

    const strategy = await optimizationService.generateContentStrategy({
      platform,
      contentType,
      niche,
      experienceLevel: experienceLevel || 'beginner',
      goals: goals || ['growth', 'engagement'],
      currentMetrics: currentMetrics || {},
      targetAudience: targetAudience || {},
      budget: budget || 'low'
    });

    res.json(strategy);
  } catch (error) {
    console.error('Strategy generation error:', error);
    res.status(500).json({ error: 'Failed to generate content strategy' });
  }
});

// Get upload optimization recommendations
router.post('/upload-strategy', async (req, res) => {
  try {
    const { platform, contentType, schedule, timezone, audience } = req.body;

    if (!platform || !contentType) {
      return res.status(400).json({ 
        error: 'Platform and content type are required' 
      });
    }

    const uploadStrategy = await optimizationService.getUploadStrategy({
      platform,
      contentType,
      schedule: schedule || 'flexible',
      timezone: timezone || 'UTC',
      audience: audience || {}
    });

    res.json(uploadStrategy);
  } catch (error) {
    console.error('Upload strategy error:', error);
    res.status(500).json({ error: 'Failed to generate upload strategy' });
  }
});

// Get sponsorship guidance
router.post('/sponsorship-guidance', async (req, res) => {
  try {
    const { 
      platform, 
      niche, 
      followersCount, 
      engagementRate, 
      demographics,
      contentType 
    } = req.body;

    if (!platform || !niche) {
      return res.status(400).json({ 
        error: 'Platform and niche are required' 
      });
    }

    const guidance = await optimizationService.getSponsorshipGuidance({
      platform,
      niche,
      followersCount: followersCount || 0,
      engagementRate: engagementRate || 0,
      demographics: demographics || {},
      contentType: contentType || 'general'
    });

    res.json(guidance);
  } catch (error) {
    console.error('Sponsorship guidance error:', error);
    res.status(500).json({ error: 'Failed to generate sponsorship guidance' });
  }
});

// Get content creation tips
router.post('/creation-tips', async (req, res) => {
  try {
    const { 
      platform, 
      contentType, 
      equipment, 
      skillLevel, 
      focusAreas 
    } = req.body;

    if (!platform || !contentType) {
      return res.status(400).json({ 
        error: 'Platform and content type are required' 
      });
    }

    const tips = await optimizationService.getCreationTips({
      platform,
      contentType,
      equipment: equipment || 'basic',
      skillLevel: skillLevel || 'beginner',
      focusAreas: focusAreas || ['recording', 'editing']
    });

    res.json(tips);
  } catch (error) {
    console.error('Creation tips error:', error);
    res.status(500).json({ error: 'Failed to generate creation tips' });
  }
});

// Get monetization strategies
router.post('/monetization', async (req, res) => {
  try {
    const { 
      platform, 
      niche, 
      audienceSize, 
      contentType, 
      currentRevenue 
    } = req.body;

    if (!platform || !niche) {
      return res.status(400).json({ 
        error: 'Platform and niche are required' 
      });
    }

    const monetization = await optimizationService.getMonetizationStrategies({
      platform,
      niche,
      audienceSize: audienceSize || 0,
      contentType: contentType || 'general',
      currentRevenue: currentRevenue || 0
    });

    res.json(monetization);
  } catch (error) {
    console.error('Monetization strategies error:', error);
    res.status(500).json({ error: 'Failed to generate monetization strategies' });
  }
});

// Get growth optimization plan
router.post('/growth-plan', async (req, res) => {
  try {
    const { 
      currentMetrics, 
      goals, 
      timeframe, 
      platform, 
      niche 
    } = req.body;

    if (!platform || !goals) {
      return res.status(400).json({ 
        error: 'Platform and goals are required' 
      });
    }

    const growthPlan = await optimizationService.getGrowthPlan({
      currentMetrics: currentMetrics || {},
      goals,
      timeframe: timeframe || '3months',
      platform,
      niche: niche || 'general'
    });

    res.json(growthPlan);
  } catch (error) {
    console.error('Growth plan error:', error);
    res.status(500).json({ error: 'Failed to generate growth plan' });
  }
});

module.exports = router;