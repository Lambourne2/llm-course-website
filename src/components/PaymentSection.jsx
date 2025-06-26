import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Star, 
  Users, 
  BookOpen, 
  Code, 
  MessageCircle, 
  Download,
  Infinity,
  Crown,
  Zap,
  Shield,
  Award
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const pricingPlans = [
  {
    id: 'free',
    name: 'Free Preview',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Access to Lesson 1',
      'Basic course materials',
      'Community forum access',
      'Email support'
    ],
    limitations: [
      'Limited to first lesson only',
      'No downloadable resources',
      'No interactive exercises'
    ],
    buttonText: 'Start Free',
    buttonVariant: 'outline',
    popular: false,
    stripeProductId: null
  },
  {
    id: 'full',
    name: 'Full Course',
    price: 49,
    period: 'one-time',
    description: 'Complete learning experience',
    features: [
      'All 7 comprehensive lessons',
      'Interactive coding exercises',
      'Downloadable resources & code',
      'Progress tracking',
      'Community forum access',
      'Email support',
      'Lifetime access',
      'Future course updates'
    ],
    buttonText: 'Enroll Now',
    buttonVariant: 'default',
    popular: true,
    stripeProductId: 'price_full_course_49',
    savings: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium Mentorship',
    price: 199,
    period: 'one-time',
    description: 'Complete course + personal guidance',
    features: [
      'Everything in Full Course',
      '1-on-1 mentorship sessions (3 hours)',
      'Code review & feedback',
      'Career guidance',
      'Priority support',
      'Direct access to instructor',
      'Custom project assistance',
      'LinkedIn recommendation'
    ],
    buttonText: 'Get Mentorship',
    buttonVariant: 'default',
    popular: false,
    stripeProductId: 'price_premium_199',
    savings: 'Best Value'
  }
];

