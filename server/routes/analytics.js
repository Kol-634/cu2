const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analyticsService');

// Analyze content performance
router.post('/analyze', async (req, res) => {
  try {
    const { platform, contentType, metrics, timeframe } = req.body;
    
    if (!platform || !contentType) {
      return res.status(400).json({ 
        error: 'Platform and content type are required' 
      });
    }

    const analysis = await analyticsService.analyzeContent({
      platform,
      contentType,
      metrics: metrics || {},
      timeframe: timeframe || '30d'
    });

    res.json(analysis);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to analyze content' });
  }
});

// Get trending topics for a platform
router.get('/trending/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const { category, region } = req.query;

    const trending = await analyticsService.getTrendingTopics({
      platform,
      category: category || 'general',
      region: region || 'global'
    });

    res.json(trending);
  } catch (error) {
    console.error('Trending topics error:', error);
    res.status(500).json({ error: 'Failed to fetch trending topics' });
  }
});

// Analyze competitor content
router.post('/competitor-analysis', async (req, res) => {
  try {
    const { platform, niche, competitors } = req.body;

    if (!platform || !niche) {
      return res.status(400).json({ 
        error: 'Platform and niche are required' 
      });
    }

    const analysis = await analyticsService.analyzeCompetitors({
      platform,
      niche,
      competitors: competitors || []
    });

    res.json(analysis);
  } catch (error) {
    console.error('Competitor analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze competitors' });
  }
});

// Get optimal posting times
router.get('/optimal-times/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const { timezone, contentType } = req.query;

    const optimalTimes = await analyticsService.getOptimalPostingTimes({
      platform,
      timezone: timezone || 'UTC',
      contentType: contentType || 'general'
    });

    res.json(optimalTimes);
  } catch (error) {
    console.error('Optimal times error:', error);
    res.status(500).json({ error: 'Failed to get optimal posting times' });
  }
});

// Analyze hashtag performance
router.post('/hashtag-analysis', async (req, res) => {
  try {
    const { platform, hashtags, niche } = req.body;

    if (!platform || !hashtags || !Array.isArray(hashtags)) {
      return res.status(400).json({ 
        error: 'Platform and hashtags array are required' 
      });
    }

    const analysis = await analyticsService.analyzeHashtags({
      platform,
      hashtags,
      niche: niche || 'general'
    });

    res.json(analysis);
  } catch (error) {
    console.error('Hashtag analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze hashtags' });
  }
});

module.exports = router;