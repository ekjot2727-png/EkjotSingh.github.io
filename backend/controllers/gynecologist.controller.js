// Gynecologist data is now hardcoded (no database needed)

// Sample Jaipur gynecologists data
const sampleGynecologists = [
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

// Get all gynecologists
export const getGynecologists = async (req, res) => {
  try {
    const { city = 'Jaipur', area, minRating } = req.query;
    
    let results = sampleGynecologists;
    
    // Filter by area if provided
    if (area) {
      results = results.filter(doc => 
        doc.area.toLowerCase().includes(area.toLowerCase())
      );
    }
    
    // Filter by minimum rating if provided
    if (minRating) {
      results = results.filter(doc => doc.rating >= parseFloat(minRating));
    }

    // Sort by rating descending
    results.sort((a, b) => b.rating - a.rating);
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gynecologists', message: error.message });
  }
};

// Get gynecologist by ID
export const getGynecologistById = async (req, res) => {
  try {
    const { id } = req.params;
    const gynecologist = sampleGynecologists.find(doc => doc._id === id);
    
    if (!gynecologist) {
      return res.status(404).json({ error: 'Gynecologist not found' });
    }
    
    res.json(gynecologist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gynecologist', message: error.message });
  }
};

// Search gynecologists by name or specialty
export const searchGynecologists = async (req, res) => {
  try {
    const { q, area, minRating } = req.query;
    
    let results = sampleGynecologists;
    
    // Search by query in name or specialty
    if (q) {
      results = results.filter(doc => 
        doc.name.toLowerCase().includes(q.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(q.toLowerCase()) ||
        doc.area.toLowerCase().includes(q.toLowerCase())
      );
    }
    
    // Filter by area if provided
    if (area) {
      results = results.filter(doc => 
        doc.area.toLowerCase().includes(area.toLowerCase())
      );
    }
    
    // Filter by minimum rating if provided
    if (minRating) {
      results = results.filter(doc => doc.rating >= parseFloat(minRating));
    }

    // Sort by rating descending
    results.sort((a, b) => b.rating - a.rating);
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search gynecologists', message: error.message });
  }
};
