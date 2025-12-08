// Learn page - Educational content, myths vs facts, articles

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  ChevronDown,
  Brain,
  Heart,
  Zap,
  Droplets,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

// Educational articles data
const articles = [
  {
    id: 'cycle',
    title: 'Understanding Your Menstrual Cycle',
    icon: Calendar,
    color: 'coral' as const,
    summary: 'Learn about the four phases of your cycle and what happens in your body.',
    content: `
Your menstrual cycle is a monthly process that prepares your body for pregnancy. It's divided into four phases:

**1. Menstrual Phase (Days 1-5)**
This is when you have your period. The uterine lining sheds, causing bleeding that typically lasts 3-7 days. You may experience cramps, fatigue, and mood changes.

**2. Follicular Phase (Days 1-13)**
Overlapping with menstruation, this phase sees rising estrogen levels. Follicles in your ovaries develop, and you may feel more energetic and positive.

**3. Ovulation (Around Day 14)**
An egg is released from the ovary. This is your most fertile time. Some people notice clear, stretchy cervical mucus and mild abdominal pain.

**4. Luteal Phase (Days 15-28)**
After ovulation, progesterone rises. If the egg isn't fertilized, hormone levels drop, triggering your next period. PMS symptoms often occur during this phase.

Understanding these phases helps you predict your period, recognize fertility windows, and manage symptoms better.
    `,
  },
  {
    id: 'pms',
    title: 'PMS: Symptoms & Relief',
    icon: Brain,
    color: 'lavender' as const,
    summary: 'Premenstrual syndrome explained—symptoms, causes, and how to feel better.',
    content: `
PMS (Premenstrual Syndrome) affects up to 75% of menstruating people. It occurs in the week or two before your period.

**Common Symptoms:**
• Mood swings, irritability, anxiety
• Bloating and water retention
• Breast tenderness
• Food cravings (especially sweets)
• Fatigue and sleep problems
• Headaches
• Acne breakouts

**Why It Happens:**
Hormonal fluctuations, particularly the drop in estrogen and progesterone before your period, affect brain chemicals like serotonin.

**Relief Strategies:**
• **Exercise:** Even a 30-minute walk can boost mood and reduce bloating
• **Diet:** Limit salt, caffeine, and alcohol; eat complex carbs and calcium-rich foods
• **Sleep:** Aim for 7-9 hours of quality sleep
• **Supplements:** Magnesium, vitamin B6, and calcium may help
• **Heat:** Use heating pads for cramps
• **Relaxation:** Try yoga, meditation, or deep breathing

If PMS severely impacts your daily life, talk to a doctor about PMDD (Premenstrual Dysphoric Disorder) or treatment options.
    `,
  },
  {
    id: 'discharge',
    title: 'Vaginal Discharge Explained',
    icon: Droplets,
    color: 'mint' as const,
    summary: 'What\'s normal, what\'s not, and when to see a doctor.',
    content: `
Vaginal discharge is completely normal and actually a sign of a healthy reproductive system. It keeps the vagina clean and protected from infections.

**Normal Discharge Changes Throughout Your Cycle:**
• **After period:** Minimal, may be slightly dry
• **Before ovulation:** Increases, becomes creamy white
• **During ovulation:** Clear, stretchy, egg-white consistency
• **After ovulation:** Thicker, white or slightly yellow

**Normal Characteristics:**
• Clear to white/off-white color
• Mild or no odor
• Amount varies throughout cycle
• Consistency changes with hormones

**When to See a Doctor:**
🚨 **Green or gray discharge** - may indicate infection
🚨 **Cottage cheese texture with itching** - possible yeast infection
🚨 **Fishy odor, especially after sex** - may be bacterial vaginosis
🚨 **Bloody discharge outside your period** - needs evaluation
🚨 **Discharge with pelvic pain or fever** - possible infection

Remember: The vagina is self-cleaning! Never douche, and use only water on the external vulva.
    `,
  },
  {
    id: 'pcos',
    title: 'PCOS Awareness',
    icon: Heart,
    color: 'coral' as const,
    summary: 'Understanding Polycystic Ovary Syndrome—symptoms, diagnosis, and management.',
    content: `
PCOS (Polycystic Ovary Syndrome) affects about 1 in 10 women of reproductive age. It's a hormonal disorder that can impact periods, fertility, and overall health.

**Common Signs & Symptoms:**
• Irregular or absent periods
• Excess hair growth (face, chest, back)
• Acne that persists beyond teenage years
• Weight gain or difficulty losing weight
• Hair thinning on the scalp
• Darkening of skin in creases
• Multiple small cysts on ovaries (seen on ultrasound)

**What Causes PCOS?**
The exact cause is unknown, but factors include:
• Insulin resistance (body can't use insulin effectively)
• Higher levels of androgens (male hormones)
• Genetics (runs in families)
• Inflammation

**Management Options:**
• **Lifestyle changes:** Regular exercise and balanced diet can improve insulin sensitivity
• **Birth control pills:** Help regulate periods and reduce androgen levels
• **Metformin:** Helps with insulin resistance
• **Anti-androgen medications:** For excess hair growth or acne
• **Fertility treatments:** If trying to conceive

**Important:** If you suspect PCOS, see a gynecologist. Early diagnosis and management can prevent complications like diabetes and heart disease.
    `,
  },
  {
    id: 'cramps',
    title: 'Managing Period Cramps',
    icon: Zap,
    color: 'lavender' as const,
    summary: 'Why cramps happen and effective ways to find relief.',
    content: `
Period cramps (dysmenorrhea) are caused by prostaglandins—chemicals that make your uterus contract to shed its lining. Some cramping is normal, but severe pain isn't something you have to endure.

**Types of Cramps:**
• **Primary:** Normal cramps from uterine contractions, usually starting 1-2 days before or at the start of your period
• **Secondary:** Caused by conditions like endometriosis, fibroids, or adenomyosis

**Effective Relief Methods:**

🔥 **Heat Therapy**
A heating pad or warm bath relaxes uterine muscles. Studies show heat is as effective as ibuprofen!

💊 **Over-the-Counter Pain Relief**
NSAIDs like ibuprofen work best when taken at the first sign of cramps or even before your period starts.

🏃 **Exercise**
Light movement releases endorphins. Try yoga, walking, or gentle stretching.

🍵 **Diet & Hydration**
• Drink plenty of water
• Limit salty and fatty foods
• Try anti-inflammatory foods: ginger, turmeric, fatty fish
• Avoid excess caffeine and alcohol

🧘 **Relaxation Techniques**
Deep breathing, meditation, and acupressure can help manage pain.

**When to See a Doctor:**
If cramps are severe enough to interfere with daily life, cause vomiting, or don't improve with OTC medication, consult a healthcare provider.
    `,
  },
];

