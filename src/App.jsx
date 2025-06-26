import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  CheckCircle, 
  Code, 
  Zap, 
  Globe,
  Award,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import academicLogo from './assets/academic-logo.jpg';
import LessonsPage from './components/LessonsPage';
import LessonPage from './components/LessonPage';
import PaymentSection from './components/PaymentSection';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import './App.css';

function App() {
  return (
    <Router basename={window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "/" : "/llm-course-website"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={academicLogo} alt="Academic Logo" className="h-10 w-10 rounded-full" />
              <div>
                <div className="text-xl font-bold text-gray-900">LLMs From Scratch</div>
                <div className="text-sm text-gray-600">Interactive Learning Platform</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</button>
              <button onClick={() => navigate('/lessons')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Lessons</button>
              <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/lessons')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
                Build Large Language Models
                <br />
                From Scratch
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Ever wondered how ChatGPT actually works? Join thousands of learners who've discovered the magic behind 
                AI through our hands-on, interactive course. No PhD required!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={() => navigate('/lessons')}>
                  Start Learning Now
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/lesson/1')}>
                  View Course Preview
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-green-600">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-amber-600">50+</div>
              <div className="text-gray-600">Coding Exercises</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Learn With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique approach combines academic rigor with practical application, making complex AI concepts accessible to everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>From First Principles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Start with the basics and build your understanding step by step, no prior AI experience needed.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Hands-On Coding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Interactive coding exercises with real-time feedback help you learn by doing, not just reading.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Community Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Join our active community of learners and get help when you need it from peers and instructors.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Curriculum</h2>
            <p className="text-xl text-gray-600">
              Seven comprehensive lessons that take you from zero to building your own ChatGPT-like model.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              { id: 1, title: "LLM Fundamentals", duration: "45 min", difficulty: "Beginner" },
              { id: 2, title: "Text Data Handling", duration: "60 min", difficulty: "Beginner" },
              { id: 3, title: "Attention Mechanisms", duration: "75 min", difficulty: "Intermediate" },
              { id: 4, title: "Building the GPT Model", duration: "90 min", difficulty: "Intermediate" },
              { id: 5, title: "Training Loop Implementation", duration: "85 min", difficulty: "Intermediate" },
              { id: 6, title: "Fine-tuning and Evaluation", duration: "70 min", difficulty: "Advanced" },
              { id: 7, title: "Advanced Topics", duration: "95 min", difficulty: "Advanced" }
            ].map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">Lesson {lesson.id}</Badge>
                        <CardTitle className="text-xl">{lesson.title}</CardTitle>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{lesson.duration}</div>
                        <Badge className={
                          lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {lesson.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <PaymentSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Your First LLM?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who've mastered the art of building AI from the ground up.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" onClick={() => navigate('/lessons')}>
            Start Your Journey Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Router basename={window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "/" : "/llm-course-website"}>
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <img src={academicLogo} alt="Academic Logo" className="h-8 w-8 rounded-full" />
                  <div className="text-lg font-bold">LLMs From Scratch</div>
                </div>
                <p className="text-gray-400">
                  Learn to build Large Language Models from the ground up with our comprehensive, hands-on course.
                </p>
              </div>
              <p className="text-gray-400">
                Learn to build Large Language Models from the ground up with our comprehensive, hands-on course.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Course</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/lessons')} className="hover:text-white transition-colors">Lessons</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About</button></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LLMs From Scratch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AboutPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={academicLogo} alt="Academic Logo" className="h-10 w-10 rounded-full" />
              <div>
                <div className="text-xl font-bold text-gray-900">LLMs From Scratch</div>
                <div className="text-sm text-gray-600">Interactive Learning Platform</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</button>
              <button onClick={() => navigate('/lessons')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Lessons</button>
              <button onClick={() => navigate('/about')} className="text-blue-600 font-medium">About</button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/lessons')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About This Course</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                This comprehensive course takes you through the complete journey of building Large Language Models from scratch. 
                Based on cutting-edge research and practical implementation, you'll learn every component that makes models like ChatGPT work.
              </p>
              <p className="text-gray-600 mb-4">
                Unlike other courses that only cover theory, this hands-on program includes interactive coding exercises, 
                real implementations, and practical projects that you can add to your portfolio.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Skills</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Transformer architecture implementation</li>
                    <li>• Attention mechanisms and self-attention</li>
                    <li>• Text tokenization and preprocessing</li>
                    <li>• Training loops and optimization</li>
                    <li>• Fine-tuning and evaluation techniques</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Practical Applications</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Build your own ChatGPT-like model</li>
                    <li>• Create text generation systems</li>
                    <li>• Implement classification models</li>
                    <li>• Deploy models for real-world use</li>
                    <li>• Scale and optimize performance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate('/lessons')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Learning Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;

