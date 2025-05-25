"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  ArrowLeft,
  Star,
  AlertTriangle,
  ChevronRight,
  Heart,
  Activity,
  XCircle,
  CheckCircle2,
  Sparkles,
  ThumbsUp,
  BarChart4
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  fadeIn, 
  fadeInUp, 
  staggerContainer,
  slideInBottom 
} from '@/lib/animations';

// Mock data
const mockSuggestions = [
  {
    id: 1,
    type: 'meal',
    title: 'Blood Sugar Management',
    insight: 'The combination of white rice and sauce may cause blood sugar spikes',
    suggestion: 'Try switching to brown rice or quinoa for a lower glycemic index option',
    icon: Activity,
    severity: 'warning',
    image: 'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    type: 'meal',
    title: 'Heart Health',
    insight: 'Your meal is high in healthy omega-3 fatty acids from salmon',
    suggestion: 'Continue including fatty fish 2-3 times per week for optimal heart health',
    icon: Heart,
    severity: 'positive',
    image: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    type: 'meal',
    title: 'Sodium Intake',
    insight: 'This meal contains moderate sodium from the sauce',
    suggestion: 'Try using herbs and spices instead of salt-based seasonings',
    icon: AlertTriangle,
    severity: 'moderate',
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    type: 'pattern',
    title: 'Meal Timing',
    insight: 'We noticed you often eat larger meals late in the evening',
    suggestion: 'Try to have your largest meal earlier in the day to improve metabolism',
    icon: BarChart4,
    severity: 'moderate',
    image: 'https://images.pexels.com/photos/1710852/pexels-photo-1710852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    type: 'alternative',
    title: 'Healthier Alternative',
    insight: 'Here\'s a similar meal with improved nutrition profile',
    suggestion: 'Try grilled fish with steamed vegetables and quinoa for a balanced meal',
    icon: Sparkles,
    severity: 'suggestion',
    image: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default function SuggestionsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState(mockSuggestions);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const dismissSuggestion = (id: number) => {
    setActiveSuggestions(activeSuggestions.filter(s => s.id !== id));
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'warning':
        return {
          bg: 'bg-coral-red/10',
          border: 'border-coral-red/30',
          icon: 'text-coral-red',
          badge: 'bg-coral-red/20 text-coral-red',
        };
      case 'positive':
        return {
          bg: 'bg-mint-green/10',
          border: 'border-mint-green/30',
          icon: 'text-mint-green',
          badge: 'bg-mint-green/20 text-mint-green',
        };
      case 'moderate':
        return {
          bg: 'bg-sunny-amber/10',
          border: 'border-sunny-amber/30',
          icon: 'text-sunny-amber',
          badge: 'bg-sunny-amber/20 text-sunny-amber',
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/30',
          icon: 'text-primary',
          badge: 'bg-primary/20 text-primary',
        };
    }
  };

  return (
    <motion.div 
      className="container py-8 md:py-12"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={fadeIn}
    >
      <motion.div variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Personalized Suggestions</h1>
          <p className="text-muted-foreground">
            Based on your meal and health profile, here are personalized recommendations to help you achieve your goals
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-6">
          {activeSuggestions.length > 0 ? (
            activeSuggestions.map((suggestion, index) => {
              const styles = getSeverityStyles(suggestion.severity);
              const SuggestionIcon = suggestion.icon;
              
              return (
                <motion.div 
                  key={suggestion.id}
                  variants={slideInBottom}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${styles.bg} ${styles.border} overflow-hidden`}>
                    <div className="md:flex">
                      <div className="md:w-1/3 relative">
                        <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
                          <Image 
                            src={suggestion.image} 
                            alt={suggestion.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Badge className={`absolute top-2 left-2 ${styles.badge}`}>
                          {suggestion.type === 'meal' && 'Meal Analysis'}
                          {suggestion.type === 'pattern' && 'Eating Pattern'}
                          {suggestion.type === 'alternative' && 'Healthier Option'}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-full ${styles.bg}`}>
                              <SuggestionIcon className={`h-5 w-5 ${styles.icon}`} />
                            </div>
                            <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => dismissSuggestion(suggestion.id)}
                          >
                            <XCircle className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Insight</h4>
                            <p>{suggestion.insight}</p>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Suggestion</h4>
                            <p>{suggestion.suggestion}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 pt-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="rounded-full"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful
                            </Button>
                            
                            {suggestion.type === 'alternative' && (
                              <Button 
                                size="sm"
                                className="rounded-full"
                              >
                                <Sparkles className="h-4 w-4 mr-1" />
                                View Recipe
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <motion.div variants={fadeInUp} className="text-center py-12">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/20 p-6 mb-4">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">All Caught Up!</h2>
              <p className="text-muted-foreground mb-6">
                You've viewed all your personalized suggestions for now.
              </p>
              <Button asChild>
                <Link href="/summary">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Summary
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
        
        {activeSuggestions.length > 0 && (
          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/summary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Summary
              </Link>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}