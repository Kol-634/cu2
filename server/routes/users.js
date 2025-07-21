const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Create user profile
router.post('/profile', async (req, res) => {
  try {
    const profileData = req.body;
    
    if (!profileData.platform || !profileData.niche) {
      return res.status(400).json({ 
        error: 'Platform and niche are required' 
      });
    }

    const profile = await userService.createProfile(profileData);
    res.status(201).json(profile);
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await userService.getProfile(userId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Profile retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    
    const updatedProfile = await userService.updateProfile(userId, updateData);
    
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(updatedProfile);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Save user preferences
router.post('/preferences', async (req, res) => {
  try {
    const { userId, preferences } = req.body;
    
    if (!userId || !preferences) {
      return res.status(400).json({ 
        error: 'User ID and preferences are required' 
      });
    }

    const savedPreferences = await userService.savePreferences(userId, preferences);
    res.json(savedPreferences);
  } catch (error) {
    console.error('Preferences save error:', error);
    res.status(500).json({ error: 'Failed to save preferences' });
  }
});

// Get user preferences
router.get('/preferences/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const preferences = await userService.getPreferences(userId);
    
    res.json(preferences || {});
  } catch (error) {
    console.error('Preferences retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve preferences' });
  }
});

// Save content metrics
router.post('/metrics', async (req, res) => {
  try {
    const { userId, platform, metrics } = req.body;
    
    if (!userId || !platform || !metrics) {
      return res.status(400).json({ 
        error: 'User ID, platform, and metrics are required' 
      });
    }

    const savedMetrics = await userService.saveMetrics(userId, platform, metrics);
    res.json(savedMetrics);
  } catch (error) {
    console.error('Metrics save error:', error);
    res.status(500).json({ error: 'Failed to save metrics' });
  }
});

// Get user metrics history
router.get('/metrics/:userId/:platform', async (req, res) => {
  try {
    const { userId, platform } = req.params;
    const { timeframe } = req.query;
    
    const metrics = await userService.getMetricsHistory(
      userId, 
      platform, 
      timeframe || '30d'
    );
    
    res.json(metrics);
  } catch (error) {
    console.error('Metrics retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve metrics' });
  }
});

// Get user dashboard data
router.get('/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const dashboardData = await userService.getDashboardData(userId);
    
    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ error: 'Failed to retrieve dashboard data' });
  }
});

module.exports = router;