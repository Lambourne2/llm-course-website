import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Code, 
  Lock,
  Unlock,
  ChevronRight,
  ChevronDown,
  Terminal,
  FileText,
  Lightbulb
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Lesson content data based on the LLMs-from-scratch repository
const lessonContent = {
  1: {
    title: "LLM Fundamentals",
    difficulty: "Beginner",
    duration: "45 min",
    description: "Understanding the foundations of Large Language Models",
    isLocked: false, // First lesson is always free
    sections: [
      {
        id: "introduction",
        title: "Introduction to Large Language Models",
        content: `
# What are Large Language Models?

Large Language Models (LLMs) are artificial intelligence systems designed to understand and generate human-like text. They represent one of the most significant breakthroughs in AI, powering applications like ChatGPT, GPT-4, and many others.

## Key Characteristics

**Scale**: LLMs are characterized by their enormous size, often containing billions or even trillions of parameters. These parameters are the learned weights that determine how the model processes and generates text.

**Training Data**: They are trained on vast amounts of text data from the internet, books, articles, and other sources, allowing them to learn patterns in human language.

**Emergent Abilities**: As these models grow larger, they develop unexpected capabilities that weren't explicitly programmed, such as reasoning, translation, and code generation.

## How LLMs Work

At their core, LLMs are prediction engines. Given a sequence of words (or tokens), they predict what word is most likely to come next. This simple concept, when scaled up with massive amounts of data and computational power, leads to remarkably sophisticated behavior.

The process involves:
1. **Tokenization**: Breaking text into smaller units (tokens)
2. **Embedding**: Converting tokens into numerical representations
3. **Attention**: Determining which parts of the input are most relevant
4. **Generation**: Producing the next token in the sequence
        `,
        codeExample: `# Simple example of text prediction concept
text = "The weather today is"
# LLM predicts: "sunny", "rainy", "cloudy", etc.

# In practice, this involves complex mathematical operations
# across billions of parameters
import torch
import torch.nn as nn

class SimpleLM(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.output = nn.Linear(hidden_dim, vocab_size)
    
    def forward(self, x):
        embedded = self.embedding(x)
        lstm_out, _ = self.lstm(embedded)
        return self.output(lstm_out)

# This is a simplified version - real LLMs use transformers!`
      },
      {
        id: "architecture",
        title: "Transformer Architecture Overview",
        content: `
# The Transformer Revolution

The transformer architecture, introduced in the paper "Attention Is All You Need" (2017), revolutionized natural language processing and became the foundation for modern LLMs.

## Key Components

**Self-Attention Mechanism**: Allows the model to focus on different parts of the input sequence when processing each token. This enables understanding of long-range dependencies in text.

**Multi-Head Attention**: Multiple attention mechanisms working in parallel, each focusing on different aspects of the relationships between tokens.

**Feed-Forward Networks**: Dense layers that process the attended information and add non-linearity to the model.

**Layer Normalization**: Stabilizes training and improves convergence by normalizing inputs to each layer.

**Positional Encoding**: Since transformers don't inherently understand sequence order, positional encodings are added to give the model information about token positions.

## Why Transformers Work So Well

1. **Parallelization**: Unlike RNNs, transformers can process all tokens simultaneously, making training much faster
2. **Long-range Dependencies**: Self-attention can directly connect distant tokens
3. **Scalability**: The architecture scales well with increased model size and data
4. **Transfer Learning**: Pre-trained transformers can be fine-tuned for specific tasks
        `,
        codeExample: `# Conceptual structure of a transformer layer
import torch
import torch.nn as nn
import torch.nn.functional as F

class TransformerBlock(nn.Module):
    def __init__(self, embed_dim, num_heads, ff_dim, dropout=0.1):
        super().__init__()
        self.attention = nn.MultiheadAttention(embed_dim, num_heads, dropout=dropout)
        self.feed_forward = nn.Sequential(
            nn.Linear(embed_dim, ff_dim),
            nn.ReLU(),
            nn.Linear(ff_dim, embed_dim)
        )
        self.norm1 = nn.LayerNorm(embed_dim)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, x):
        # Self-attention with residual connection
        attn_out, _ = self.attention(x, x, x)
        x = self.norm1(x + self.dropout(attn_out))
        
        # Feed-forward with residual connection
        ff_out = self.feed_forward(x)
        x = self.norm2(x + self.dropout(ff_out))
        
        return x

# A full transformer consists of multiple such blocks stacked together`
      }
    ],
    exercises: [
      {
        title: "Vocabulary Exercise",
        description: "Test your understanding of key LLM concepts",
        type: "quiz",
        questions: [
          {
            question: "What is the primary task that LLMs are trained to perform?",
            options: ["Image recognition", "Next token prediction", "Speech synthesis", "Data compression"],
            correct: 1
          },
          {
            question: "Which architecture is the foundation of modern LLMs?",
            options: ["CNN", "RNN", "Transformer", "LSTM"],
            correct: 2
          }
        ]
      }
    ]
  },
  2: {
    title: "Text Data Handling",
    difficulty: "Beginner",
    duration: "60 min",
    description: "Working with text data, tokenization, and preprocessing",
    isLocked: true,
    sections: [
      {
        id: "tokenization",
        title: "Understanding Tokenization",
        content: `
# Text Tokenization: Breaking Down Language

Tokenization is the process of converting raw text into smaller units called tokens that can be processed by machine learning models. This is a crucial first step in any NLP pipeline.

## Why Tokenization Matters

Computers can't directly understand text - they need numbers. Tokenization bridges this gap by:
1. Breaking text into manageable pieces
2. Creating a vocabulary of known tokens
3. Converting tokens to numerical IDs
4. Handling unknown or rare words

## Types of Tokenization

**Word-level Tokenization**: Splits text by whitespace and punctuation
- Simple and intuitive
- Large vocabulary size
- Struggles with out-of-vocabulary words

**Character-level Tokenization**: Each character is a token
- Small vocabulary
- Can handle any text
- Loses semantic meaning of words

**Subword Tokenization**: Breaks words into meaningful subunits
- Balances vocabulary size and semantic meaning
- Handles rare words better
- Used by most modern LLMs (BPE, WordPiece, SentencePiece)
        `,
        codeExample: `# Different tokenization approaches
import re
from collections import Counter

# Word-level tokenization
def word_tokenize(text):
    # Simple word tokenization
    tokens = re.findall(r'\b\w+\b', text.lower())
    return tokens

# Character-level tokenization
def char_tokenize(text):
    return list(text)

# Simple BPE-style subword tokenization concept
def simple_bpe_tokenize(text, vocab_size=1000):
    # Start with character-level tokens
    tokens = list(text)
    
    # Iteratively merge most frequent pairs
    for _ in range(vocab_size - len(set(tokens))):
        pairs = Counter()
        for i in range(len(tokens) - 1):
            pairs[(tokens[i], tokens[i+1])] += 1
        
        if not pairs:
            break
            
        most_frequent = pairs.most_common(1)[0][0]
        new_tokens = []
        i = 0
        while i < len(tokens):
            if (i < len(tokens) - 1 and 
                tokens[i] == most_frequent[0] and 
                tokens[i+1] == most_frequent[1]):
                new_tokens.append(most_frequent[0] + most_frequent[1])
                i += 2
            else:
                new_tokens.append(tokens[i])
                i += 1
        tokens = new_tokens
    
    return tokens

# Example usage
text = "Hello world! This is tokenization."
print("Word tokens:", word_tokenize(text))
print("Char tokens:", char_tokenize(text)[:20])  # First 20 chars`
      }
    ]
  },
  // Add more lessons as needed...
};

