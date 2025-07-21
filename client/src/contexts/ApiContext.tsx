import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface ApiContextType {
  loading: boolean;
  error: string | null;
  // Analytics API
  analyzeContent: (data: any) => Promise<any>;
  getTrending: (platform: string, category?: string) => Promise<any>;
  analyzeCompetitors: (data: any) => Promise<any>;
  getOptimalTimes: (platform: string, timezone?: string) => Promise<any>;
  analyzeHashtags: (data: any) => Promise<any>;
  // Optimization API
  getContentStrategy: (data: any) => Promise<any>;
  getUploadStrategy: (data: any) => Promise<any>;
  getSponsorshipGuidance: (data: any) => Promise<any>;
  getCreationTips: (data: any) => Promise<any>;
  getMonetizationStrategies: (data: any) => Promise<any>;
  getGrowthPlan: (data: any) => Promise<any>;
  // Platform API
  getAllPlatforms: () => Promise<any>;
  getPlatformInfo: (platform: string) => Promise<any>;
  getPlatformRequirements: (platform: string, contentType?: string) => Promise<any>;
  getAlgorithmInsights: (platform: string) => Promise<any>;
  getBestPractices: (platform: string, contentType?: string) => Promise<any>;
  comparePlatforms: (platforms: string[], criteria?: any) => Promise<any>;
  // User API
  createProfile: (data: any) => Promise<any>;
  getProfile: (userId: string) => Promise<any>;
  updateProfile: (userId: string, data: any) => Promise<any>;
  getDashboard: (userId: string) => Promise<any>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' = 'GET', data?: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const config = {
        method,
        url: `${API_BASE_URL}${endpoint}`,
        ...(data && { data }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const response = await axios(config);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Analytics API methods
  const analyzeContent = (data: any) => apiCall('/analytics/analyze', 'POST', data);
  const getTrending = (platform: string, category?: string) => 
    apiCall(`/analytics/trending/${platform}${category ? `?category=${category}` : ''}`);
  const analyzeCompetitors = (data: any) => apiCall('/analytics/competitor-analysis', 'POST', data);
  const getOptimalTimes = (platform: string, timezone?: string) => 
    apiCall(`/analytics/optimal-times/${platform}${timezone ? `?timezone=${timezone}` : ''}`);
  const analyzeHashtags = (data: any) => apiCall('/analytics/hashtag-analysis', 'POST', data);

  // Optimization API methods
  const getContentStrategy = (data: any) => apiCall('/optimization/strategy', 'POST', data);
  const getUploadStrategy = (data: any) => apiCall('/optimization/upload-strategy', 'POST', data);
  const getSponsorshipGuidance = (data: any) => apiCall('/optimization/sponsorship-guidance', 'POST', data);
  const getCreationTips = (data: any) => apiCall('/optimization/creation-tips', 'POST', data);
  const getMonetizationStrategies = (data: any) => apiCall('/optimization/monetization', 'POST', data);
  const getGrowthPlan = (data: any) => apiCall('/optimization/growth-plan', 'POST', data);

  // Platform API methods
  const getAllPlatforms = () => apiCall('/platforms');
  const getPlatformInfo = (platform: string) => apiCall(`/platforms/${platform}`);
  const getPlatformRequirements = (platform: string, contentType?: string) => 
    apiCall(`/platforms/${platform}/requirements${contentType ? `?contentType=${contentType}` : ''}`);
  const getAlgorithmInsights = (platform: string) => apiCall(`/platforms/${platform}/algorithm`);
  const getBestPractices = (platform: string, contentType?: string) => 
    apiCall(`/platforms/${platform}/best-practices${contentType ? `?contentType=${contentType}` : ''}`);
  const comparePlatforms = (platforms: string[], criteria?: any) => 
    apiCall('/platforms/compare', 'POST', { platforms, criteria });

  // User API methods
  const createProfile = (data: any) => apiCall('/users/profile', 'POST', data);
  const getProfile = (userId: string) => apiCall(`/users/profile/${userId}`);
  const updateProfile = (userId: string, data: any) => apiCall(`/users/profile/${userId}`, 'PUT', data);
  const getDashboard = (userId: string) => apiCall(`/users/dashboard/${userId}`);

  const value: ApiContextType = {
    loading,
    error,
    // Analytics
    analyzeContent,
    getTrending,
    analyzeCompetitors,
    getOptimalTimes,
    analyzeHashtags,
    // Optimization
    getContentStrategy,
    getUploadStrategy,
    getSponsorshipGuidance,
    getCreationTips,
    getMonetizationStrategies,
    getGrowthPlan,
    // Platforms
    getAllPlatforms,
    getPlatformInfo,
    getPlatformRequirements,
    getAlgorithmInsights,
    getBestPractices,
    comparePlatforms,
    // Users
    createProfile,
    getProfile,
    updateProfile,
    getDashboard,
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};