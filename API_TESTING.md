# 🧪 Luna API Testing Guide

## Testing with cURL or Postman

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Luna Backend API is running",
  "timestamp": "2024-12-08T10:30:45.123Z"
}
```

---

## Profile API

### Get Profile
```bash
curl "http://localhost:5000/api/profile?userId=default-user"
```

### Create/Update Profile
```bash
curl -X POST http://localhost:5000/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "default-user",
    "name": "Sarah",
    "age": 25,
    "cycleLength": 28,
    "periodLength": 5,
    "lastPeriodDate": "2024-12-01"
  }'
```

---

## Period Log API

### Get All Logs
```bash
curl "http://localhost:5000/api/period-logs?userId=default-user"
```

### Create Period Log
```bash
curl -X POST http://localhost:5000/api/period-logs \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "default-user",
    "date": "2024-12-08",
    "flow": "medium",
    "pain": 3,
    "mood": "happy",
    "symptoms": ["cramps", "bloating"],
    "notes": "Normal period"
  }'
```

**Flow Options:** "spotting" | "light" | "medium" | "heavy"
**Pain Level:** 0-10

### Update Period Log
```bash
curl -X PUT "http://localhost:5000/api/period-logs/{LOG_ID}" \
  -H "Content-Type: application/json" \
  -d '{
    "flow": "heavy",
    "pain": 5,
    "notes": "Heavier than usual"
  }'
```

### Delete Period Log
```bash
curl -X DELETE "http://localhost:5000/api/period-logs/{LOG_ID}"
```

---

## Chat API

### Get Chat History
```bash
curl "http://localhost:5000/api/chat/history?userId=default-user"
```

### Send Message
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "default-user",
    "message": "Find me a gynecologist in Jaipur"
  }'
```

**Response for doctor query:**
```json
{
  "role": "assistant",
  "content": "gynecologist_search",
  "type": "gynecologist_search"
}
```

**Response for health question:**
```json
{
  "role": "assistant",
  "content": "A period (menstruation) is the monthly shedding..."
}
```

### Clear Chat History
```bash
curl -X DELETE "http://localhost:5000/api/chat/history?userId=default-user"
```

---

## Gynecologist API

### Get All Gynecologists
```bash
curl "http://localhost:5000/api/gynecologists?city=Jaipur"
```

### Filter by Rating
```bash
curl "http://localhost:5000/api/gynecologists?city=Jaipur&minRating=4.7"
```

### Filter by Area
```bash
curl "http://localhost:5000/api/gynecologists?city=Jaipur&area=Malviya%20Nagar"
```

### Search Gynecologists
```bash
curl "http://localhost:5000/api/gynecologists/search?q=Anjali"
```

### Get Single Gynecologist
```bash
curl "http://localhost:5000/api/gynecologists/{DOCTOR_ID}"
```

**Sample Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Dr. Anjali Sharma",
  "specialty": "Gynecologist & Obstetrician",
  "area": "Malviya Nagar",
  "address": "123, Jawahal Lal Nehru Marg, Malviya Nagar, Jaipur",
  "city": "Jaipur",
  "phone": "+91-141-2345678",
  "rating": 4.8,
  "experience": 15,
  "education": "MBBS, MD (Obstetrics & Gynecology)",
  "consultationFee": 800,
  "availability": ["Mon-Sat: 10:00 AM - 6:00 PM"],
  "services": [
    "Pregnancy Care",
    "Gynecological Surgery",
    "Infertility Treatment",
    "PCOS Management"
  ]
}
```

---

## Hygiene Reminder API

### Get All Reminders
```bash
curl "http://localhost:5000/api/hygiene?userId=default-user"
```

### Create Reminder
```bash
curl -X POST http://localhost:5000/api/hygiene \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "default-user",
    "title": "Change pad/tampon",
    "interval": 6,
    "enabled": true
  }'
```

### Update Reminder
```bash
curl -X PUT "http://localhost:5000/api/hygiene/{REMINDER_ID}" \
  -H "Content-Type: application/json" \
  -d '{
    "interval": 4,
    "enabled": true
  }'
```

### Delete Reminder
```bash
curl -X DELETE "http://localhost:5000/api/hygiene/{REMINDER_ID}"
```

---

## JavaScript/Fetch Examples

### Using the API Service in Frontend

```typescript
import { api } from '@/lib/api';

// Get profile
const profile = await api.getProfile('default-user');

// Update profile
await api.updateProfile({
  userId: 'default-user',
  name: 'Sarah',
  age: 25,
  cycleLength: 28,
  periodLength: 5,
  lastPeriodDate: '2024-12-01'
});

// Create period log
const log = await api.createPeriodLog({
  userId: 'default-user',
  date: '2024-12-08',
  flow: 'medium',
  pain: 3,
  mood: 'happy',
  symptoms: ['cramps'],
  notes: 'Normal period'
});

// Get gynecologists
const doctors = await api.getGynecologists({ city: 'Jaipur' });

// Search doctors
const results = await api.searchGynecologists('Anjali');

// Send chat message
const response = await api.sendMessage(
  'Find me a gynecologist',
  'default-user'
);

// Get chat history
const history = await api.getChatHistory('default-user');

// Create reminder
const reminder = await api.createReminder({
  userId: 'default-user',
  title: 'Change tampon',
  interval: 4,
  enabled: true
});
```

---

## Postman Collection Template

```json
{
  "info": {
    "name": "Luna API",
    "description": "Menstrual Health API"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/health"
      }
    },
    {
      "name": "Get Profile",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/profile?userId=default-user"
      }
    },
    {
      "name": "Get Gynecologists",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/gynecologists"
      }
    }
  ]
}
```

---

## Error Response Examples

### Missing Required Field
```json
{
  "error": "Validation failed",
  "message": "Name is required"
}
```

### Not Found
```json
{
  "error": "Period log not found"
}
```

### Server Error
```json
{
  "error": "Something went wrong!",
  "message": "MongoDB connection error"
}
```

---

## Rate Limiting (Future Enhancement)

Currently no rate limiting. Add rate limiting in production using express-rate-limit:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## Testing Tips

1. **Use Postman** for comprehensive API testing
2. **Check response status codes**
   - 200: Success
   - 201: Created
   - 400: Bad Request
   - 404: Not Found
   - 500: Server Error

3. **Validate data before sending**
4. **Include userId in queries** for personalized data
5. **Check MongoDB** to verify data persistence

---

## Debugging

### Check Backend Logs
Monitor terminal where you started `npm run dev`:
- Look for request logs
- Check error messages
- Verify database connections

### Browser Developer Tools
1. Open F12 (Developer Tools)
2. Go to Network tab
3. Click on request to see:
   - Request method & URL
   - Request/Response headers
   - Request/Response body
   - Status code

### Database Verification
```bash
mongosh
use luna-health
db.profiles.find()
db.periodlogs.find()
db.gynecologists.find()
db.chatmessages.find()
```

---

## API Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Performance Tips

- Use `city` filter for gynecologist searches
- Implement pagination for large datasets
- Cache frequently used data
- Use database indexes (already set up)
- Monitor MongoDB query performance

---

Happy Testing! 🎉
