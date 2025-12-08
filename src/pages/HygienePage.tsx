// Hygiene guide page - Routines, checklist, reminders, red-flag alerts

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Bell,
  BellOff,
  Sparkles,
  Shield,
  Heart,
  ThermometerSun
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Footer } from '@/components/Footer';
import { getReminders, toggleReminder, saveReminders } from '@/lib/storage';
import type { HygieneReminder } from '@/types';

// Hygiene routine steps
const routineSteps = [
  {
    icon: '🧼',
    title: 'Gentle Cleaning',
    description: 'Clean the vulva with warm water only. Avoid soap inside the vagina—it\'s self-cleaning!',
    tip: 'Pat dry with a clean towel, don\'t rub.',
  },
  {
    icon: '🩲',
    title: 'Breathable Underwear',
    description: 'Wear cotton underwear to allow airflow and prevent moisture buildup.',
    tip: 'Change daily, or more often if needed.',
  },
  {
    icon: '🚿',
    title: 'Shower Regularly',
    description: 'Shower at least once daily during your period to stay fresh.',
    tip: 'Focus on the external area—never douche.',
  },
  {
    icon: '🌸',
    title: 'Front to Back',
    description: 'Always wipe from front to back to prevent bacterial transfer.',
    tip: 'Use unscented, soft toilet paper.',
  },
];

// Product comparison
const productComparison = [
  {
    name: 'Pads',
    icon: '📋',
    pros: ['Easy to use', 'No insertion', 'Various sizes', 'Good for beginners'],
    cons: ['Can feel bulky', 'May shift', 'Not for swimming'],
    changeTiming: 'Every 4-6 hours',
    color: 'coral' as const,
  },
  {
    name: 'Tampons',
    icon: '🩹',
    pros: ['Discreet', 'Good for sports', 'Can swim', 'Various absorbencies'],
    cons: ['TSS risk if left too long', 'Insertion needed', 'Can be drying'],
    changeTiming: 'Every 4-8 hours (never exceed 8)',
    color: 'lavender' as const,
  },
  {
    name: 'Menstrual Cups',
    icon: '🥤',
    pros: ['Eco-friendly', 'Cost-effective', 'Up to 12 hours', 'Reusable'],
    cons: ['Learning curve', 'Emptying in public can be tricky', 'Initial cost'],
    changeTiming: 'Every 8-12 hours',
    color: 'mint' as const,
  },
];

// Red flag alerts
const redFlags = [
  {
    symptom: 'Soaking through pads/tampons every hour',
    action: 'Consult a doctor—could indicate heavy bleeding disorder',
    urgency: 'high',
  },
  {
    symptom: 'Periods lasting more than 7 days consistently',
    action: 'Schedule a gynecologist appointment',
    urgency: 'medium',
  },
  {
    symptom: 'Fever, rash, or dizziness while using tampons',
    action: 'Remove tampon immediately and seek emergency care—possible TSS',
    urgency: 'high',
  },
  {
    symptom: 'Severe pain not relieved by medication',
    action: 'Could indicate endometriosis or other conditions—see a doctor',
    urgency: 'medium',
  },
  {
    symptom: 'Unusual smell or colored discharge with itching',
    action: 'May indicate infection—consult healthcare provider',
    urgency: 'medium',
  },
];

// Hygiene checklist items
const checklistItems = [
  { id: 'wash-hands', label: 'Wash hands before & after changing products', category: 'essential' },
  { id: 'change-product', label: 'Change pad/tampon every 4-8 hours', category: 'essential' },
  { id: 'front-back', label: 'Wipe front to back', category: 'essential' },
  { id: 'cotton-underwear', label: 'Wear cotton underwear', category: 'comfort' },
  { id: 'shower', label: 'Shower daily during period', category: 'comfort' },
  { id: 'hydrate', label: 'Drink plenty of water', category: 'wellness' },
  { id: 'dispose', label: 'Dispose products properly (wrap, don\'t flush)', category: 'essential' },
  { id: 'track', label: 'Log symptoms in tracker', category: 'wellness' },
];

