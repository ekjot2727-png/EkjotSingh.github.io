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
    keywords: ['what is period', 'what is menstruation', 'explain period', 'periods mean'],
    response: "A period (menstruation) is the monthly shedding of the uterine lining. It typically lasts 3-7 days and occurs every 21-35 days. It's a completely natural part of reproductive health that begins during puberty.",
    category: 'basics',
  },
  {
    keywords: ['normal cycle', 'cycle length', 'how long cycle'],
    response: "A normal menstrual cycle ranges from 21 to 35 days, with 28 days being the average. Your cycle length is counted from the first day of one period to the first day of the next. Some variation is completely normal!",
    category: 'cycle',
  },
  {
    keywords: ['first period', 'menarche', 'when start'],
    response: "Most people get their first period (menarche) between ages 10-15, with 12 being the average age. It's normal for early periods to be irregular for the first 1-2 years as your body adjusts.",
    category: 'basics',
  },

  // Symptoms & Pain
  {
    keywords: ['cramps', 'period pain', 'painful period', 'dysmenorrhea'],
    response: "Period cramps are caused by uterine contractions and are very common. Try: heating pads, gentle exercise, staying hydrated, and over-the-counter pain relievers. If pain is severe and affects daily life, please consult a doctor.",
    category: 'symptoms',
  },
  {
    keywords: ['heavy bleeding', 'heavy flow', 'too much blood', 'menorrhagia'],
    response: "Heavy bleeding may include: soaking through pads/tampons hourly, periods lasting over 7 days, or passing large clots. If you experience this regularly, please consult a gynecologist—it could indicate conditions like fibroids or hormonal imbalances.",
    category: 'symptoms',
    severity: 'warning',
  },
  {
    keywords: ['pms', 'premenstrual', 'mood swings', 'irritability before period'],
    response: "PMS symptoms (bloating, mood changes, breast tenderness, fatigue) are caused by hormonal fluctuations. They typically occur 1-2 weeks before your period. Regular exercise, reducing salt and caffeine, and adequate sleep can help manage symptoms.",
    category: 'symptoms',
  },
  {
    keywords: ['headache', 'migraine', 'head pain period'],
    response: "Menstrual migraines are linked to hormone changes, especially dropping estrogen levels. Keep a symptom diary, stay hydrated, maintain regular sleep, and consider magnesium supplements. Consult a doctor if headaches are severe.",
    category: 'symptoms',
  },
  {
    keywords: ['bloating', 'water retention', 'feel puffy'],
    response: "Bloating before and during periods is caused by hormonal water retention. Reduce salt intake, eat potassium-rich foods (bananas, leafy greens), drink plenty of water, and try light exercise. It typically resolves after your period ends.",
    category: 'symptoms',
  },

  // Discharge
  {
    keywords: ['discharge', 'vaginal discharge', 'normal discharge'],
    response: "Vaginal discharge is normal and changes throughout your cycle. Clear/white discharge is healthy. Concerning signs include: unusual colors (green, gray), strong odor, itching, or burning. These may indicate infections—consult a doctor.",
    category: 'hygiene',
  },
  {
    keywords: ['white discharge', 'milky discharge'],
    response: "White, milky discharge is typically normal, especially before ovulation or your period. If it's thick like cottage cheese with itching, it may be a yeast infection. No smell is usually a good sign!",
    category: 'hygiene',
  },
  {
    keywords: ['brown discharge', 'dark discharge', 'old blood'],
    response: "Brown discharge is usually old blood and is normal at the beginning or end of your period. It can also occur during ovulation. If it persists outside your cycle or smells unusual, consult a doctor.",
    category: 'hygiene',
  },
  {
    keywords: ['smell', 'odor', 'fishy smell', 'bad smell'],
    response: "A mild, musky odor is normal. However, a strong fishy or foul smell may indicate bacterial vaginosis or other infections. Please consult a healthcare provider if you notice unusual odors, especially with discharge changes.",
    category: 'hygiene',
    severity: 'warning',
  },

  // Hygiene
  {
    keywords: ['how to clean', 'washing', 'hygiene', 'keep clean'],
    response: "Clean the vulva (external area) with warm water only—the vagina is self-cleaning! Avoid douching, scented products, and harsh soaps which can disrupt your natural pH. Change pads/tampons every 4-6 hours.",
    category: 'hygiene',
  },
  {
    keywords: ['pad', 'tampon', 'cup', 'products', 'what to use'],
    response: "Choose what's comfortable for you! Pads: external, easy to use. Tampons: internal, great for sports/swimming. Menstrual cups: reusable, eco-friendly, can wear up to 12 hours. Period underwear: comfortable backup option.",
    category: 'products',
  },
  {
    keywords: ['change pad', 'how often change', 'tampon time'],
    response: "Change pads every 4-6 hours, tampons every 4-8 hours (never exceed 8 hours due to TSS risk). Menstrual cups can be worn up to 12 hours. Change more frequently on heavy days.",
    category: 'hygiene',
  },
  {
    keywords: ['toxic shock', 'tss', 'tampon danger'],
    response: "Toxic Shock Syndrome (TSS) is rare but serious. Prevent it by: changing tampons every 4-8 hours, using the lowest absorbency needed, alternating with pads overnight. Seek immediate care if you have sudden fever, rash, or dizziness while using tampons.",
    category: 'hygiene',
    severity: 'urgent',
  },

  // PCOS & Conditions
  {
    keywords: ['pcos', 'polycystic', 'irregular periods pcos'],
    response: "PCOS (Polycystic Ovary Syndrome) affects hormone levels and may cause irregular periods, excess hair growth, acne, and weight changes. It's manageable with lifestyle changes and medication. Please consult a gynecologist for proper diagnosis and treatment.",
    category: 'conditions',
    severity: 'warning',
  },
  {
    keywords: ['endometriosis', 'endo', 'painful periods extreme'],
    response: "Endometriosis causes uterine-like tissue to grow outside the uterus, leading to severe pain, heavy periods, and sometimes fertility issues. If you experience debilitating pain that affects daily life, please see a gynecologist for evaluation.",
    category: 'conditions',
    severity: 'warning',
  },
  {
    keywords: ['fibroids', 'uterine fibroids', 'growths'],
    response: "Fibroids are non-cancerous growths in the uterus that may cause heavy bleeding, pelvic pressure, or frequent urination. Many people have them without symptoms. Treatment options range from monitoring to medication or surgery. Consult a doctor for evaluation.",
    category: 'conditions',
  },

  // Fertility
  {
    keywords: ['fertility', 'fertile', 'ovulation', 'get pregnant', 'conception'],
    response: "Ovulation typically occurs about 14 days before your next period. Your fertile window is approximately 5 days before ovulation and 1 day after. Track your cycle, check cervical mucus (egg-white consistency = fertile), or use ovulation test strips.",
    category: 'fertility',
  },
  {
    keywords: ['late period', 'missed period', 'period not coming'],
    response: "Missed periods can be due to: pregnancy, stress, weight changes, excessive exercise, hormonal imbalances, or conditions like PCOS. If sexually active, take a pregnancy test. If periods are consistently irregular or absent, consult a doctor.",
    category: 'cycle',
  },

  // Diet & Lifestyle
  {
    keywords: ['diet', 'food', 'what to eat', 'nutrition period'],
    response: "During your period, focus on: iron-rich foods (spinach, lentils, red meat), anti-inflammatory foods (fatty fish, berries), magnesium (dark chocolate, nuts), and stay hydrated. Reduce caffeine, alcohol, and salty foods to minimize bloating and cramps.",
    category: 'lifestyle',
  },
  {
    keywords: ['exercise', 'workout', 'can i exercise'],
    response: "Yes, exercise during periods is beneficial! Light activities like yoga, walking, or swimming can reduce cramps and boost mood. Listen to your body—rest if needed, but movement often helps. Avoid intense training if you're exhausted.",
    category: 'lifestyle',
  },
  {
    keywords: ['sleep', 'insomnia', 'can\'t sleep'],
    response: "Hormonal changes can affect sleep quality before and during periods. Try: maintaining a regular sleep schedule, avoiding screens before bed, keeping your room cool, and relaxation techniques. Magnesium supplements may also help.",
    category: 'lifestyle',
  },

  // Myths
  {
    keywords: ['myth', 'true or false', 'is it true'],
    response: "Common period myths debunked: ✓ You CAN exercise during periods ✓ You CAN shower/bathe ✓ You CAN touch plants/cook ✓ Periods are NOT dirty ✓ You CAN swim with a tampon/cup ✓ Cycle syncing with friends isn't scientifically proven",
    category: 'myths',
  },

  // Emergency / Red Flags
  {
    keywords: ['emergency', 'urgent', 'call doctor', 'serious', 'worried'],
    response: "Seek immediate medical attention if you experience: soaking through a pad/tampon every hour, periods lasting more than 7 days, severe pain not relieved by medication, fever with tampon use, fainting, or unusually large blood clots. Your health matters!",
    category: 'emergency',
    severity: 'urgent',
  },
  {
    keywords: ['doctor', 'gynecologist', 'when see doctor', 'consult'],
    response: "See a gynecologist if you have: irregular or absent periods, extremely heavy or painful periods, unusual discharge or odor, pelvic pain outside periods, or if you're sexually active and due for a checkup. Regular gynecological visits are recommended annually.",
    category: 'care',
  },

  // Default/Fallback
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    response: "Hello! 💕 I'm Luna, your menstrual health assistant. I can help answer questions about periods, hygiene, symptoms, and reproductive health. What would you like to know about today?",
    category: 'greeting',
  },
  {
    keywords: ['thank', 'thanks', 'helpful', 'appreciate'],
    response: "You're welcome! 💕 Remember, I'm here to provide general information. For personal medical advice, always consult a healthcare professional. Take care of yourself!",
    category: 'closing',
  },
  {
    keywords: ['find doctor', 'nearby doctor', 'gynecologist near', 'doctor search'],
    response: "I can help you find nearby gynecologists! Please share your location or city, and I'll show you available healthcare providers in your area. You can also check the 'Find a Doctor' feature in the app.",
    category: 'care',
  },
];

