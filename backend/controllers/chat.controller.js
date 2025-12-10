import * as ChatMessageModel from '../models/supabase/ChatMessage.js';

// Jaipur Gynecologists Database
const jaipurGynecologists = [
  {
    _id: '1',
    name: "Dr. Anjali Sharma",
    specialty: "Gynecologist & Obstetrician",
    area: "Malviya Nagar",
    address: "123, Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur",
    city: "Jaipur",
    phone: "+91-141-2345678",
    rating: 4.8,
    experience: 15,
    education: "MBBS, MD (Obstetrics & Gynecology)",
    consultationFee: 800,
    availability: ["Mon-Sat: 10:00 AM - 6:00 PM"],
    services: ["Pregnancy Care", "Gynecological Surgery", "Infertility Treatment", "PCOS Management"]
  },
  {
    _id: '2',
    name: "Dr. Priya Meena",
    specialty: "Gynecologist",
    area: "C-Scheme",
    address: "45, C-Scheme, Near Ashok Marg, Jaipur",
    city: "Jaipur",
    phone: "+91-141-3456789",
    rating: 4.7,
    experience: 12,
    education: "MBBS, MS (Gynecology)",
    consultationFee: 700,
    availability: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 2:00 PM"],
    services: ["Menstrual Disorders", "High-Risk Pregnancy", "Menopause Management"]
  },
  {
    _id: '3',
    name: "Dr. Kavita Rajput",
    specialty: "Gynecologist & Laparoscopic Surgeon",
    area: "Vaishali Nagar",
    address: "67, Vaishali Nagar, Near Durgapura, Jaipur",
    city: "Jaipur",
    phone: "+91-141-4567890",
    rating: 4.9,
    experience: 18,
    education: "MBBS, MD, DNB (Gynecology)",
    consultationFee: 1000,
    availability: ["Mon-Sat: 11:00 AM - 7:00 PM"],
    services: ["Laparoscopic Surgery", "Endometriosis Treatment", "Fertility Treatment", "Contraception Counseling"]
  },
  {
    _id: '4',
    name: "Dr. Sunita Agarwal",
    specialty: "Gynecologist",
    area: "Mansarovar",
    address: "89, Mansarovar, Sector 5, Jaipur",
    city: "Jaipur",
    phone: "+91-141-5678901",
    rating: 4.6,
    experience: 10,
    education: "MBBS, DGO",
    consultationFee: 600,
    availability: ["Mon-Sat: 10:00 AM - 4:00 PM"],
    services: ["Antenatal Care", "Normal Delivery", "Cesarean Section", "PCOS Treatment"]
  },
  {
    _id: '5',
    name: "Dr. Rekha Jain",
    specialty: "Gynecologist & Infertility Specialist",
    area: "Raja Park",
    address: "12, Raja Park, Station Road, Jaipur",
    city: "Jaipur",
    phone: "+91-141-6789012",
    rating: 4.8,
    experience: 20,
    education: "MBBS, MD (OB/GYN), Fellowship in Reproductive Medicine",
    consultationFee: 1200,
    availability: ["Mon-Fri: 2:00 PM - 8:00 PM", "Sat: 10:00 AM - 2:00 PM"],
    services: ["IVF Treatment", "IUI", "Fertility Counseling", "Hormonal Disorders"]
  },
  {
    _id: '6',
    name: "Dr. Meera Choudhary",
    specialty: "Gynecologist",
    area: "Jagatpura",
    address: "34, Jagatpura Road, Near Chambal Garden, Jaipur",
    city: "Jaipur",
    phone: "+91-141-7890123",
    rating: 4.5,
    experience: 8,
    education: "MBBS, MD (Gynecology)",
    consultationFee: 500,
    availability: ["Mon-Sat: 9:00 AM - 1:00 PM", "Evening: 5:00 PM - 8:00 PM"],
    services: ["Routine Gynecology", "Pregnancy Care", "Vaccination", "Health Check-ups"]
  },
  {
    _id: '7',
    name: "Dr. Nisha Verma",
    specialty: "Gynecologist & Obstetrician",
    area: "Sindhi Camp",
    address: "78, Station Road, Sindhi Camp, Jaipur",
    city: "Jaipur",
    phone: "+91-141-8901234",
    rating: 4.7,
    experience: 14,
    education: "MBBS, MS (OB/GYN)",
    consultationFee: 750,
    availability: ["Mon-Sat: 10:00 AM - 6:00 PM"],
    services: ["High-Risk Pregnancy", "Cesarean Section", "Fibroids Treatment", "Ovarian Cysts"]
  },
  {
    _id: '8',
    name: "Dr. Deepa Sharma",
    specialty: "Gynecologist",
    area: "Bani Park",
    address: "56, Bani Park, MI Road, Jaipur",
    city: "Jaipur",
    phone: "+91-141-9012345",
    rating: 4.6,
    experience: 11,
    education: "MBBS, DGO, DNB",
    consultationFee: 650,
    availability: ["Mon-Fri: 11:00 AM - 6:00 PM"],
    services: ["Menstrual Problems", "Contraception", "STD Screening", "Cancer Screening"]
  }
];