// Myths vs Facts data
const mythsFacts = [
  {
    myth: "You shouldn't exercise during your period",
    fact: "Exercise is actually beneficial! It releases endorphins that can reduce cramps and improve mood. Light to moderate exercise like yoga, walking, or swimming is especially helpful.",
    category: "Exercise",
  },
  {
    myth: "You can't get pregnant during your period",
    fact: "While unlikely, it's possible—especially if you have a short cycle. Sperm can survive up to 5 days, so unprotected sex late in your period could lead to pregnancy if you ovulate early.",
    category: "Fertility",
  },
  {
    myth: "Period blood is dirty or toxic",
    fact: "Menstrual blood is not dirty! It's made up of blood, uterine tissue, and vaginal secretions. It's a natural, healthy bodily process—not waste or toxins.",
    category: "Basics",
  },
  {
    myth: "You shouldn't shower or bathe during your period",
    fact: "Bathing is perfectly safe and encouraged! Warm water can actually soothe cramps. Just avoid douching, as it can disrupt your natural vaginal flora.",
    category: "Hygiene",
  },
  {
    myth: "Women's periods sync up when they live together",
    fact: "Despite the popular belief, scientific studies haven't proven 'menstrual synchrony.' Any perceived syncing is likely coincidence due to cycle length variations.",
    category: "Myths",
  },
  {
    myth: "Tampons can get lost inside you",
    fact: "Tampons cannot get lost—the cervix prevents anything from going further. If a tampon feels stuck, relax and use your fingers to remove it, or see a doctor for help.",
    category: "Products",
  },
  {
    myth: "PMS is just in your head",
    fact: "PMS is a real physiological condition caused by hormonal changes. Symptoms like mood swings, bloating, and fatigue are valid and can be managed with lifestyle changes or medical help.",
    category: "PMS",
  },
  {
    myth: "Irregular periods always mean something is wrong",
    fact: "Some irregularity is normal, especially during puberty, after childbirth, or approaching menopause. However, consistently irregular cycles should be discussed with a doctor.",
    category: "Cycle",
  },
];