function PaymentSection() {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentType, setEnrollmentType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check enrollment status from localStorage
    const enrollment = localStorage.getItem('courseEnrollment');
    if (enrollment) {
      const enrollmentData = JSON.parse(enrollment);
      setIsEnrolled(enrollmentData.enrolled);
      setEnrollmentType(enrollmentData.type);
    }
  }, []);

  const handlePayment = async (plan) => {
    if (plan.id === 'free') {
      // Handle free enrollment
      const enrollmentData = {
        enrolled: true,
        type: 'free',
        enrolledAt: new Date().toISOString(),
        plan: plan
      };
      localStorage.setItem('courseEnrollment', JSON.stringify(enrollmentData));
      setIsEnrolled(true);
      setEnrollmentType('free');
      
      // Show success message
      alert('Welcome! You now have access to Lesson 1. Enjoy your free preview!');
      return;
    }

    if (!plan.stripeProductId) {
      alert('Payment integration coming soon!');
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, this would integrate with Stripe
      // For demo purposes, we'll simulate the payment flow
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, we'll show the Stripe-like flow
      const confirmed = window.confirm(
        `This would redirect you to Stripe to pay $${plan.price} for the ${plan.name}. ` +
        `For demo purposes, click OK to simulate successful payment.`
      );
      
      if (confirmed) {
        // Simulate successful payment
        const enrollmentData = {
          enrolled: true,
          type: plan.id,
          enrolledAt: new Date().toISOString(),
          plan: plan,
          paymentId: `demo_payment_${Date.now()}`,
          amount: plan.price
        };
        
        localStorage.setItem('courseEnrollment', JSON.stringify(enrollmentData));
        setIsEnrolled(true);
        setEnrollmentType(plan.id);
        
        // Show success message
        alert(`🎉 Payment successful! Welcome to the ${plan.name}! You now have full access to all course materials.`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Real Stripe integration code (commented out for demo)
  /*
  const handleStripePayment = async (priceId) => {
    setIsLoading(true);
    
    try {
      // This would be your actual Stripe integration
      const stripe = await stripePromise;
      
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: priceId,
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancel`,
        customerEmail: userEmail, // You'd collect this
      });

      if (error) {
        console.error('Stripe error:', error);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  */

  if (isEnrolled) {
    return (
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-green-800">You're Enrolled! 🎉</CardTitle>
                <CardDescription className="text-green-700">
                  {enrollmentType === 'free' 
                    ? 'You have access to Lesson 1. Ready to unlock the full course?'
                    : `You have full access to the ${pricingPlans.find(p => p.id === enrollmentType)?.name || 'course'}.`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrollmentType === 'free' ? (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Enjoying the free lesson? Upgrade to get access to all 7 lessons and premium features.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {pricingPlans.slice(1).map((plan) => (
                          <Card key={plan.id} className="border-2 border-blue-200">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">{plan.name}</CardTitle>
                              <div className="text-2xl font-bold text-blue-600">
                                ${plan.price}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <Button 
                                className="w-full"
                                onClick={() => handlePayment(plan)}
                                disabled={isLoading}
                              >
                                {isLoading ? 'Processing...' : `Upgrade to ${plan.name}`}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-4">
                        <Badge className="bg-green-100 text-green-800">
                          {pricingPlans.find(p => p.id === enrollmentType)?.name}
                        </Badge>
                        <Badge variant="outline">
                          Lifetime Access
                        </Badge>
                      </div>
                      <Button 
                        size="lg"
                        onClick={() => window.location.href = '/lessons'}
                        className="w-full max-w-md mx-auto"
                      >
                        <BookOpen className="mr-2 h-5 w-5" />
                        Continue Learning
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with our free preview or unlock the complete course experience. 
            All plans include lifetime access and future updates.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    {plan.savings}
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200'} transition-all duration-300 hover:shadow-lg`}>
                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center mb-4">
                    {plan.id === 'free' && <BookOpen className="h-8 w-8 text-blue-600" />}
                    {plan.id === 'full' && <Zap className="h-8 w-8 text-purple-600" />}
                    {plan.id === 'premium' && <Crown className="h-8 w-8 text-amber-600" />}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500 ml-2">/{plan.period}</span>
                      )}
                    </div>
                  </div>
                  
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations for free plan */}
                  {plan.limitations && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500 mb-2">Limitations:</div>
                      <div className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0">
                              <div className="h-2 w-2 bg-gray-300 rounded-full mt-1.5 mx-auto"></div>
                            </div>
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="pt-6">
                    <Button
                      className={`w-full py-3 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                          : plan.id === 'premium'
                          ? 'bg-amber-600 hover:bg-amber-700'
                          : ''
                      }`}
                      variant={plan.buttonVariant}
                      size="lg"
                      onClick={() => handlePayment(plan)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        plan.buttonText
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <div className="font-semibold text-gray-900">Secure Payment</div>
              <div className="text-sm text-gray-600">256-bit SSL encryption</div>
            </div>
            <div className="flex flex-col items-center">
              <Infinity className="h-8 w-8 text-green-600 mb-2" />
              <div className="font-semibold text-gray-900">Lifetime Access</div>
              <div className="text-sm text-gray-600">Learn at your own pace</div>
            </div>
            <div className="flex flex-col items-center">
              <Download className="h-8 w-8 text-purple-600 mb-2" />
              <div className="font-semibold text-gray-900">All Resources</div>
              <div className="text-sm text-gray-600">Code, slides, and more</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-amber-600 mb-2" />
              <div className="font-semibold text-gray-900">30-Day Guarantee</div>
              <div className="text-sm text-gray-600">Money-back promise</div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                What's included in the free preview?
              </h4>
              <p className="text-gray-600">
                The free preview includes full access to Lesson 1, which covers LLM fundamentals. 
                You'll get a complete understanding of what the full course offers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How long do I have access?
              </h4>
              <p className="text-gray-600">
                All paid plans include lifetime access. You can learn at your own pace and 
                revisit the materials anytime, plus you'll get all future updates.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                What if I'm not satisfied?
              </h4>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee. If you're not completely satisfied 
                with the course, we'll refund your payment, no questions asked.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Do I need prior AI experience?
              </h4>
              <p className="text-gray-600">
                No prior AI experience is required! The course starts from the basics and 
                gradually builds up to advanced concepts. Basic Python knowledge is helpful but not required.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PaymentSection;

