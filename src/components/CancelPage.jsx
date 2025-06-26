import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  XCircle, 
  ArrowLeft, 
  BookOpen, 
  MessageCircle,
  HelpCircle,
  CreditCard,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

function CancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Cancel Header */}
          <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="bg-orange-100 p-4 rounded-full">
                  <XCircle className="h-16 w-16 text-orange-600" />
                </div>
              </motion.div>
              
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Payment Cancelled
              </CardTitle>
              
              <CardDescription className="text-lg text-gray-700">
                No worries! Your payment was cancelled and no charges were made to your account.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* What Happened Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">What Happened?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  You cancelled the payment process before it was completed. This is completely normal and happens for various reasons:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>You decided to review the course content first</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>You wanted to compare different pricing options</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>You encountered a technical issue during checkout</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>You simply changed your mind (that's okay too!)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Options Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                    Try Our Free Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Not ready to commit? Start with our free preview to get a taste of what the full course offers.
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/lesson/1')}
                  >
                    Start Free Preview
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                    Try Again
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ready to enroll? You can return to the pricing page and complete your purchase anytime.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/#pricing')}
                  >
                    View Pricing Options
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="mb-8 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <HelpCircle className="h-6 w-6 text-blue-600 mr-3" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you encountered any issues during checkout or have questions about the course, we're here to help!
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Contact Support</p>
                      <p className="text-sm text-gray-600">
                        Email us at support@llmcourse.com for technical issues or questions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Secure Payments</p>
                      <p className="text-sm text-gray-600">
                        All payments are processed securely through Stripe with 256-bit encryption
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Common Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Will I be charged if I cancelled?
                    </h4>
                    <p className="text-gray-600">
                      No, absolutely not. When you cancel during checkout, no payment is processed and 
                      no charges are made to your card or account.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Can I still access the free content?
                    </h4>
                    <p className="text-gray-600">
                      Yes! Our free preview (Lesson 1) is always available. You can start learning 
                      immediately without any payment required.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What if I want to enroll later?
                    </h4>
                    <p className="text-gray-600">
                      You can enroll anytime! The course will always be available, and you'll get 
                      lifetime access plus all future updates when you do decide to join.
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
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What Would You Like to Do Next?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/lesson/1')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Try Free Preview
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default CancelPage;