export default function LearnPage() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [showFacts, setShowFacts] = useState<Record<number, boolean>>({});

  const toggleFact = (index: number) => {
    setShowFacts(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <Helmet>
        <title>Learn About Menstrual Health - Luna</title>
        <meta name="description" content="Educational content about menstrual cycles, PMS, hygiene, PCOS, and common myths vs facts about periods." />
      </Helmet>

      <main className="min-h-screen pb-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light text-lavender text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Knowledge is Power
            </div>
            <h1 className="text-3xl font-bold mb-2">Learn & Educate</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Understanding your body helps you take better care of it. Explore articles on menstrual health and discover the truth behind common myths.
            </p>
          </motion.div>

          {/* Articles Section */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6 flex items-center gap-2"
            >
              <Lightbulb className="w-6 h-6 text-coral" />
              Health Topics
            </motion.h2>

            <div className="space-y-4">
              {articles.map((article, index) => {
                const Icon = article.icon;
                const isExpanded = expandedArticle === article.id;

                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    id={article.id}
                  >
                    <Card variant={article.color} className="overflow-hidden">
                      <button
                        onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                        className="w-full p-6 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                              ${article.color === 'coral' ? 'bg-coral text-primary-foreground' : ''}
                              ${article.color === 'lavender' ? 'bg-lavender text-primary-foreground' : ''}
                              ${article.color === 'mint' ? 'bg-mint text-accent-foreground' : ''}
                            `}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{article.title}</h3>
                              <p className="text-sm text-muted-foreground">{article.summary}</p>
                            </div>
                          </div>
                          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0 pb-6 px-6">
                              <div className="border-t border-border/50 pt-6">
                                <div className="prose prose-sm max-w-none text-foreground">
                                  {article.content.split('\n').map((paragraph, i) => {
                                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                      return (
                                        <h4 key={i} className="font-bold text-lg mt-4 mb-2">
                                          {paragraph.replace(/\*\*/g, '')}
                                        </h4>
                                      );
                                    }
                                    if (paragraph.startsWith('•')) {
                                      return (
                                        <p key={i} className="text-muted-foreground ml-4 my-1">
                                          {paragraph}
                                        </p>
                                      );
                                    }
                                    if (paragraph.startsWith('🚨')) {
                                      return (
                                        <p key={i} className="text-destructive my-1">
                                          {paragraph}
                                        </p>
                                      );
                                    }
                                    if (paragraph.trim()) {
                                      return (
                                        <p key={i} className="text-muted-foreground my-2">
                                          {paragraph.replace(/\*\*(.*?)\*\*/g, (_, text) => text)}
                                        </p>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Myths vs Facts Section */}
          <section id="myths">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6 flex items-center gap-2"
            >
              <Brain className="w-6 h-6 text-lavender" />
              Myths vs Facts
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-4">
              {mythsFacts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`p-5 cursor-pointer transition-all ${showFacts[index] ? 'bg-mint-light' : ''}`}
                    onClick={() => toggleFact(index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                        ${showFacts[index] ? 'bg-mint text-primary-foreground' : 'bg-coral text-primary-foreground'}
                      `}>
                        {showFacts[index] ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground mb-2 inline-block">
                          {item.category}
                        </span>
                        <p className={`font-medium ${showFacts[index] ? 'line-through text-muted-foreground' : ''}`}>
                          {showFacts[index] ? 'MYTH: ' : ''}{item.myth}
                        </p>
                        <AnimatePresence>
                          {showFacts[index] && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-foreground mt-3 bg-background/50 p-3 rounded-lg"
                            >
                              ✓ FACT: {item.fact}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        {!showFacts[index] && (
                          <p className="text-xs text-muted-foreground mt-2">Tap to reveal the truth</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
