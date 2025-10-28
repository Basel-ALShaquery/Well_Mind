import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import {
  Brain,
  Heart,
  User,
  Calendar as CalendarIcon,
  BookOpen,
  Headphones,
  TestTube,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Star,
  Play,
  Clock,
  Users,
  MessageCircle,
  Smile,
  Meh,
  Frown,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Eye,
  EyeOff,
  Lightbulb,
  HeartHandshake,
  ExternalLink,
  UserCheck,
  Phone,
  Video,
  Mail,
  MapPin,
  DollarSign,
  Stethoscope
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import './App.css'

// Enhanced CSS for better animations and styling
const additionalStyles = `
  .mood-button {
    transition: all 0.3s ease;
    transform: scale(1);
  }
  
  .mood-button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
  }
  
  .mood-button.selected {
    transform: scale(1.15);
    box-shadow: 0 12px 30px rgba(139, 92, 246, 0.4);
  }
  
  .card-hover {
    transition: all 0.3s ease;
  }
  
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  .gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .pulse-animation {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  
  .slide-in {
    animation: slideIn 0.5s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = additionalStyles
  document.head.appendChild(styleSheet)
}

// Mock data for real content
const realArticles = [
  {
    id: 1,
    title: 'How to Deal with Daily Anxiety',
    category: 'Anxiety',
    readTime: '5 minutes',
    author: 'Dr. Ahmed Mahmoud',
    excerpt: 'Learn simple techniques to control anxiety in daily life and how to deal with stressful situations in a healthy way...',
    url: 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anxiety-fear-panic/',
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    title: 'The Importance of Sleep for Mental Health',
    category: 'Sleep',
    readTime: '7 minutes',
    author: 'Dr. Mariam Salem',
    excerpt: 'Discover how sleep affects your mental state and how to improve sleep quality for better rest...',
    url: 'https://www.sleepfoundation.org/mental-health',
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    title: 'Meditation Techniques for Beginners',
    category: 'Meditation',
    readTime: '10 minutes',
    author: 'Dr. Khaled Abdullah',
    excerpt: 'A comprehensive guide to starting meditation practice and its benefits for mental health with practical exercises...',
    url: 'https://www.mindful.org/how-to-meditate/',
    image: '/api/placeholder/300/200'
  },
  {
    id: 4,
    title: 'Managing Work Stress',
    category: 'Work Stress',
    readTime: '8 minutes',
    author: 'Dr. Sarah Ahmed',
    excerpt: 'Effective strategies for dealing with work stress and achieving work-life balance...',
    url: 'https://www.helpguide.org/articles/stress/stress-management.htm',
    image: '/api/placeholder/300/200'
  },
  {
    id: 5,
    title: 'Understanding Depression',
    category: 'Depression',
    readTime: '12 minutes',
    author: 'Dr. Hassan Ali',
    excerpt: 'A comprehensive guide to understanding depression symptoms, causes, and treatment options...',
    url: 'https://www.nimh.nih.gov/health/topics/depression',
    image: '/api/placeholder/300/200'
  },
  {
    id: 6,
    title: 'Building Resilience',
    category: 'Self-Development',
    readTime: '6 minutes',
    author: 'Dr. Fatima Hassan',
    excerpt: 'Learn how to build mental resilience and bounce back from life\'s challenges stronger...',
    url: 'https://www.apa.org/topics/resilience',
    image: '/api/placeholder/300/200'
  }
]

const realPodcasts = [
  {
    id: 1,
    title: 'Dealing with Exam Stress',
    host: 'Dr. Nadia Hassan',
    duration: '25:30',
    category: 'Education',
    description: 'Practical tips for students to deal with exam period stress and relaxation techniques',
    url: 'https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL',
    plays: 1250
  },
  {
    id: 2,
    title: 'Building Self-Confidence',
    host: 'Dr. Omar Sherif',
    duration: '18:45',
    category: 'Self Development',
    description: 'How to build self-confidence and overcome inner doubts and develop personality',
    url: 'https://open.spotify.com/show/5M5D6lihTbDs8aRnb6xazq',
    plays: 2100
  },
  {
    id: 3,
    title: 'Healthy Relationships',
    host: 'Dr. Layla Mohammed',
    duration: '32:15',
    category: 'Relationships',
    description: 'Foundations of building healthy and balanced relationships with others and resolving conflicts positively',
    url: 'https://open.spotify.com/show/1mVcuBZOfyIrpfpY6dub8P',
    plays: 1800
  },
  {
    id: 4,
    title: 'Recovery from Psychological Trauma',
    host: 'Dr. Mohammed Ali',
    duration: '28:20',
    category: 'Mental Health',
    description: 'How to deal with psychological trauma and recover from it in a healthy and safe way',
    url: 'https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5tZWdhcGhvbmUuZm0vdGhlLW1lbnRhbC1pbGxuZXNzLWhhcHB5LWhvdXI',
    plays: 1650
  },
  {
    id: 5,
    title: 'Mindfulness and Daily Life',
    host: 'Dr. Amira Farouk',
    duration: '22:10',
    category: 'Mindfulness',
    description: 'How to integrate mindfulness practices into your daily routine for better mental health',
    url: 'https://www.tenpercent.com/podcast',
    plays: 1920
  },
  {
    id: 6,
    title: 'Overcoming Social Anxiety',
    host: 'Dr. Youssef Ahmed',
    duration: '35:45',
    category: 'Anxiety',
    description: 'Strategies and techniques to overcome social anxiety and build social confidence',
    url: 'https://open.spotify.com/show/7fxTH5HGWLXtAoSALwrgVb',
    plays: 1430
  }
]

const realTests = [
  {
    id: 1,
    title: 'Depression Scale (PHQ-9)',
    description: 'Standard test to assess depression levels and symptom severity',
    duration: '5-10 minutes',
    questions: 9,
    category: 'Depression',
    url: 'https://www.mdcalc.com/calc/1725/phq9-patient-health-questionnaire9'
  },
  {
    id: 2,
    title: 'Anxiety Scale (GAD-7)',
    description: 'Test to assess general anxiety levels and anxiety disorders',
    duration: '3-5 minutes',
    questions: 7,
    category: 'Anxiety',
    url: 'https://www.mdcalc.com/calc/1727/gad7-general-anxiety-disorder7'
  },
  {
    id: 3,
    title: 'Stress Level Assessment',
    description: 'Quick assessment to measure current stress levels and sources of pressure',
    duration: '3-5 minutes',
    questions: 8,
    category: 'Stress',
    url: 'https://www.stress.org/stress-assessment'
  },
  {
    id: 4,
    title: 'Self-Esteem Scale',
    description: 'Assessment of self-confidence level and personal self-esteem',
    duration: '5-8 minutes',
    questions: 10,
    category: 'Self-Esteem',
    url: 'https://psychology-tools.com/test/rosenberg-self-esteem-scale'
  },
  {
    id: 5,
    title: 'Burnout Assessment',
    description: 'Evaluate your level of work-related burnout and exhaustion',
    duration: '7-10 minutes',
    questions: 15,
    category: 'Burnout',
    url: 'https://www.mindtools.com/pages/article/newTCS_08.htm'
  },
  {
    id: 6,
    title: 'Sleep Quality Index',
    description: 'Assess your sleep quality and identify potential sleep disorders',
    duration: '5-7 minutes',
    questions: 12,
    category: 'Sleep',
    url: 'https://www.psychdb.com/_media/sleep/2-insomnia-disorder/the_pittsburgh_sleep_quality_index_psqi.pdf'
  }
]

// Mock psychologists data
const mockPsychologists = [
  {
    id: 1,
    name: 'Dr. Sarah Ahmed',
    specialty: 'Anxiety and Depression',
    rating: 4.9,
    experience: '8 years',
    image: '/api/placeholder/150/150',
    bio: 'Psychologist specialized in treating anxiety and depression in youth and adults',
    price: 200,
    available: true,
    location: 'Cairo',
    languages: ['Arabic', 'English'],
    sessionTypes: ['In-person', 'Online']
  },
  {
    id: 3,
    name: 'Dr. Mohammed Hassan',
    specialty: 'Social Relationships',
    rating: 4.8,
    experience: '10 years',
    image: '/api/placeholder/150/150',
    bio: 'Expert in psychological therapy for relationships and social problems',
    price: 250,
    available: true,
    location: 'Alexandria',
    languages: ['Arabic'],
    sessionTypes: ['In-person', 'Online']
  },
  {
    id: 2,
    name: 'Dr. Fatma Ali',
    specialty: 'Psychological Consultant & Speech Pathology',
    rating: 5.0,
    experience: '27 years',
    image: '/api/placeholder/150/150',
    bio: 'Leading Consultant in Psychotherapy, Speech Pathology and Addiction Treatment. Internationally recognized expert with extensive experience in comprehensive mental health care.',
    price: 500,
    available: true,
    location: 'Cairo',
    languages: ['Arabic', 'English'],
    sessionTypes: ['Online', 'In-person']
  },
  {
    id: 4,
    name: 'Dr. Ahmed Mahmoud',
    specialty: 'Psychological Trauma',
    rating: 4.9,
    experience: '12 years',
    image: '/api/placeholder/150/150',
    bio: 'Psychologist specialized in treating psychological trauma and PTSD',
    price: 300,
    available: false,
    location: 'Cairo',
    languages: ['Arabic', 'English'],
    sessionTypes: ['In-person', 'Online']
  }
]

// Smart recommendation system (from original well-mind-r)
const getSmartRecommendation = (mood, note) => {
  const noteKeywords = note ? note.toLowerCase() : ''
  const hasStressKeywords = /stress|pressure|overwhelm|busy|work|exam|deadline/.test(noteKeywords)
  const hasSadnessKeywords = /sad|depressed|down|lonely|empty|hopeless/.test(noteKeywords)
  const hasAnxietyKeywords = /anxious|worry|nervous|panic|fear|scared/.test(noteKeywords)
  const hasRelationshipKeywords = /friend|family|relationship|fight|argument|conflict/.test(noteKeywords)
  const hasSleepKeywords = /tired|sleep|insomnia|exhausted|fatigue/.test(noteKeywords)

  if (mood === 1) {
    if (hasStressKeywords) {
      return {
        type: 'crisis_support',
        title: 'You\'re feeling overwhelmed - take one step',
        message: 'When everything seems difficult, focus on one small thing you can control right now. You don\'t need to solve everything today.',
        action: 'Take 5 deep breaths and write down one thing you can do in the next hour',
        tips: ['Remember: this feeling is temporary', 'You\'ve overcome difficult times before', 'It\'s okay to ask for help']
      }
    } else if (hasSadnessKeywords) {
      return {
        type: 'emotional_support',
        title: 'Your feelings are valid',
        message: 'It\'s completely natural to feel this way sometimes. You\'re not alone, and this difficult period will pass.',
        action: 'Reach out to someone you trust - a friend, family member, or counselor',
        tips: ['Your worth isn\'t determined by how you feel today', 'Small acts of self-care matter', 'Tomorrow is a new opportunity']
      }
    } else {
      return {
        type: 'general_support',
        title: 'You\'re not alone',
        message: 'Having a very difficult day is part of being human. Be kind to yourself and remember that you matter.',
        action: 'Focus on basic needs: drink water, eat something, and rest if possible',
        tips: ['This feeling will pass', 'You\'re stronger than you think', 'Consider talking to someone you trust']
      }
    }
  } else if (mood === 2) {
    if (hasStressKeywords) {
      return {
        type: 'stress_management',
        title: 'Managing stress',
        message: 'Stress is your body\'s way of responding to challenges. Let\'s work on some strategies to help you feel more in control.',
        action: 'Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8',
        tips: ['Break large tasks into smaller steps', 'Take regular breaks throughout your day', 'Remember you can only control what\'s within your power']
      }
    } else if (hasAnxietyKeywords) {
      return {
        type: 'anxiety_relief',
        title: 'Calming the anxious mind',
        message: 'Anxiety can be exhausting, but there are ways to ground yourself and find peace in the present moment.',
        action: 'Use the 5-4-3-2-1 technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste',
        tips: ['Anxiety is temporary and will pass', 'Focus on what you can control right now', 'Practice self-compassion']
      }
    } else {
      return {
        type: 'mood_lifting',
        title: 'Gentle steps forward',
        message: 'Bad days happen to everyone. What matters is how we take care of ourselves during them.',
        action: 'Do something small that brings you joy - listen to a favorite song, call a friend, or take a short walk',
        tips: ['Every new day is a fresh start', 'Small progress is still progress', 'You deserve kindness and care']
      }
    }
  } else if (mood === 3) {
    return {
      type: 'maintenance',
      title: 'Maintaining balance',
      message: 'You\'re in a neutral place today. This is a good time to focus on self-care and activities that nourish your soul.',
      action: 'Take some time to reflect on what you\'re grateful for today',
      tips: ['Ordinary days matter too', 'Use this time to plan something you\'re looking forward to', 'Connect with friends or family']
    }
  } else if (mood === 4) {
    return {
      type: 'positive_momentum',
      title: 'Building on positive energy',
      message: 'You\'re feeling good today! This is a great time to do things that bring you joy or work on your goals.',
      action: 'Think about doing something kind for someone else - it can multiply your positive feelings',
      tips: ['Celebrate small victories', 'Share your positive energy with others', 'Use this energy to plan for the future']
    }
  } else if (mood === 5) {
    return {
      type: 'peak_wellness',
      title: 'You\'re at your peak!',
      message: 'What a wonderful day! You\'re feeling content and happy. This is a perfect time to reflect on what makes you feel this great.',
      action: 'Write in a journal about what made your day wonderful - it can help you in future difficult days',
      tips: ['Remember this feeling for tough times', 'Share your joy with loved ones', 'Use this positive energy to set new goals']
    }
  }

  return {
    type: 'general',
    title: 'Daily care',
    message: 'Every day is a new opportunity to grow and learn.',
    action: 'Take a moment to breathe deeply and appreciate the present moment',
    tips: ['Be kind to yourself', 'Small progress matters', 'You\'re doing great work']
  }
}

// Login Component
const LoginPage = ({ onLogin, switchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email, // Using email as username for simplicity
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        onLogin({
          name: data.user.username,
          email: data.user.email,
          id: data.user.id
        })
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Well Mind</h1>
          <p className="text-gray-600">Welcome to the mental health community</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="example@email.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={switchToRegister}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Don't have an account? Sign up now
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Register Component
const RegisterPage = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    reason: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        onRegister({
          name: data.user.username,
          email: data.user.email,
          id: data.user.id
        })
      } else {
        alert(data.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-600 p-3 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Well Mind</h1>
          <p className="text-gray-600">Join the mental health community</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create New Account</CardTitle>
            <CardDescription>Fill in the details below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Ahmed"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Mohammed"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="example@email.com"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="25"
                    min="13"
                    max="100"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Why do you want to join?</Label>
                <Select value={formData.reason} onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="relationships">Relationships</SelectItem>
                    <SelectItem value="stress">Life stress</SelectItem>
                    <SelectItem value="exploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={switchToLogin}
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                Already have an account? Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Main Dashboard Component
const Dashboard = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [moodData, setMoodData] = useState([
    { date: '2025-01-01', mood: 4, note: 'Great day!' },
    { date: '2025-01-02', mood: 3, note: 'Normal day' },
    { date: '2025-01-03', mood: 5, note: 'Feeling happy' },
    { date: '2025-01-04', mood: 2, note: 'Difficult day' },
    { date: '2025-01-05', mood: 4, note: 'Gradual improvement' },
    { date: '2025-01-06', mood: 3, note: 'Stable' },
    { date: '2025-01-07', mood: 4, note: 'Good day' }
  ])
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodNote, setMoodNote] = useState('')
  const [selectedPsychologist, setSelectedPsychologist] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    sessionType: '',
    notes: ''
  })


  const moodEmojis = {
    1: { emoji: '😢', label: 'Very Bad', color: 'text-red-500' },
    2: { emoji: '😔', label: 'Bad', color: 'text-orange-500' },
    3: { emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
    4: { emoji: '😊', label: 'Good', color: 'text-green-500' },
    5: { emoji: '😄', label: 'Excellent', color: 'text-blue-500' }
  }

  const handleMoodSubmit = () => {
    if (selectedMood) {
      const today = new Date().toISOString().split('T')[0]
      const newEntry = {
        date: today,
        mood: selectedMood,
        note: moodNote
      }

      setMoodData(prev => {
        const filtered = prev.filter(entry => entry.date !== today)
        return [...filtered, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date))
      })

      setSelectedMood(null)
      setMoodNote('')
      alert('Your mood has been saved!')
    }
  }

  const averageMood = moodData.length > 0 ? 
    (moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length).toFixed(1) : 0

  const currentMoodEntry = moodData.find(entry => entry.date === new Date().toISOString().split('T')[0])
  const recommendation = currentMoodEntry ? getSmartRecommendation(currentMoodEntry.mood, currentMoodEntry.note) : null

  const renderMoodTracker = () => (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            How are you feeling today?
          </CardTitle>
          <CardDescription>
            Take a moment to reflect on your current emotional state
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {Object.entries(moodEmojis).map(([value, { emoji, label, color }]) => (
              <button
                key={value}
                onClick={() => setSelectedMood(parseInt(value))}
                className={`mood-button p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center min-h-[100px] ${
                  selectedMood === parseInt(value)
                    ? 'selected border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:scale-105 hover:shadow-md bg-white'
                }`}
              >
                <div className="text-4xl mb-2 transition-transform duration-200">{emoji}</div>
                <div className={`text-xs font-medium ${color} text-center`}>{label}</div>
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="mood-note" className="text-sm font-medium text-gray-700">
                What's on your mind? (Optional)
              </Label>
              <Textarea
                id="mood-note"
                placeholder="Describe what happened today, how you're feeling, or what's affecting your mood..."
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                className="mt-2 min-h-[100px] resize-none"
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">
                {moodNote.length}/500 characters
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick mood factors (optional):</h4>
              <div className="flex flex-wrap gap-2">
                {['Work', 'Family', 'Health', 'Sleep', 'Exercise', 'Social', 'Weather', 'Stress'].map(factor => (
                  <button
                    key={factor}
                    onClick={() => {
                      const currentNote = moodNote
                      const factorTag = `#${factor.toLowerCase()}`
                      if (!currentNote.includes(factorTag)) {
                        setMoodNote(prev => prev ? `${prev} ${factorTag}` : factorTag)
                      }
                    }}
                    className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    #{factor.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleMoodSubmit}
            disabled={!selectedMood}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-6"
          >
            <Heart className="h-4 w-4 mr-2" />
            Save Today's Mood
          </Button>
        </CardContent>
      </Card>

      {recommendation && (
        <Card className="card-hover border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              {recommendation.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{recommendation.message}</p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-900 mb-2">Suggested action:</h4>
              <p className="text-blue-800">{recommendation.action}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Additional tips:</h4>
              <ul className="list-disc list-inside space-y-1">
                {recommendation.tips.map((tip, index) => (
                  <li key={index} className="text-gray-700 text-sm">{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Mood Tracking - Last 7 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip 
                  formatter={(value, name) => [moodEmojis[value]?.label || value, 'Mood']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{averageMood}</div>
              <div className="text-sm text-gray-600">Average Mood</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{moodData.length}</div>
              <div className="text-sm text-gray-600">Tracking Days</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {moodData.filter(entry => entry.mood >= 4).length}
              </div>
              <div className="text-sm text-gray-600">Good Days</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = (contentType) => {
    switch (contentType) {
      case 'articles':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {realArticles.map(article => (
              <Card key={article.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>By {article.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{article.excerpt}</p>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read Full Article <ExternalLink className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      
      case 'podcasts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {realPodcasts.map(podcast => (
              <Card key={podcast.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{podcast.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {podcast.duration}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{podcast.title}</CardTitle>
                  <CardDescription>With {podcast.host}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{podcast.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{podcast.plays} plays</span>
                    <a 
                      href={podcast.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium"
                    >
                      Listen Now <Play className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      
      case 'tests':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {realTests.map(test => (
              <Card key={test.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{test.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {test.duration}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{test.title}</CardTitle>
                  <CardDescription>{test.questions} questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{test.description}</p>
                  <a 
                    href={test.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Start Test <ArrowRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      
      default:
        return (
          <div className="text-center py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome, {user.name}</h2>
              <p className="text-xl text-gray-600">How can we help you today?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="card-hover cursor-pointer" onClick={() => setCurrentPage('mood')}>
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Mood Tracking</h3>
                  <p className="text-gray-600">Record your daily mood and track your progress</p>
                </CardContent>
              </Card>
              
              <Card className="card-hover cursor-pointer" onClick={() => setCurrentPage('sessions')}>
                <CardContent className="p-6 text-center">
                  <Stethoscope className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Book Session</h3>
                  <p className="text-gray-600">Book a session with a specialized psychologist</p>
                </CardContent>
              </Card>
              
              <Card className="card-hover cursor-pointer" onClick={() => setCurrentPage('content')}>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Educational Content</h3>
                  <p className="text-gray-600">Articles, podcasts, and psychological tests</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  const renderSessions = () => (
    <div className="space-y-6">
      {selectedPsychologist ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              Book Session with {selectedPsychologist.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={selectedPsychologist.image} 
                    alt={selectedPsychologist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedPsychologist.name}</h3>
                    <p className="text-gray-600">{selectedPsychologist.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{selectedPsychologist.rating}</span>
                      <span className="text-sm text-gray-500">({selectedPsychologist.experience})</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{selectedPsychologist.bio}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{selectedPsychologist.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>${selectedPsychologist.price} per session</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{selectedPsychologist.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Session Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Session Time</Label>
                  <Select value={bookingForm.time} onValueChange={(value) => setBookingForm(prev => ({ ...prev, time: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                      <SelectItem value="17:00">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="sessionType">Session Type</Label>
                  <Select value={bookingForm.sessionType} onValueChange={(value) => setBookingForm(prev => ({ ...prev, sessionType: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedPsychologist.sessionTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes or details you want to share with the doctor"
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      alert('Session booked successfully! We will contact you soon to confirm the appointment.')
                      setSelectedPsychologist(null)
                      setBookingForm({ date: '', time: '', sessionType: '', notes: '' })
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={!bookingForm.date || !bookingForm.time || !bookingForm.sessionType}
                  >
                    Confirm Booking
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPsychologist(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPsychologists.map(psychologist => (
            <Card key={psychologist.id} className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img 
                    src={psychologist.image} 
                    alt={psychologist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{psychologist.name}</CardTitle>
                    <CardDescription>{psychologist.specialty}</CardDescription>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{psychologist.rating}</span>
                      <span className="text-sm text-gray-500">({psychologist.experience})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">${psychologist.price}</div>
                    <div className={`text-sm ${psychologist.available ? 'text-green-600' : 'text-red-600'}`}>
                      {psychologist.available ? 'Available' : 'Unavailable'}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{psychologist.bio}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{psychologist.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{psychologist.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                    <span>{psychologist.sessionTypes.join(', ')}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setSelectedPsychologist(psychologist)}
                  disabled={!psychologist.available}
                  className="w-full"
                >
                  {psychologist.available ? 'Book Session' : 'Currently Unavailable'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Well Mind</h1>
            </button>
            
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <button
                onClick={() => setCurrentPage('mood')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'mood' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Heart className="h-4 w-4" />
                Mood Tracking
              </button>
              <button
                onClick={() => setCurrentPage('sessions')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'sessions' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Stethoscope className="h-4 w-4" />
                Book Session
              </button>
              <button
                onClick={() => setCurrentPage('content')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'content' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Content
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'dashboard' && renderContent()}
        
        {currentPage === 'mood' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mood Tracking</h2>
              <p className="text-gray-600">Record your daily mood and track your progress with smart recommendations</p>
            </div>
            {renderMoodTracker()}
          </div>
        )}

        {currentPage === 'sessions' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Psychological Session</h2>
              <p className="text-gray-600">Book a session with the best specialized psychologists</p>
            </div>
            {renderSessions()}
          </div>
        )}
        
        {currentPage === 'content' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Educational Content</h2>
              <p className="text-gray-600">Articles, podcasts, and psychological tests from trusted sources</p>
            </div>
            
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="podcasts" className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  Podcasts
                </TabsTrigger>
                <TabsTrigger value="tests" className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  Tests
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles" className="mt-6">
                {renderContent('articles')}
              </TabsContent>
              
              <TabsContent value="podcasts" className="mt-6">
                {renderContent('podcasts')}
              </TabsContent>
              
              <TabsContent value="tests" className="mt-6">
                {renderContent('tests')}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  )
}

// Main App Component
function App() {
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleRegister = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={
            authMode === 'login' ? (
              <LoginPage 
                onLogin={handleLogin} 
                switchToRegister={() => setAuthMode('register')} 
              />
            ) : (
              <RegisterPage 
                onRegister={handleRegister} 
                switchToLogin={() => setAuthMode('login')} 
              />
            )
          } />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Dashboard user={user} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  )
}

export default App

