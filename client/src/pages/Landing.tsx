import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Smartphone
} from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Deep insights into your content performance with real-time analytics and trend analysis.'
    },
    {
      icon: Target,
      title: 'Smart Optimization',
      description: 'AI-powered recommendations to optimize your content strategy and maximize engagement.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Strategy',
      description: 'Personalized growth plans tailored to your niche, platform, and experience level.'
    },
    {
      icon: Smartphone,
      title: 'Multi-Platform Support',
      description: 'Optimize for YouTube, TikTok, Instagram, Twitter, LinkedIn, and more platforms.'
    },
    {
      icon: Users,
      title: 'Audience Insights',
      description: 'Understand your audience better with demographic analysis and engagement patterns.'
    },
    {
      icon: Zap,
      title: 'Automation Tools',
      description: 'Streamline your workflow with automated posting schedules and content planning.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'YouTube Creator',
      content: 'CreatorIQ helped me grow from 10K to 100K subscribers in just 6 months!',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Rodriguez',
      role: 'TikTok Influencer',
      content: 'The optimization suggestions increased my engagement rate by 300%.',
      avatar: '👨‍🎨'
    },
    {
      name: 'Emma Wilson',
      role: 'Instagram Creator',
      content: 'Finally understand what content works and when to post it. Game changer!',
      avatar: '👩‍💻'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Basic analytics',
        '1 platform',
        'Weekly reports',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      features: [
        'Advanced analytics',
        'All platforms',
        'Daily insights',
        'AI optimization',
        'Priority support',
        'Custom reports'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'API access',
        'White-label reports',
        'Dedicated support',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">CreatorIQ</span>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="/app"
                className="btn-primary"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Supercharge your</span>{' '}
                  <span className="block text-primary-600 xl:inline">content creation</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get AI-powered insights, optimization recommendations, and growth strategies 
                  tailored to your platform and niche. Turn data into successful content.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/app"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start analyzing for free
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10">
                      <Play className="mr-2 h-5 w-5" />
                      Watch demo
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Powerful tools and insights to help you create better content, grow your audience, and monetize your passion.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="relative">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                    <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Loved by creators worldwide
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  <div className="flex mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Pricing</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`card relative ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="card-content">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                      <span className="text-base font-medium text-gray-500">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="flex-shrink-0 h-5 w-5 text-success-500 mr-3" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      to="/app"
                      className={`w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                    >
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to boost your content?</span>
            <span className="block">Start your free analysis today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-200">
            Join thousands of creators who are already growing their audience with data-driven insights.
          </p>
          <Link
            to="/app"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto"
          >
            Start free analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-primary-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">CreatorIQ</span>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 CreatorIQ. Made with ❤️ for content creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;