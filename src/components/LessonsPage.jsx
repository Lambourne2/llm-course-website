import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Play, 
  Star,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const lessonsData = [
  {
    id: 1,
    title: "LLM Fundamentals",
    description: "Understanding the foundations of Large Language Models",
    difficulty: "Beginner",
    duration: "45 min",
    sections: 3,
    isLocked: false,
    objectives: [
      "Understand what Large Language Models are",
      "Learn the basic architecture components", 
      "Explore the transformer foundation"
    ]
  },
  {
    id: 2,
    title: "Text Data Handling",
    description: "Working with text data, tokenization, and preprocessing",
    difficulty: "Beginner", 
    duration: "60 min",
    sections: 4,
    isLocked: true,
    objectives: [
      "Master text tokenization techniques",
      "Implement data preprocessing pipelines",
      "Build efficient data loaders"
    ]
  },
  {
    id: 3,
    title: "Attention Mechanisms",
    description: "Deep dive into self-attention and multi-head attention",
    difficulty: "Intermediate",
    duration: "75 min", 
    sections: 5,
    isLocked: true,
    objectives: [
      "Understand attention mechanisms",
      "Implement self-attention from scratch",
      "Build multi-head attention layers"
    ]
  },
  {
    id: 4,
    title: "Building the GPT Model",
    description: "Implementing a GPT-style transformer from scratch",
    difficulty: "Intermediate",
    duration: "90 min",
    sections: 6,
    isLocked: true,
    objectives: [
      "Implement the full GPT architecture",
      "Understand layer normalization", 
      "Build the complete model pipeline"
    ]
  },
  {
    id: 5,
    title: "Training Loop Implementation",
    description: "Setting up training, loss functions, and optimization",
    difficulty: "Intermediate",
    duration: "85 min",
    sections: 5,
    isLocked: true,
    objectives: [
      "Design pretraining strategies",
      "Implement training loops",
      "Optimize model performance"
    ]
  },
  {
    id: 6,
    title: "Fine-tuning and Evaluation",
    description: "Fine-tuning pre-trained models and evaluation metrics",
    difficulty: "Advanced",
    duration: "70 min",
    sections: 4,
    isLocked: true,
    objectives: [
      "Implement fine-tuning techniques",
      "Build classification heads",
      "Evaluate model performance"
    ]
  },
  {
    id: 7,
    title: "Advanced Topics",
    description: "Scaling, optimization, and deployment considerations",
    difficulty: "Advanced",
    duration: "95 min",
    sections: 6,
    isLocked: true,
    objectives: [
      "Understand instruction following",
      "Implement RLHF techniques", 
      "Build conversational AI"
    ]
  }
];

function LessonsPage() {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [hoveredLesson, setHoveredLesson] = useState(null);

  useEffect(() => {
    // Check enrollment status from localStorage
    const enrollment = localStorage.getItem('courseEnrollment');
    if (enrollment) {
      const enrollmentData = JSON.parse(enrollment);
      setIsEnrolled(enrollmentData.enrolled);
    }

    // Load completed lessons from localStorage
    const completed = localStorage.getItem('completedLessons');
    if (completed) {
      setCompletedLessons(new Set(JSON.parse(completed)));
    }
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLessonClick = (lesson) => {
    if (lesson.isLocked && !isEnrolled) {
      // Show enrollment prompt
      navigate('/#pricing');
    } else {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  const totalLessons = lessonsData.length;
  const completedCount = completedLessons.size;
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Course Lessons
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Seven comprehensive lessons that take you from zero to building your own ChatGPT-like model.
              </p>
              
              {/* Progress Overview */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Your Progress</span>
                  <span className="text-sm text-gray-500">{completedCount}/{totalLessons} lessons</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="text-center">
              <CardContent className="pt-6">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{totalLessons}</div>
                <div className="text-sm text-gray-600">Total Lessons</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">8+ hrs</div>
                <div className="text-sm text-gray-600">Total Duration</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Difficulty Levels</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Lessons Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {lessonsData.map((lesson, index) => {
            const isLocked = lesson.isLocked && !isEnrolled;
            const isCompleted = completedLessons.has(lesson.id);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredLesson(lesson.id)}
                onHoverEnd={() => setHoveredLesson(null)}
              >
                <Card 
                  className={`h-full transition-all duration-300 cursor-pointer ${
                    hoveredLesson === lesson.id ? 'shadow-lg scale-105' : 'shadow-md'
                  } ${isLocked ? 'opacity-75' : ''}`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline">Lesson {lesson.id}</Badge>
                          <Badge className={getDifficultyColor(lesson.difficulty)}>
                            {lesson.difficulty}
                          </Badge>
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm">{lesson.duration}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2 flex items-center">
                          {lesson.title}
                          {isCompleted && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                          )}
                          {isLocked && (
                            <Lock className="h-5 w-5 text-amber-500 ml-2" />
                          )}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {lesson.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Learning Objectives */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Learning Objectives:</h4>
                        <ul className="space-y-1">
                          {lesson.objectives.map((objective, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Lesson Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {lesson.sections} sections
                          </div>
                        </div>
                        
                        <Button 
                          className={`${
                            isLocked 
                              ? 'bg-amber-600 hover:bg-amber-700' 
                              : isCompleted
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {isLocked ? (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              Unlock
                            </>
                          ) : isCompleted ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Review
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              {lesson.id === 1 ? 'Start Free' : 'Start Lesson'}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Enrollment CTA */}
        {!isEnrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Unlock All Lessons?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Get full access to all 7 lessons, interactive coding exercises, downloadable resources, 
                  and join our community of learners building the future of AI.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => navigate('/#pricing')}
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    View Pricing Plans
                  </Button>
                  <div className="text-blue-100">
                    <div className="text-sm">Starting at</div>
                    <div className="text-xl font-bold">$49</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default LessonsPage;

