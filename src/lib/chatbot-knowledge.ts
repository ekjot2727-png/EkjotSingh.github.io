// Internal knowledge base for the menstrual health chatbot

export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  category: string;
  severity?: 'info' | 'warning' | 'urgent';
}

export const knowledgeBase: KnowledgeEntry[] = [
  // Basic Period Questions
  {
    keywords: ['what is period', 'what is menstruation', 'explain period', 'periods mean', 'period', 'menstruation', 'menstrual', 'menses', 'monthly cycle', 'what are periods', 'tell me about periods', 'periods kya hai', 'mc'],
    response: "A period (menstruation) is the monthly shedding of the uterine lining. It typically lasts 3-7 days and occurs every 21-35 days. It's a completely natural part of reproductive health that begins during puberty. 🌸\n\nDuring this time, the body releases the lining of the uterus through the vagina, which appears as blood flow.",
    category: 'basics',
  },
  {
    keywords: ['normal cycle', 'cycle length', 'how long cycle', 'cycle', 'days', 'how many days', 'duration', 'length', 'average cycle', '28 days', 'regular cycle', 'irregular cycle'],
    response: "A normal menstrual cycle ranges from 21 to 35 days, with 28 days being the average. Your cycle length is counted from the first day of one period to the first day of the next. Some variation is completely normal!\n\n📅 Cycle phases:\n• Menstrual (Days 1-5): Period bleeding\n• Follicular (Days 1-13): Egg develops\n• Ovulation (Day 14): Egg released\n• Luteal (Days 15-28): Preparation for pregnancy",
    category: 'cycle',
  },
  {
    keywords: ['first period', 'menarche', 'when start', 'age', 'puberty', 'start period', 'beginning', 'teenage', 'young girl', 'daughter'],
    response: "Most people get their first period (menarche) between ages 10-15, with 12 being the average age. It's normal for early periods to be irregular for the first 1-2 years as your body adjusts.\n\n🌱 Signs your first period is coming:\n• Breast development\n• Pubic/underarm hair\n• Growth spurt\n• White discharge (6-12 months before)",
    category: 'basics',
  },

  // Symptoms & Pain
  {
    keywords: ['cramps', 'period pain', 'painful period', 'dysmenorrhea', 'pain', 'stomach pain', 'belly pain', 'hurts', 'ache', 'cramping', 'abdominal pain', 'lower back pain', 'pet dard'],
    response: "Period cramps are caused by uterine contractions and are very common. 💪 Here's how to manage them:\n\n🔥 Heat therapy: Heating pad on lower abdomen\n💧 Stay hydrated: Drink warm water/herbal tea\n🧘 Gentle exercise: Yoga, walking, stretching\n💊 Pain relief: Ibuprofen or naproxen\n🍌 Foods that help: Bananas, ginger, chamomile\n\n⚠️ See a doctor if pain is severe and affects daily life.",
    category: 'symptoms',
  },
  {
    keywords: ['heavy bleeding', 'heavy flow', 'too much blood', 'menorrhagia', 'heavy', 'lots of blood', 'soaking', 'flooding', 'clots', 'blood clots', 'excessive bleeding'],
    response: "Heavy bleeding may include: soaking through pads/tampons hourly, periods lasting over 7 days, or passing large clots.\n\n🚨 This could indicate:\n• Fibroids\n• Hormonal imbalances\n• PCOS\n• Thyroid issues\n\n✅ Tips for managing:\n• Use overnight pads\n• Track your flow\n• Eat iron-rich foods\n\n⚠️ Please consult a gynecologist if this happens regularly.",
    category: 'symptoms',
    severity: 'warning',
  },
  {
    keywords: ['pms', 'premenstrual', 'mood swings', 'irritability before period', 'mood', 'emotional', 'crying', 'angry', 'sad', 'depression', 'anxiety', 'irritable', 'mood changes'],
    response: "PMS affects up to 75% of menstruating people! 💕 Common symptoms include:\n\n😢 Emotional: Mood swings, irritability, anxiety, sadness\n🤕 Physical: Bloating, breast tenderness, headaches, fatigue\n\n🌟 Tips to manage:\n• Exercise regularly\n• Reduce caffeine & salt\n• Get enough sleep (7-9 hours)\n• Try vitamin B6 & magnesium\n• Practice stress relief (meditation, yoga)\n\nSymptoms typically occur 1-2 weeks before your period.",
    category: 'symptoms',
  },
  {
    keywords: ['headache', 'migraine', 'head pain period', 'head hurts', 'head ache'],
    response: "Menstrual migraines are linked to hormone changes, especially dropping estrogen levels. 🧠\n\n💡 Management tips:\n• Stay hydrated\n• Maintain regular sleep schedule\n• Try magnesium supplements\n• Keep a symptom diary\n• Apply cold compress to forehead\n• Consider caffeine (in moderation)\n\n⚠️ Consult a doctor if headaches are severe or don't respond to treatment.",
    category: 'symptoms',
  },
  {
    keywords: ['bloating', 'water retention', 'feel puffy', 'bloated', 'swelling', 'weight gain', 'puffy', 'swollen'],
    response: "Bloating before and during periods is caused by hormonal water retention. 💧\n\n✅ Relief tips:\n• Reduce salt intake\n• Eat potassium-rich foods (bananas, avocados, leafy greens)\n• Drink MORE water (seems counterintuitive but helps!)\n• Light exercise\n• Avoid carbonated drinks\n• Try dandelion tea\n\nIt typically resolves after your period ends. 🌸",
    category: 'symptoms',
  },
  {
    keywords: ['breast pain', 'breast tenderness', 'sore breasts', 'chest pain', 'boob pain'],
    response: "Breast tenderness before periods is very common and caused by hormonal changes. 💕\n\n✅ Relief tips:\n• Wear a supportive bra\n• Reduce caffeine intake\n• Apply warm or cold compress\n• Try evening primrose oil\n• Gentle massage\n\nThe tenderness usually goes away once your period starts.",
    category: 'symptoms',
  },
  {
    keywords: ['fatigue', 'tired', 'exhausted', 'no energy', 'sleepy', 'weakness', 'low energy'],
    response: "Period fatigue is real! 😴 It's caused by hormonal changes and blood loss.\n\n⚡ Energy boosters:\n• Get 7-9 hours of sleep\n• Eat iron-rich foods (spinach, lentils, red meat)\n• Stay hydrated\n• Light exercise (even a short walk helps!)\n• Take short power naps\n• Avoid heavy meals\n\n⚠️ If fatigue is severe, you might be anemic - check with a doctor.",
    category: 'symptoms',
  },
  {
    keywords: ['acne', 'pimples', 'breakout', 'skin', 'face', 'spots', 'blemishes'],
    response: "Hormonal acne around periods is super common! 🌟\n\n✅ Skincare tips:\n• Cleanse gently twice daily\n• Use non-comedogenic products\n• Don't touch/pick at your face\n• Stay hydrated\n• Reduce dairy & sugar\n• Try tea tree oil (diluted)\n• Consider salicylic acid products\n\nBreakouts typically improve after your period starts.",
    category: 'symptoms',
  },

  // Discharge
  {
    keywords: ['discharge', 'vaginal discharge', 'normal discharge', 'white stuff', 'fluid', 'wetness', 'secretion'],
    response: "Vaginal discharge is completely normal and changes throughout your cycle! 🌸\n\n📅 Normal discharge by phase:\n• After period: Dry or minimal\n• Pre-ovulation: White, creamy\n• Ovulation: Clear, stretchy (like egg white)\n• Post-ovulation: Thick, white\n\n🚨 See a doctor if you notice:\n• Green/gray/yellow color\n• Strong fishy odor\n• Itching or burning\n• Cottage cheese texture with itching",
    category: 'hygiene',
  },
  {
    keywords: ['white discharge', 'milky discharge', 'cream discharge'],
    response: "White, milky discharge is typically normal! It often appears before ovulation or your period. 🌸\n\n⚠️ However, if it's:\n• Thick like cottage cheese with itching → Could be yeast infection\n• Gray/white with fishy smell → Could be bacterial vaginosis\n\n✅ Normal white discharge is odorless or has a mild scent.",
    category: 'hygiene',
  },
  {
    keywords: ['brown discharge', 'dark discharge', 'old blood', 'spotting', 'brown blood'],
    response: "Brown discharge is usually just old blood and is completely normal! 🤎\n\n📅 When it's normal:\n• At the beginning of your period\n• At the end of your period\n• During ovulation (mid-cycle spotting)\n\n⚠️ See a doctor if:\n• It persists for weeks\n• Has an unusual smell\n• Accompanied by pain\n• Happens after menopause",
    category: 'hygiene',
  },
  {
    keywords: ['smell', 'odor', 'fishy smell', 'bad smell', 'smelly', 'stink', 'foul smell'],
    response: "Let's talk about vaginal odor! 🌸\n\n✅ Normal: Mild, musky scent that changes throughout your cycle\n\n🚨 Concerning (see a doctor):\n• Strong fishy smell → Bacterial vaginosis\n• Yeasty/bread-like → Yeast infection\n• Rotten smell → Forgotten tampon or infection\n\n💡 Tips:\n• Wear breathable cotton underwear\n• Avoid scented products down there\n• Change pads/tampons regularly\n• Stay hydrated",
    category: 'hygiene',
    severity: 'warning',
  },

  // Hygiene
  {
    keywords: ['how to clean', 'washing', 'hygiene', 'keep clean', 'clean', 'wash', 'shower', 'bath', 'intimate wash', 'vaginal wash'],
    response: "Period hygiene is simple! 🧼\n\n✅ Do:\n• Clean the vulva (outside) with warm water\n• Use mild, unscented soap only on the outside\n• Wipe front to back\n• Change pads/tampons every 4-6 hours\n• Wear breathable cotton underwear\n• Shower daily\n\n❌ Don't:\n• Douche (vagina cleans itself!)\n• Use scented products inside\n• Use harsh soaps\n• Leave tampons in too long",
    category: 'hygiene',
  },
  {
    keywords: ['pad', 'tampon', 'cup', 'products', 'what to use', 'sanitary', 'napkin', 'menstrual products', 'protection', 'menstrual cup', 'period products'],
    response: "Choose what's comfortable for you! 🌸\n\n📋 **Pads:**\n✅ Easy to use, no insertion\n✅ Various sizes for different flows\n❌ Can feel bulky, not for swimming\n\n📋 **Tampons:**\n✅ Discreet, great for sports/swimming\n❌ TSS risk if left too long, insertion required\n\n📋 **Menstrual Cups:**\n✅ Eco-friendly, lasts 12 hours, reusable for years\n❌ Learning curve, initial cost\n\n📋 **Period Underwear:**\n✅ Comfortable, reusable\n❌ Needs washing, may feel damp",
    category: 'products',
  },
  {
    keywords: ['change pad', 'how often change', 'tampon time', 'change tampon', 'change frequency', 'hours'],
    response: "⏰ How often to change period products:\n\n🩹 **Pads:** Every 4-6 hours (more often on heavy days)\n\n🩹 **Tampons:** Every 4-8 hours (NEVER exceed 8 hours due to TSS risk)\n\n🥤 **Menstrual Cups:** Every 8-12 hours\n\n👙 **Period Underwear:** Every 8-12 hours depending on flow\n\n💡 Tip: Set reminders on your phone if you tend to forget!",
    category: 'hygiene',
  },
  {
    keywords: ['toxic shock', 'tss', 'tampon danger', 'tampon safe', 'tampon risk'],
    response: "🚨 Toxic Shock Syndrome (TSS) is rare but serious!\n\n**Prevention:**\n• Change tampons every 4-8 hours\n• Never exceed 8 hours\n• Use lowest absorbency needed\n• Alternate with pads at night\n• Wash hands before inserting\n\n**Emergency signs (seek immediate care):**\n• Sudden high fever\n• Rash (looks like sunburn)\n• Dizziness/fainting\n• Vomiting/diarrhea\n• Muscle aches\n\nRemove your tampon and go to ER immediately if you experience these!",
    category: 'hygiene',
    severity: 'urgent',
  },

  // PCOS & Conditions
  {
    keywords: ['pcos', 'polycystic', 'irregular periods pcos', 'cyst', 'ovary cyst', 'polycystic ovary'],
    response: "💜 PCOS (Polycystic Ovary Syndrome) affects 1 in 10 women.\n\n**Symptoms:**\n• Irregular or missed periods\n• Excess hair growth (face, chest)\n• Acne\n• Weight gain\n• Difficulty getting pregnant\n\n**Management:**\n• Healthy diet & regular exercise\n• Maintain healthy weight\n• Medications (birth control, metformin)\n• Manage stress\n\n⚠️ Please consult a gynecologist for proper diagnosis and treatment plan.",
    category: 'conditions',
    severity: 'warning',
  },
  {
    keywords: ['endometriosis', 'endo', 'painful periods extreme', 'severe pain', 'extreme pain'],
    response: "💜 Endometriosis affects about 10% of women worldwide.\n\n**What is it?** Tissue similar to uterine lining grows outside the uterus.\n\n**Symptoms:**\n• Severe menstrual cramps\n• Pain during/after sex\n• Heavy periods\n• Pain with bowel movements\n• Infertility\n\n**Treatments:**\n• Pain medication\n• Hormonal therapy\n• Surgery (in severe cases)\n\n⚠️ If you experience debilitating pain, please see a gynecologist!",
    category: 'conditions',
    severity: 'warning',
  },
  {
    keywords: ['fibroids', 'uterine fibroids', 'growths', 'tumor', 'fibroid'],
    response: "💜 Fibroids are non-cancerous growths in the uterus (very common!).\n\n**Symptoms (many have none):**\n• Heavy periods\n• Pelvic pressure/pain\n• Frequent urination\n• Constipation\n• Enlarged abdomen\n\n**Treatment options:**\n• Watchful waiting (if no symptoms)\n• Medications\n• Minimally invasive procedures\n• Surgery\n\nMany women have fibroids without knowing. Consult a doctor if you have symptoms.",
    category: 'conditions',
  },

  // Fertility
  {
    keywords: ['fertility', 'fertile', 'ovulation', 'get pregnant', 'conception', 'pregnant', 'baby', 'conceive', 'trying', 'fertile window', 'ovulate'],
    response: "🌸 Understanding your fertile window:\n\n**Ovulation** typically occurs 14 days before your next period.\n\n**Fertile window:** 5 days before ovulation + ovulation day\n\n**Signs of ovulation:**\n• Clear, stretchy discharge (egg-white consistency)\n• Slight temperature rise\n• Mild cramping on one side\n• Increased libido\n\n**Tracking methods:**\n• Calendar tracking\n• Ovulation test strips\n• Basal body temperature\n• Cervical mucus monitoring",
    category: 'fertility',
  },
  {
    keywords: ['late period', 'missed period', 'period not coming', 'delayed period', 'skipped period', 'no period', 'period late', 'havent got period'],
    response: "😟 Missed or late period? Here are common causes:\n\n**Non-pregnancy causes:**\n• Stress\n• Weight changes\n• Excessive exercise\n• PCOS\n• Thyroid issues\n• Perimenopause\n• Recent illness\n• Travel/schedule changes\n\n**What to do:**\n1. If sexually active → Take a pregnancy test\n2. Wait a few days if stressed/sick\n3. See a doctor if periods are consistently irregular (3+ months)\n\n💕 A late period doesn't always mean something is wrong!",
    category: 'cycle',
  },
  {
    keywords: ['pregnancy', 'am i pregnant', 'pregnancy test', 'pregnant test', 'could i be pregnant'],
    response: "🤰 Wondering if you might be pregnant?\n\n**Early pregnancy signs:**\n• Missed period\n• Nausea/morning sickness\n• Breast tenderness\n• Fatigue\n• Frequent urination\n• Food aversions/cravings\n\n**When to test:**\n• Wait until your period is late (at least 1 day)\n• Best time: First morning urine\n• Most accurate: 1 week after missed period\n\n💡 Home tests are 99% accurate when used correctly!",
    category: 'fertility',
  },

  // Diet & Lifestyle
  {
    keywords: ['diet', 'food', 'what to eat', 'nutrition period', 'eat', 'eating', 'foods', 'healthy', 'cravings'],
    response: "🍎 Best foods during your period:\n\n**Eat more:**\n• Iron-rich: Spinach, lentils, red meat, beans\n• Anti-inflammatory: Salmon, berries, leafy greens\n• Magnesium: Dark chocolate, nuts, bananas\n• Hydrating: Water, herbal teas, fruits\n• Calcium: Yogurt, milk, cheese\n\n**Limit:**\n• Salt (causes bloating)\n• Caffeine (may worsen cramps)\n• Alcohol (dehydrating)\n• Processed foods\n• Sugary snacks (energy crashes)\n\n🍫 Yes, dark chocolate is actually helpful!",
    category: 'lifestyle',
  },
  {
    keywords: ['exercise', 'workout', 'can i exercise', 'gym', 'sports', 'physical activity', 'yoga', 'running'],
    response: "💪 Yes, exercise during periods is beneficial!\n\n**Great activities:**\n• 🧘 Yoga (especially child's pose, cat-cow)\n• 🚶 Walking\n• 🏊 Swimming (yes, with tampon/cup!)\n• 🚴 Light cycling\n• 🤸 Stretching\n\n**Benefits:**\n• Reduces cramps (releases endorphins)\n• Improves mood\n• Decreases bloating\n• Boosts energy\n\n**Tips:**\n• Listen to your body\n• Stay hydrated\n• Wear comfortable clothes\n• Rest if you need to - that's okay too! 💕",
    category: 'lifestyle',
  },
  {
    keywords: ['sleep', 'insomnia', 'cant sleep', 'sleeping', 'tired', 'rest'],
    response: "😴 Sleep tips during your period:\n\n**Why sleep is affected:**\n• Hormonal fluctuations\n• Cramps and discomfort\n• Temperature changes\n• Anxiety\n\n**Better sleep tips:**\n• Keep a regular sleep schedule\n• Use a heating pad for cramps\n• Sleep in fetal position\n• Avoid screens 1 hour before bed\n• Keep room cool (68-72°F/20-22°C)\n• Try magnesium supplements\n• Use overnight pads or period underwear\n• Practice relaxation techniques\n\n💤 Aim for 7-9 hours of sleep!",
    category: 'lifestyle',
  },
  {
    keywords: ['sex', 'intercourse', 'intimate', 'period sex', 'can i have sex'],
    response: "💕 Period sex is completely safe!\n\n**Facts:**\n• It's normal and healthy\n• May actually help with cramps (releases endorphins)\n• Use protection - you CAN get pregnant during your period\n• Use a towel for easier cleanup\n• Shower sex is an option\n• Menstrual discs can be worn during sex\n\n**Communication is key:** Talk with your partner about what you're both comfortable with.\n\n⚠️ Always use protection against STIs regardless of where you are in your cycle.",
    category: 'lifestyle',
  },

  // Myths
  {
    keywords: ['myth', 'true or false', 'is it true', 'myths', 'facts', 'misconception'],
    response: "🔍 Period Myths BUSTED!\n\n❌ Myth: You can't exercise → ✅ Exercise helps!\n❌ Myth: Can't shower/bathe → ✅ Please do shower!\n❌ Myth: Can't swim → ✅ Use tampon/cup and swim!\n❌ Myth: Can't cook/touch pickles → ✅ Total nonsense!\n❌ Myth: Periods are dirty → ✅ It's natural body function!\n❌ Myth: Everyone syncs cycles → ✅ Not scientifically proven\n❌ Myth: PMS isn't real → ✅ It's very real!\n❌ Myth: Can't get pregnant → ✅ You CAN get pregnant!\n\n💜 Your period is normal and nothing to be ashamed of!",
    category: 'myths',
  },

  // Emergency / Red Flags
  {
    keywords: ['emergency', 'urgent', 'call doctor', 'serious', 'worried', 'scared', 'help', 'danger', 'dangerous', 'problem'],
    response: "🚨 Seek IMMEDIATE medical attention if you experience:\n\n• Soaking through a pad/tampon every hour for 2+ hours\n• Periods lasting more than 7 days\n• Severe pain not relieved by medication\n• Fever with tampon use (possible TSS)\n• Fainting or dizziness\n• Unusually large blood clots (bigger than a quarter)\n• Bleeding between periods\n• Bleeding after menopause\n\n📞 Don't hesitate to go to the ER or call your doctor!\n\n💕 Your health and safety come first!",
    category: 'emergency',
    severity: 'urgent',
  },
  {
    keywords: ['doctor', 'gynecologist', 'when see doctor', 'consult', 'appointment', 'checkup', 'visit doctor'],
    response: "👩‍⚕️ When to see a gynecologist:\n\n**Schedule an appointment if you have:**\n• Irregular or absent periods (3+ months)\n• Extremely heavy or painful periods\n• Unusual discharge or odor\n• Pelvic pain outside periods\n• Bleeding between periods\n• Pain during sex\n• Difficulty getting pregnant\n\n**Regular visits:**\n• First visit: Ages 13-15 or when sexually active\n• Annual checkups recommended\n• Pap smears: Start at age 21\n\n💜 It's okay to feel nervous - gynecologists are here to help!",
    category: 'care',
  },

  // Default/Fallback
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'hii', 'heyy', 'hola', 'namaste'],
    response: "Hello! 💕 I'm Luna, your menstrual health assistant. I'm here to help with questions about:\n\n🌸 Periods and cycles\n💊 Symptoms and pain relief\n🧼 Hygiene tips\n🏥 When to see a doctor\n🤔 Myths vs. facts\n👩‍⚕️ Finding gynecologists\n\nWhat would you like to know about today?",
    category: 'greeting',
  },
  {
    keywords: ['thank', 'thanks', 'helpful', 'appreciate', 'thank you', 'thx', 'tysm'],
    response: "You're so welcome! 💕 Remember, I'm here to provide general information. For personal medical advice, always consult a healthcare professional.\n\nTake care of yourself! Feel free to come back anytime you have questions. 🌸",
    category: 'closing',
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    response: "Goodbye! Take care of yourself! 💕 Remember, if you have any health concerns, don't hesitate to reach out to a healthcare professional. See you next time! 🌸",
    category: 'closing',
  },
  {
    keywords: ['find doctor', 'nearby doctor', 'gynecologist near', 'doctor search', 'recommend doctor', 'good doctor'],
    response: "I can help you find gynecologists! 👩‍⚕️ Just tell me which city you're in (like 'doctors in Delhi' or 'gynecologist in Jaipur'), and I'll show you recommended healthcare providers.\n\n📍 Cities I have data for: Jaipur, Delhi, Mumbai, Bangalore, Jodhpur, Udaipur",
    category: 'care',
  },
  {
    keywords: ['who are you', 'what are you', 'your name', 'about you', 'luna'],
    response: "Hi! I'm Luna 🌙 - your friendly menstrual health assistant!\n\nI'm here to help answer your questions about periods, menstrual health, hygiene, symptoms, and more. I can also help you find gynecologists in various cities.\n\n💕 Remember: I provide general information, not medical advice. For personal health concerns, please consult a healthcare professional!\n\nHow can I help you today?",
    category: 'greeting',
  },
];

