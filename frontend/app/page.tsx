"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  PieChart,
  Salad,
  Activity,
  ChevronRight,
  Upload,
  Award,
  HeartPulse,
  Utensils,
  Brain,
  Sparkles,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fadeIn, fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Fitness Enthusiast",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote:
      "BhojanBuddy has transformed how I track my nutrition. The AI suggestions are spot-on!",
  },
  {
    name: "Dr. James Wilson",
    role: "Nutritionist",
    image:
      "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote:
      "I recommend BhojanBuddy to all my patients. It's revolutionizing dietary management.",
  },
  {
    name: "Michael Chen",
    role: "Health Coach",
    image:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote:
      "The personalized insights are incredible. It's like having a nutritionist in your pocket.",
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative hero-gradient min-h-[90vh] flex items-center py-16 md:py-24 overflow-hidden"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <motion.div
              className="flex-1 text-center md:text-left mb-10 md:mb-0"
              variants={staggerContainer}
            >
              <motion.div
                className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-6"
                variants={fadeInUp}
              >
                <Sparkles className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">
                  AI-Powered Nutrition Analysis
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                variants={fadeInUp}
              >
                Your Smart{" "}
                <span className="text-primary relative">
                  Health
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 20"
                    fill="none"
                  >
                    <path
                      d="M0 15C50 5 150 5 200 15"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-primary/30"
                    />
                  </svg>
                </span>{" "}
                Companion
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0"
                variants={fadeInUp}
              >
                Track meals, analyze nutrition, and get personalized health
                suggestions powered by AI.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
                variants={fadeInUp}
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 w-full sm:w-auto"
                >
                  <Link href="/upload">
                    <Camera className="mr-2 h-5 w-5" />
                    <span>Start Your Journey</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                    />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="rounded-full group w-full sm:w-auto"
                >
                  <Link href="#features" className="flex items-center">
                    <span>See How It Works</span>
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 relative"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full max-w-lg mx-auto">
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent rounded-3xl"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.02, 0.98, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                  }}
                />

                <div className="relative z-10 grid grid-cols-2 gap-4 p-4">
                  <motion.div
                    className="aspect-square relative rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Healthy meal"
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="aspect-square relative rounded-2xl overflow-hidden shadow-xl translate-y-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Healthy breakfast"
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="aspect-square relative rounded-2xl overflow-hidden shadow-xl -translate-y-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Fresh fruits"
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="aspect-square relative rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Healthy salad"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-card rounded-xl shadow-lg p-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-mint-green/20 rounded-full p-2">
                      <Award className="h-4 w-4 text-mint-green" />
                    </div>
                    <span className="text-sm font-medium">
                      Perfect for your goals!
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-4 -right-4 bg-white dark:bg-card rounded-xl shadow-lg p-3"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 rounded-full p-2">
                      <HeartPulse className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">
                      Health optimized
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hero-wave" />
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-24 md:py-32 bg-accent/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-6"
              variants={fadeInUp}
            >
              <Brain className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Smart Features</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How BhojanBuddy Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our smart nutrition app uses AI to help you make better food
              choices tailored to your health conditions and fitness goals.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-24 md:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-6"
              variants={fadeInUp}
            >
              <Award className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Success Stories</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their
              health journey with BhojanBuddy.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="absolute top-0 left-0 w-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: activeTestimonial === index ? 1 : 0,
                    x: activeTestimonial === index ? 0 : 20,
                    pointerEvents:
                      activeTestimonial === index ? "auto" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-accent/50 border-none p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-xl md:text-2xl mb-4 italic">
                          "{testimonial.quote}"
                        </p>
                        <h4 className="font-semibold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeTestimonial === index ? "bg-primary" : "bg-primary/20"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-24 md:py-32 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-background" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center bg-white dark:bg-card rounded-full px-4 py-2 mb-6 shadow-md"
              variants={fadeInUp}
            >
              <Clock className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Start Today</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Health Journey?
            </h2>

            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have already discovered the power of
              AI-driven nutrition tracking and personalized health insights.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button
                asChild
                size="lg"
                className="rounded-full shadow-lg hover:shadow-primary/50"
              >
                <Link href="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  <span>Get Started Now</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full"
              >
                <Link href="#features">
                  <PieChart className="mr-2 h-5 w-5" />
                  <span>Learn More</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

type FeatureProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
};

function FeatureCard({ icon: Icon, title, description, image }: FeatureProps) {
  return (
    <Card className="feature-card group h-full overflow-hidden">
      <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4 bg-white dark:bg-card rounded-full p-3 shadow-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}

const features = [
  {
    icon: Camera,
    title: "Snap Your Meal",
    description:
      "Take a photo of your meal and our AI instantly identifies the food items and their nutritional content.",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Get detailed breakdowns of calories, carbs, proteins, fats, and other vital nutrients in your meals.",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description:
      "Receive personalized recommendations based on your health conditions and fitness goals.",
    image: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
  },
  {
    icon: Activity,
    title: "Health Tracking",
    description:
      "Monitor your progress and see how your dietary choices impact your health metrics over time.",
    image: "https://images.pexels.com/photos/1640781/pexels-photo-1640781.jpeg",
  },
  {
    icon: Award,
    title: "Achievement System",
    description:
      "Stay motivated with achievements and progress tracking as you develop healthier eating habits.",
    image: "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg",
  },
  {
    icon: HeartPulse,
    title: "Health-First Approach",
    description:
      "Focus on nutrition quality and personalized recommendations for your specific health needs.",
    image: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg",
  },
];
