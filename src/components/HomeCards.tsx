// Educational and feature cards for home page

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Droplets, 
  BookOpen, 
  MessageCircle,
  Lightbulb,
  Heart,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Quick action cards data
const quickActions = [
  {
    icon: '🤰',
    title: 'Am I Pregnant?',
    description: 'Understand pregnancy signs and when to test',
    link: '/learn#pregnancy',
    color: 'coral' as const,
  },
  {
    icon: '📊',
    title: 'Cycle & PMS Guide',
    description: 'Learn about your menstrual cycle phases',
    link: '/learn#cycle',
    color: 'lavender' as const,
  },
  {
    icon: '💧',
    title: 'Vaginal Discharge',
    description: 'What\'s normal and when to see a doctor',
    link: '/learn#discharge',
    color: 'mint' as const,
  },
];

// Feature cards data
const features = [
  {
    icon: Calendar,
    title: 'Period Tracker',
    description: 'Log your cycle, predict your next period, and track fertility windows',
    link: '/tracker',
    bgColor: 'bg-coral-light',
    iconColor: 'text-coral',
  },
  {
    icon: Droplets,
    title: 'Hygiene Guide',
    description: 'Best practices for menstrual hygiene and product recommendations',
    link: '/hygiene',
    bgColor: 'bg-lavender-light',
    iconColor: 'text-lavender',
  },
  {
    icon: BookOpen,
    title: 'Learn & Educate',
    description: 'Articles on reproductive health, myths vs facts, and more',
    link: '/learn',
    bgColor: 'bg-mint-light',
    iconColor: 'text-mint',
  },
  {
    icon: MessageCircle,
    title: 'Ask Luna',
    description: 'AI chatbot for your menstrual health questions',
    link: '/chat',
    bgColor: 'bg-peach',
    iconColor: 'text-coral',
  },
];

// Did you know facts
const didYouKnow = [
  {
    icon: '🌡️',
    fact: 'Your basal body temperature rises after ovulation and stays elevated during the luteal phase.',
  },
  {
    icon: '🍫',
    fact: 'Craving chocolate during PMS? Dark chocolate has magnesium which can help with cramps!',
  },
  {
    icon: '💪',
    fact: 'Exercise can actually reduce period cramps by releasing endorphins.',
  },
  {
    icon: '🧬',
    fact: 'The average person menstruates for about 40 years of their life.',
  },
];

export function QuickActionsSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={action.link}>
                <Card variant={action.color} className="p-5 hover:shadow-hover hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{action.icon}</div>
                    <div>
                      <h3 className="font-bold text-foreground">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From tracking your cycle to learning about reproductive health, Luna has all the tools you need.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={feature.link}>
                  <Card variant="soft" className="h-full p-6 group">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DidYouKnowSection() {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light text-lavender text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            Did You Know?
          </div>
          <h2 className="text-3xl font-bold">Fascinating Facts About Your Body</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {didYouKnow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="p-5 h-full">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-sm text-foreground leading-relaxed">{item.fact}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="gradient" className="p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex justify-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-coral-light flex items-center justify-center">
                  <Heart className="w-6 h-6 text-coral" />
                </div>
                <div className="w-12 h-12 rounded-full bg-lavender-light flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-lavender" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Health, Your Privacy
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                All your data stays on your device. We believe in empowering you with knowledge while keeping your information completely private.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="hero" size="lg">
                  <Link to="/tracker">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link to="/chat">
                    Talk to Luna
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
