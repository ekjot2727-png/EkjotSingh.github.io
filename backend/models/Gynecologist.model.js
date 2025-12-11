// Compatibility wrapper for legacy `Gynecologist.model.js`.
// The app uses a small in-memory list of gynecologists. Expose
// a minimal model interface so existing code doesn't crash.

const sampleGynecologists = [
  {
    id: '1',
    name: 'Dr. Anjali Sharma',
    specialty: 'Gynecologist & Obstetrician',
    area: 'Malviya Nagar',
    address: '123, Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur',
    city: 'Jaipur',
    phone: '+91-141-2345678',
    rating: 4.8,
    experience: 15,
    education: 'MBBS, MD (Obstetrics & Gynecology)',
    consultationFee: 800,
    availability: ['Mon-Sat: 10:00 AM - 6:00 PM'],
    services: ['Pregnancy Care', 'Gynecological Surgery', 'Infertility Treatment', 'PCOS Management']
  },
  {
    id: '2',
    name: 'Dr. Priya Meena',
    specialty: 'Gynecologist',
    area: 'C-Scheme',
    address: '45, C-Scheme, Near Ashok Marg, Jaipur',
    city: 'Jaipur',
    phone: '+91-141-3456789',
    rating: 4.7,
    experience: 12,
    education: 'MBBS, MS (Gynecology)',
    consultationFee: 700,
    availability: ['Mon-Fri: 9:00 AM - 5:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
    services: ['Menstrual Disorders', 'High-Risk Pregnancy', 'Menopause Management']
  },
  {
    id: '3',
    name: 'Dr. Kavita Rajput',
    specialty: 'Gynecologist & Laparoscopic Surgeon',
    area: 'Vaishali Nagar',
    address: '67, Vaishali Nagar, Near Durgapura, Jaipur',
    city: 'Jaipur',
    phone: '+91-141-4567890',
    rating: 4.9,
    experience: 18,
    education: 'MBBS, MD, DNB (Gynecology)',
    consultationFee: 1000,
    availability: ['Mon-Sat: 11:00 AM - 7:00 PM'],
    services: ['Laparoscopic Surgery', 'Endometriosis Treatment', 'Fertility Treatment', 'Contraception Counseling']
  }
];

const Gynecologist = {
  async find(query) {
    // Support simple queries by userId or area
    if (!query || Object.keys(query).length === 0) return sampleGynecologists;
    if (query.area) return sampleGynecologists.filter(g => g.area === query.area);
    return sampleGynecologists;
  },
  async findById(id) {
    return sampleGynecologists.find(g => g.id === String(id)) || null;
  },
  async insertMany(items) {
    // No-op in-memory insertion - simply return items
    return items;
  },
  async deleteMany() {
    // no-op
    return { deletedCount: 0 };
  }
};

export default Gynecologist;