// Chatbot knowledge base
const knowledgeBase = [
  {
    keywords: ['what is period', 'what is menstruation', 'explain period', 'periods mean'],
    response: "A period (menstruation) is the monthly shedding of the uterine lining. It typically lasts 3-7 days and occurs every 21-35 days. It's a completely natural part of reproductive health that begins during puberty.",
    category: 'basics',
  },
  {
    keywords: ['cramps', 'period pain', 'painful period', 'dysmenorrhea'],
    response: "Period cramps are caused by uterine contractions and are very common. Try: heating pads, gentle exercise, staying hydrated, and over-the-counter pain relievers. If pain is severe and affects daily life, please consult a doctor.",
    category: 'symptoms',
  },
  {
    keywords: ['heavy bleeding', 'heavy flow', 'too much blood', 'menorrhagia'],
    response: "Heavy bleeding may include: soaking through pads/tampons hourly, periods lasting over 7 days, or passing large clots. If you experience this regularly, please consult a gynecologist—it could indicate conditions like fibroids or hormonal imbalances.",
    category: 'symptoms',
  },
  {
    keywords: ['doctor', 'gynecologist', 'gynaecologist', 'find doctor', 'specialist', 'near me'],
    response: "gynecologist_search",
    category: 'doctor',
  }
];

function findBestResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  for (const entry of knowledgeBase) {
    for (const keyword of entry.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
}

// Get chat history
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const messages = await ChatMessageModel.getChatHistory(userId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history', message: error.message });
  }
};

// Send a message and get response
export const sendMessage = async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    const userMessage = req.body.message;

    // Save user message asynchronously (don't wait for it)
    ChatMessageModel.createChatMessage({
      user_id: userId,
      role: 'user',
      content: userMessage
    }).catch(err => console.warn('Could not save user message:', err.message));

    // Check if asking for gynecologist
    if (userMessage.toLowerCase().includes('doctor') || 
        userMessage.toLowerCase().includes('gynecologist') ||
        userMessage.toLowerCase().includes('gynaecologist') ||
        userMessage.toLowerCase().includes('find')) {
      
      // Return gynecologist search response with doctors data
      const response = {
        role: 'assistant',
        content: `I found ${jaipurGynecologists.length} top-rated gynecologists in Jaipur for you! Here are the best options sorted by rating:`,
        type: 'gynecologist_search',
        doctors: jaipurGynecologists.sort((a, b) => b.rating - a.rating).slice(0, 5)
      };

      // Save response asynchronously (don't wait for it)
      ChatMessageModel.createChatMessage({
        user_id: userId,
        role: 'assistant',
        content: 'Searching for gynecologists in Jaipur...'
      }).catch(err => console.warn('Could not save assistant message:', err.message));

      return res.json(response);
    }

    // Find matching response
    const match = findBestResponse(userMessage);
    const responseContent = match 
      ? match.response 
      : "I understand you have a question. While I can provide general information about menstrual health, for specific medical concerns, I recommend consulting with a healthcare provider. You can ask me about periods, symptoms, hygiene, or finding a gynecologist!";

    // Save response asynchronously (don't wait for it)
    ChatMessageModel.createChatMessage({
      user_id: userId,
      role: 'assistant',
      content: responseContent
    }).catch(err => console.warn('Could not save assistant message:', err.message));

    res.json({
      role: 'assistant',
      content: responseContent
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process message', message: error.message });
  }
};

// Clear chat history
export const clearChatHistory = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    await ChatMessageModel.deleteChatHistory(userId);
    res.json({ message: 'Chat history cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear chat history', message: error.message });
  }
};
