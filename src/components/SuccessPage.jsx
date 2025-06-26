import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  BookOpen, 
  Download, 
  Users, 
  Mail,
  ArrowRight,
  Gift,
  Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you would verify the payment with Stripe
    // using the session_id from the URL parameters
    const sessionId = searchParams.get('session_id');
    
    // Simulate payment verification
    setTimeout(() => {
      // For demo purposes, we'll create mock enrollment data
      const mockEnrollmentData = {
        enrolled: true,
        type: 'full', // This would come from your payment verification
        enrolledAt: new Date().toISOString(),
        plan: {
          name: 'Full Course',
          price: 49
        },
        paymentId: sessionId || `demo_payment_${Date.now()}`,
        amount: 49
      };

      // Save enrollment data
      localStorage.setItem('courseEnrollment', JSON.stringify(mockEnrollmentData));
      setEnrollmentData(mockEnrollmentData);
      setIsLoading(false);
    }, 1500);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <CardContent>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Confirming Your Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your payment and set up your account...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Header */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </motion.div>
              
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                🎉 Welcome to the Course!
              </CardTitle>
              
              <CardDescription className="text-lg text-gray-700">
                Your payment was successful and you now have full access to all course materials.
              </CardDescription>
              
              <div className="flex items-center justify-center space-x-4 mt-6">
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  {enrollmentData?.plan?.name}
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  Lifetime Access
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* What's Next Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                    Start Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Jump right into the course content. All 7 lessons are now unlocked and ready for you.
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/lessons')}
                  >
                    Go to Lessons
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Download className="h-6 w-6 text-purple-600 mr-3" />
                    Download Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Access all course materials, code examples, and bonus resources in your student dashboard.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/resources')}
                  >
                    Access Resources
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Course Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">What You Get</CardTitle>
                <CardDescription className="text-center">
                  Here's everything included in your course enrollment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">7 Comprehensive Lessons</h3>
                    <p className="text-sm text-gray-600">
                      From LLM fundamentals to building your own ChatGPT-like model
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Gift className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Interactive Exercises</h3>
                    <p className="text-sm text-gray-600">
                      Hands-on coding exercises with real-time feedback
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Community Access</h3>
                    <p className="text-sm text-gray-600">
                      Join our community of learners and get help when needed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Mail className="h-6 w-6 text-blue-600 mr-3" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Confirmation Email</p>
                    <p className="text-sm text-gray-600">
                      A confirmation email with your receipt and access details has been sent to your email address.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Lifetime Access</p>
                    <p className="text-sm text-gray-600">
                      Your access never expires. Learn at your own pace and revisit materials anytime.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Future Updates</p>
                    <p className="text-sm text-gray-600">
                      You'll automatically receive all future course updates and new content at no extra cost.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Build Your First LLM?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Your learning journey starts now. Begin with Lesson 1 and work your way through 
              building a complete Large Language Model from scratch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/lessons')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default SuccessPage;