/**
 * Finds the best matching response from the knowledge base
 */
export function findBestResponse(query: string): KnowledgeEntry | null {
  const lowerQuery = query.toLowerCase().trim();
  
  // Find entries with matching keywords
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        // Longer keyword matches are weighted higher
        score += keyword.length;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch;
}

/**
 * Gets a fallback response when no match is found
 */
export function getFallbackResponse(): string {
  return "I'm not sure I understand your question fully. I can help with topics like:\n\n• Period basics and cycle tracking\n• Symptoms like cramps and PMS\n• Hygiene and product recommendations\n• When to see a doctor\n• Myths vs. facts\n\nCould you try rephrasing your question?";
}

/**
 * Sample doctors data for demo purposes
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
  }>> = {
    'jaipur': [
      { id: '1', name: 'Dr. Shikha Gupta', specialty: 'Gynecologist & Obstetrician', area: 'Vaishali Nagar', address: 'Opp. Amrapali Circle, Vaishali Nagar', phone: '+91-141-XXXXXXX', rating: 4.8, distance: '2.5 km' },
      { id: '2', name: 'Dr. Poonam Khandelwal', specialty: 'Gynecologist', area: 'Raja Park', address: 'Near Panchwati Circle, Raja Park', phone: '+91-141-XXXXXXX', rating: 4.6, distance: '3.1 km' },
      { id: '3', name: 'Apex Hospital - Gynecology', specialty: 'Multi-specialty Hospital', area: 'Malviya Nagar', address: 'Calgiri Road, Malviya Nagar', phone: '+91-7414009900', rating: 4.7, distance: '4.2 km' },
      { id: '4', name: 'Dr. Rekha Sharma', specialty: 'Gynecologist & Fertility Specialist', area: 'Mansarovar', address: 'Sector 5, Mansarovar', phone: '+91-141-XXXXXXX', rating: 4.5, distance: '5.0 km' },
      { id: '5', name: 'Fortis Escorts Hospital', specialty: 'Multi-specialty Hospital', area: 'JLN Marg', address: 'Jawaharlal Nehru Marg', phone: '+91-141-2547000', rating: 4.9, distance: '6.3 km' },
    ],
    'jodhpur': [
      { id: '6', name: 'Dr. Meenakshi Rathore', specialty: 'Gynecologist', area: 'Ratanada', address: 'Near Ratanada Circle', phone: '+91-291-XXXXXXX', rating: 4.6, distance: '1.8 km' },
      { id: '7', name: 'AIIMS Jodhpur - Gynecology', specialty: 'Government Hospital', area: 'Basni', address: 'Basni Phase II', phone: '+91-291-2740741', rating: 4.8, distance: '8.5 km' },
    ],
    'udaipur': [
      { id: '8', name: 'Dr. Sunita Agarwal', specialty: 'Gynecologist & Obstetrician', area: 'Hiran Magri', address: 'Sector 14, Hiran Magri', phone: '+91-294-XXXXXXX', rating: 4.7, distance: '2.2 km' },
      { id: '9', name: 'GBH American Hospital', specialty: 'Multi-specialty Hospital', area: 'Bedla', address: '101, Kothi Bari, Bedla', phone: '+91-294-2800800', rating: 4.8, distance: '4.0 km' },
    ],
  };

  const cityKey = city.toLowerCase();
  return doctors[cityKey] || doctors['jaipur'];
}
