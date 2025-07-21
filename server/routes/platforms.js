const express = require('express');
const router = express.Router();
const platformService = require('../services/platformService');

// Get all supported platforms
router.get('/', async (req, res) => {
  try {
    const platforms = await platformService.getAllPlatforms();
    res.json(platforms);
  } catch (error) {
    console.error('Platforms error:', error);
    res.status(500).json({ error: 'Failed to fetch platforms' });
  }
});

// Get platform-specific information
router.get('/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const platformInfo = await platformService.getPlatformInfo(platform);
    
    if (!platformInfo) {
      return res.status(404).json({ error: 'Platform not found' });
    }
    
    res.json(platformInfo);
  } catch (error) {
    console.error('Platform info error:', error);
    res.status(500).json({ error: 'Failed to fetch platform information' });
  }
});

// Get platform requirements and specifications
router.get('/:platform/requirements', async (req, res) => {
  try {
    const { platform } = req.params;
    const { contentType } = req.query;
    
    const requirements = await platformService.getPlatformRequirements(
      platform, 
      contentType
    );
    
    res.json(requirements);
  } catch (error) {
    console.error('Platform requirements error:', error);
    res.status(500).json({ error: 'Failed to fetch platform requirements' });
  }
});

// Get platform algorithm insights
router.get('/:platform/algorithm', async (req, res) => {
  try {
    const { platform } = req.params;
    const algorithmInfo = await platformService.getAlgorithmInsights(platform);
    
    res.json(algorithmInfo);
  } catch (error) {
    console.error('Algorithm insights error:', error);
    res.status(500).json({ error: 'Failed to fetch algorithm insights' });
  }
});

// Get platform monetization options
router.get('/:platform/monetization', async (req, res) => {
  try {
    const { platform } = req.params;
    const { audienceSize, niche } = req.query;
    
    const monetization = await platformService.getMonetizationOptions(
      platform,
      parseInt(audienceSize) || 0,
      niche
    );
    
    res.json(monetization);
  } catch (error) {
    console.error('Monetization options error:', error);
    res.status(500).json({ error: 'Failed to fetch monetization options' });
  }
});

// Get platform best practices
router.get('/:platform/best-practices', async (req, res) => {
  try {
    const { platform } = req.params;
    const { contentType, niche } = req.query;
    
    const bestPractices = await platformService.getBestPractices(
      platform,
      contentType,
      niche
    );
    
    res.json(bestPractices);
  } catch (error) {
    console.error('Best practices error:', error);
    res.status(500).json({ error: 'Failed to fetch best practices' });
  }
});

// Compare platforms
router.post('/compare', async (req, res) => {
  try {
    const { platforms, criteria } = req.body;
    
    if (!platforms || !Array.isArray(platforms) || platforms.length < 2) {
      return res.status(400).json({ 
        error: 'At least 2 platforms are required for comparison' 
      });
    }
    
    const comparison = await platformService.comparePlatforms(
      platforms,
      criteria || {}
    );
    
    res.json(comparison);
  } catch (error) {
    console.error('Platform comparison error:', error);
    res.status(500).json({ error: 'Failed to compare platforms' });
  }
});

module.exports = router;