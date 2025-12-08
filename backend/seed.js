import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gynecologist from './models/Gynecologist.model.js';

dotenv.config();

const gynecologists = [
  {
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

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Gynecologist.deleteMany({});
    console.log('🗑️  Cleared existing gynecologists');

    // Insert new data
    await Gynecologist.insertMany(gynecologists);
    console.log(`✅ Inserted ${gynecologists.length} gynecologists`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
