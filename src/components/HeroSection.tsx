// Hero section component for the home page

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lavender/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-mint/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-light text-coral text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Your Menstrual Health Companion
            </motion.div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Understand Your Body,{' '}
              <span className="text-gradient">Embrace Your Cycle</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Track your period, learn about menstrual hygiene, get answers to your health questions, and connect with nearby healthcare providers.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button asChild variant="hero" size="xl">
                <Link to="/tracker" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Start Tracking
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/learn">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-coral" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lavender" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-mint" />
                <span>Free to Use</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-coral/30 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-lavender/30 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
              <div className="absolute inset-16 rounded-full border-2 border-dashed border-mint/30 animate-spin" style={{ animationDuration: '20s' }} />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-coral via-lavender to-mint p-1 shadow-hover">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-2">🌸</div>
                      <p className="text-sm font-semibold text-muted-foreground">Your Cycle</p>
                      <p className="text-sm font-semibold text-muted-foreground">Your Power</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 w-14 h-14 rounded-2xl bg-coral-light flex items-center justify-center shadow-soft"
              >
                <span className="text-2xl">💧</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-20 left-5 w-14 h-14 rounded-2xl bg-lavender-light flex items-center justify-center shadow-soft"
              >
                <span className="text-2xl">📅</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 left-0 w-14 h-14 rounded-2xl bg-mint-light flex items-center justify-center shadow-soft"
              >
                <span className="text-2xl">🩺</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