/**
 * Finds the best matching response from the knowledge base
 * Uses improved matching with word-level analysis
 */
export function findBestResponse(query: string): KnowledgeEntry | null {
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/);
  
  // Find entries with matching keywords
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    
    for (const keyword of entry.keywords) {
      const lowerKeyword = keyword.toLowerCase();
      
      // Exact phrase match (highest priority)
      if (lowerQuery.includes(lowerKeyword)) {
        score += lowerKeyword.length * 3;
      }
      
      // Word-level matching
      const keywordWords = lowerKeyword.split(/\s+/);
      for (const kw of keywordWords) {
        if (kw.length >= 3) { // Only match words with 3+ characters
          // Check if any query word starts with or contains the keyword
          for (const qw of queryWords) {
            if (qw === kw) {
              score += kw.length * 2; // Exact word match
            } else if (qw.includes(kw) || kw.includes(qw)) {
              score += kw.length; // Partial word match
            }
          }
        }
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Return match only if score is meaningful (at least 3 points)
  return bestScore >= 3 ? bestMatch : null;
}

/**
 * Gets a fallback response when no match is found
 */
export function getFallbackResponse(): string {
  return "I'd love to help! 💕 I can answer questions about:\n\n🌸 **Periods & Cycles** - What's normal, cycle tracking, late periods\n💊 **Symptoms** - Cramps, PMS, bloating, headaches, fatigue\n🧼 **Hygiene** - Cleaning, products (pads/tampons/cups), how often to change\n🩺 **Conditions** - PCOS, endometriosis, fibroids\n🤰 **Fertility** - Ovulation, fertile window, pregnancy\n🍎 **Lifestyle** - Diet, exercise, sleep during periods\n👩‍⚕️ **Doctors** - Find gynecologists in your city\n\nTry asking something like:\n• \"What helps with period cramps?\"\n• \"Is my discharge normal?\"\n• \"Find doctors in Delhi\"\n• \"What foods should I eat during my period?\"\n\nWhat would you like to know? 🌙";
}

/**
 * Sample doctors data for demo purposes - expanded list
 */
export function getSampleDoctors(city: string = 'Jaipur'): Array<{
  id: string;
  name: string;
  specialty: string;
  area: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  experience?: number;
  consultationFee?: number;
  services?: string[];
}> {
  const doctors: Record<string, Array<{
    id: string;
    name: string;
    specialty: string;
    area: string;
    address: string;
    phone: string;
    rating: number;
    distance: string;
    experience?: number;
    consultationFee?: number;
    services?: string[];
  }>> = {
    'jaipur': [
      { id: '1', name: 'Dr. Shikha Gupta', specialty: 'Gynecologist & Obstetrician', area: 'Vaishali Nagar', address: 'Opp. Amrapali Circle, Vaishali Nagar', phone: '+91-141-4567890', rating: 4.8, distance: '2.5 km', experience: 15, consultationFee: 500, services: ['Prenatal Care', 'High-Risk Pregnancy', 'PCOS Treatment'] },
      { id: '2', name: 'Dr. Poonam Khandelwal', specialty: 'Gynecologist', area: 'Raja Park', address: 'Near Panchwati Circle, Raja Park', phone: '+91-141-2345678', rating: 4.6, distance: '3.1 km', experience: 12, consultationFee: 400, services: ['General Gynecology', 'Infertility', 'Menstrual Disorders'] },
      { id: '3', name: 'Apex Hospital - Gynecology', specialty: 'Multi-specialty Hospital', area: 'Malviya Nagar', address: 'Calgiri Road, Malviya Nagar', phone: '+91-7414009900', rating: 4.7, distance: '4.2 km', experience: 20, consultationFee: 600, services: ['Emergency Care', 'Surgery', 'IVF'] },
      { id: '4', name: 'Dr. Rekha Sharma', specialty: 'Gynecologist & Fertility Specialist', area: 'Mansarovar', address: 'Sector 5, Mansarovar', phone: '+91-141-3456789', rating: 4.5, distance: '5.0 km', experience: 18, consultationFee: 700, services: ['Fertility Treatment', 'IUI', 'Hormonal Therapy'] },
      { id: '5', name: 'Fortis Escorts Hospital', specialty: 'Multi-specialty Hospital', area: 'JLN Marg', address: 'Jawaharlal Nehru Marg', phone: '+91-141-2547000', rating: 4.9, distance: '6.3 km', experience: 25, consultationFee: 800, services: ['Advanced Surgery', 'Cancer Care', 'Robotic Surgery'] },
      { id: '10', name: 'Dr. Anjali Verma', specialty: 'Gynecologist', area: 'C-Scheme', address: 'Near Rajmandir Cinema, C-Scheme', phone: '+91-141-5678901', rating: 4.7, distance: '3.8 km', experience: 14, consultationFee: 550, services: ['Adolescent Gynecology', 'Menopause Care', 'Contraception'] },
      { id: '11', name: 'Dr. Sunita Agarwal', specialty: 'Senior Gynecologist', area: 'MI Road', address: 'Near GPO, MI Road', phone: '+91-141-6789012', rating: 4.6, distance: '4.5 km', experience: 22, consultationFee: 600, services: ['High-Risk Pregnancy', 'Laparoscopy', 'Hysteroscopy'] },
    ],
    'jodhpur': [
      { id: '6', name: 'Dr. Meenakshi Rathore', specialty: 'Gynecologist', area: 'Ratanada', address: 'Near Ratanada Circle', phone: '+91-291-2345678', rating: 4.6, distance: '1.8 km', experience: 10, consultationFee: 400, services: ['General Gynecology', 'Prenatal Care'] },
      { id: '7', name: 'AIIMS Jodhpur - Gynecology', specialty: 'Government Hospital', area: 'Basni', address: 'Basni Phase II', phone: '+91-291-2740741', rating: 4.8, distance: '8.5 km', experience: 20, consultationFee: 100, services: ['All Gynecology Services', 'Emergency Care', 'Cancer Treatment'] },
      { id: '12', name: 'Dr. Kavita Sharma', specialty: 'Gynecologist & Obstetrician', area: 'Paota', address: 'Near Clock Tower, Paota', phone: '+91-291-3456789', rating: 4.5, distance: '3.2 km', experience: 12, consultationFee: 450, services: ['Normal Delivery', 'C-Section', 'Prenatal Care'] },
    ],
    'udaipur': [
      { id: '8', name: 'Dr. Sunita Agarwal', specialty: 'Gynecologist & Obstetrician', area: 'Hiran Magri', address: 'Sector 14, Hiran Magri', phone: '+91-294-2345678', rating: 4.7, distance: '2.2 km', experience: 16, consultationFee: 500, services: ['Prenatal Care', 'Infertility', 'PCOS'] },
      { id: '9', name: 'GBH American Hospital', specialty: 'Multi-specialty Hospital', area: 'Bedla', address: '101, Kothi Bari, Bedla', phone: '+91-294-2800800', rating: 4.8, distance: '4.0 km', experience: 22, consultationFee: 700, services: ['Advanced Surgery', 'IVF', 'Emergency Care'] },
      { id: '13', name: 'Dr. Priya Mathur', specialty: 'Gynecologist', area: 'Fatehpura', address: 'Near Lake Palace Road', phone: '+91-294-4567890', rating: 4.6, distance: '2.8 km', experience: 14, consultationFee: 450, services: ['General Gynecology', 'Family Planning', 'Menstrual Health'] },
    ],
    'delhi': [
      { id: '14', name: 'Dr. Neha Kapoor', specialty: 'Senior Gynecologist', area: 'Saket', address: 'Max Super Specialty Hospital, Saket', phone: '+91-11-26515050', rating: 4.9, distance: '5.0 km', experience: 20, consultationFee: 1000, services: ['High-Risk Pregnancy', 'Laparoscopic Surgery', 'IVF'] },
      { id: '15', name: 'AIIMS Delhi - Gynecology', specialty: 'Government Hospital', area: 'Ansari Nagar', address: 'Sri Aurobindo Marg, Ansari Nagar', phone: '+91-11-26588500', rating: 4.8, distance: '8.0 km', experience: 25, consultationFee: 50, services: ['All Gynecology Services', 'Research', 'Teaching'] },
      { id: '16', name: 'Dr. Ritu Singh', specialty: 'Gynecologist & Fertility Expert', area: 'Dwarka', address: 'Sector 12, Dwarka', phone: '+91-11-45678901', rating: 4.7, distance: '12.0 km', experience: 18, consultationFee: 800, services: ['IVF', 'IUI', 'Fertility Counseling'] },
    ],
    'mumbai': [
      { id: '17', name: 'Dr. Anjali Desai', specialty: 'Senior Gynecologist', area: 'Bandra', address: 'Lilavati Hospital, Bandra West', phone: '+91-22-26568000', rating: 4.9, distance: '4.5 km', experience: 22, consultationFee: 1200, services: ['High-Risk Pregnancy', 'Minimally Invasive Surgery', 'Oncology'] },
      { id: '18', name: 'Dr. Priya Mehta', specialty: 'Gynecologist & Obstetrician', area: 'Andheri', address: 'Kokilaben Hospital, Andheri West', phone: '+91-22-42696969', rating: 4.8, distance: '7.0 km', experience: 15, consultationFee: 1000, services: ['Prenatal Care', 'Delivery', 'PCOS Treatment'] },
    ],
    'bangalore': [
      { id: '19', name: 'Dr. Lakshmi Rao', specialty: 'Senior Gynecologist', area: 'Koramangala', address: 'Apollo Hospital, Koramangala', phone: '+91-80-26304050', rating: 4.8, distance: '3.5 km', experience: 20, consultationFee: 900, services: ['Advanced Gynecology', 'Robotic Surgery', 'Fertility'] },
      { id: '20', name: 'Dr. Deepa Krishnan', specialty: 'Gynecologist', area: 'Indiranagar', address: 'Manipal Hospital, Indiranagar', phone: '+91-80-25206555', rating: 4.7, distance: '5.0 km', experience: 14, consultationFee: 700, services: ['General Gynecology', 'Prenatal Care', 'Menopause'] },
    ],
  };

  const cityKey = city.toLowerCase();
  // Return matching city or default to Jaipur if city not found
  return doctors[cityKey] || doctors['jaipur'];
}