export default function HygienePage() {
  const [reminders, setReminders] = useState<HygieneReminder[]>(() => getReminders());
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleToggleReminder = (id: string) => {
    toggleReminder(id);
    setReminders(getReminders());
  };

  const handleCheckItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  return (
    <>
      <Helmet>
        <title>Menstrual Hygiene Guide - Luna</title>
        <meta name="description" content="Learn about proper menstrual hygiene practices, product comparisons, reminders, and when to seek medical help." />
      </Helmet>

      <main className="min-h-screen pb-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-light text-coral text-sm font-medium mb-4">
              <Droplets className="w-4 h-4" />
              Hygiene Essentials
            </div>
            <h1 className="text-3xl font-bold mb-2">Menstrual Hygiene Guide</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Proper hygiene during your period keeps you comfortable and healthy. Here's everything you need to know.
            </p>
          </motion.div>

          {/* Routine Steps */}
          <section className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6 flex items-center gap-2"
            >
              <Sparkles className="w-6 h-6 text-lavender" />
              Daily Hygiene Routine
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {routineSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="soft" className="h-full p-5">
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="text-xs bg-mint-light text-mint px-2 py-1 rounded-lg inline-block">
                      💡 {step.tip}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Product Comparison */}
          <section className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6 flex items-center gap-2"
            >
              <Heart className="w-6 h-6 text-coral" />
              Period Product Comparison
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {productComparison.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant={product.color} className="h-full p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{product.icon}</span>
                      <h3 className="text-xl font-bold">{product.name}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Change: {product.changeTiming}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">✅ Pros:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {product.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">⚠️ Cons:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {product.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Hygiene Checklist */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-mint" />
                    Daily Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-3">
                    {checklistItems.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                          ${checkedItems.has(item.id) ? 'bg-mint-light' : 'bg-muted/50 hover:bg-muted'}
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={checkedItems.has(item.id)}
                          onChange={() => handleCheckItem(item.id)}
                          className="w-5 h-5 rounded border-2 border-primary accent-primary"
                        />
                        <span className={`flex-1 ${checkedItems.has(item.id) ? 'line-through text-muted-foreground' : ''}`}>
                          {item.label}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full
                          ${item.category === 'essential' ? 'bg-coral-light text-coral' : ''}
                          ${item.category === 'comfort' ? 'bg-lavender-light text-lavender' : ''}
                          ${item.category === 'wellness' ? 'bg-mint-light text-mint' : ''}
                        `}>
                          {item.category}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground text-center">
                    {checkedItems.size}/{checklistItems.length} completed
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Reminders */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-lavender" />
                    Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    Toggle reminders to help you stay on track with hygiene habits.
                  </p>
                  <div className="space-y-3">
                    {reminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all
                          ${reminder.enabled ? 'bg-lavender-light' : 'bg-muted/50'}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          {reminder.enabled ? (
                            <Bell className="w-5 h-5 text-lavender" />
                          ) : (
                            <BellOff className="w-5 h-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium">{reminder.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Every {reminder.interval} hours
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={reminder.enabled}
                          onCheckedChange={() => handleToggleReminder(reminder.id)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Red Flag Alerts */}
          <section className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="default" className="p-6 border-destructive/30">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-6 h-6" />
                    Red Flag Alerts - When to Seek Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {redFlags.map((flag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-l-4
                          ${flag.urgency === 'high' 
                            ? 'bg-destructive/10 border-destructive' 
                            : 'bg-muted/50 border-coral'}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <Shield className={`w-5 h-5 mt-0.5 flex-shrink-0
                            ${flag.urgency === 'high' ? 'text-destructive' : 'text-coral'}
                          `} />
                          <div>
                            <p className="font-medium">{flag.symptom}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              👉 {flag.action}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