function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedSections, setExpandedSections] = useState(new Set([0]));

  const lesson = lessonContent[parseInt(lessonId)];

  useEffect(() => {
    // Check enrollment status from localStorage
    const enrollment = localStorage.getItem('courseEnrollment');
    if (enrollment) {
      const enrollmentData = JSON.parse(enrollment);
      setIsEnrolled(enrollmentData.enrolled);
    }
  }, []);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle>Lesson Not Found</CardTitle>
            <CardDescription>The requested lesson could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/lessons')} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Lessons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if lesson is locked and user is not enrolled
  const isLocked = lesson.isLocked && !isEnrolled;

  const handleSectionComplete = (sectionIndex) => {
    setCompletedSections(prev => new Set([...prev, sectionIndex]));
    if (sectionIndex < lesson.sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
      setExpandedSections(prev => new Set([...prev, sectionIndex + 1]));
    }
  };

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionIndex)) {
        newSet.delete(sectionIndex);
      } else {
        newSet.add(sectionIndex);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/lessons')}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Lessons
              </Button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Badge variant="secondary">Lesson {lessonId}</Badge>
                  <Badge variant={lesson.difficulty === 'Beginner' ? 'default' : lesson.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                    {lesson.difficulty}
                  </Badge>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-gray-600">{lesson.description}</p>
              </div>
            </div>
            {isLocked && (
              <div className="flex items-center space-x-2 text-amber-600">
                <Lock className="h-5 w-5" />
                <span className="font-medium">Premium Content</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLocked ? (
        // Locked content view
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 text-center">
            <CardHeader>
              <Lock className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Premium Lesson</CardTitle>
              <CardDescription className="text-lg">
                This lesson is part of our premium course content. Enroll now to access all lessons and interactive features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Interactive coding exercises</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Progress tracking</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Community access</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="mt-6"
                  onClick={() => navigate('/#pricing')}
                >
                  Enroll Now - $49
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Unlocked content view
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Lesson Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Lesson Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lesson.sections.map((section, index) => (
                      <div
                        key={section.id}
                        className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
                          currentSection === index 
                            ? 'bg-blue-50 text-blue-700' 
                            : completedSections.has(index)
                            ? 'bg-green-50 text-green-700'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setCurrentSection(index)}
                      >
                        {completedSections.has(index) ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : currentSection === index ? (
                          <Play className="h-4 w-4 text-blue-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className="text-sm font-medium truncate">{section.title}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-2">
                      Progress: {completedSections.size} / {lesson.sections.length} sections
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedSections.size / lesson.sections.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{lesson.sections[currentSection].title}</CardTitle>
                        <CardDescription>
                          Section {currentSection + 1} of {lesson.sections.length}
                        </CardDescription>
                      </div>
                      {!completedSections.has(currentSection) && (
                        <Button 
                          onClick={() => handleSectionComplete(currentSection)}
                          className="flex items-center"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="content" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="content" className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Content
                        </TabsTrigger>
                        <TabsTrigger value="code" className="flex items-center">
                          <Code className="mr-2 h-4 w-4" />
                          Code Example
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content" className="mt-6">
                        <div className="prose prose-lg max-w-none">
                          <div dangerouslySetInnerHTML={{ 
                            __html: lesson.sections[currentSection].content
                              .split('\n')
                              .map(line => {
                                if (line.startsWith('# ')) {
                                  return `<h1 class="text-2xl font-bold text-gray-900 mb-4">${line.substring(2)}</h1>`;
                                } else if (line.startsWith('## ')) {
                                  return `<h2 class="text-xl font-semibold text-gray-800 mb-3 mt-6">${line.substring(3)}</h2>`;
                                } else if (line.startsWith('**') && line.endsWith('**')) {
                                  return `<p class="font-semibold text-gray-900 mb-2">${line.slice(2, -2)}</p>`;
                                } else if (line.trim() === '') {
                                  return '<br>';
                                } else {
                                  return `<p class="text-gray-700 mb-3 leading-relaxed">${line}</p>`;
                                }
                              })
                              .join('')
                          }} />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="code" className="mt-6">
                        <div className="bg-gray-900 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Terminal className="h-4 w-4 text-green-400" />
                              <span className="text-green-400 text-sm font-medium">Python</span>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs">
                              Copy Code
                            </Button>
                          </div>
                          <pre className="text-green-400 text-sm overflow-x-auto">
                            <code>{lesson.sections[currentSection].codeExample}</code>
                          </pre>
                        </div>
                        
                        {/* Interactive Code Environment Placeholder */}
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-800 font-medium">Interactive Environment</span>
                          </div>
                          <p className="text-blue-700 text-sm">
                            In the full version, this would contain an embedded JupyterLite environment 
                            where you can run and modify the code examples interactively.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => currentSection > 0 && setCurrentSection(currentSection - 1)}
                    disabled={currentSection === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Section
                  </Button>
                  
                  {currentSection < lesson.sections.length - 1 ? (
                    <Button 
                      onClick={() => setCurrentSection(currentSection + 1)}
                      className="ml-auto"
                    >
                      Next Section
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => navigate('/lessons')}
                      className="ml-auto"
                    >
                      Complete Lesson
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonPage;

