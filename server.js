const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// -------------------------
// BASIC APP SETUP
// -------------------------
const app = express();
app.use(cors());
app.use(express.json());

// -------------------------
// CONNECT TO MONGODB ATLAS
// -------------------------
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ Mongo Error:', err));

// -------------------------
// SCHEMAS / MODELS
// -------------------------
const expenseSchema = new mongoose.Schema({
  day: String,        // "Day 1"
  category: String,   // "Fuel", "Food", etc.
  amount: Number,
  paidBy: String,
  note: String,
  createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', expenseSchema);

const checklistSchema = new mongoose.Schema({
  title: String,      // "Power bank"
  type: String,       // "packing" or "day"
  day: String,        // optional: "Day 3"
  isDone: { type: Boolean, default: false },
});

const ChecklistItem = mongoose.model('ChecklistItem', checklistSchema);

// -------------------------
// STATIC ITINERARY (SAMPLE)
// You can fill full 6 days later
// -------------------------
const itinerary = [
  {
    day: 'Day 1',
    title: 'Ponda / Betki / Savoi',
    items: [
      { time: '08:45–09:15', place: 'Breakfast at home (Priol)' },
      {
        time: '09:30–11:45',
        place: 'Keri Bridge, Vijayadurga Temple, Anant Temple',
      },
      {
        time: '11:45–13:15',
        place: 'Tirupati Balaji Temple, Mangeshi Temple',
      },
      { time: '13:15–14:00', place: 'Lunch at home' },
      {
        time: '16:00–17:15',
        place: 'Mahalaxmi Temple, Nageshi Temple',
      },
      {
        time: '17:15–18:30',
        place: 'Ganapati Temple, Katamgal Dada Temple',
      },
      {
        time: '18:30–20:00',
        place: 'Shantadurga Temple & Narasimha Temple (Veling–Mardol)',
      },
    ],
  },
  {
    day: 'Day 2',
    title: 'Aguada / Chapora / Mall / Panaji / Dona Paula',
    items: [
      { time: '07:45–08:15', place: 'Breakfast at home' },
      { time: '08:30–10:30', place: 'Aguada Fort (walk + photos)' },
      { time: '10:30–12:15', place: 'Chapora Fort (climb + views)' },
      { time: '12:30–14:15', place: 'Mall De Goa – lunch + roaming' },
      { time: '14:15–15:00', place: 'Bodgeshwar Temple (Mapusa)' },
      { time: '15:00–17:00', place: 'Old Goa & Panaji city drive' },
      { time: '17:00–18:45', place: 'Dona Paula Jetty – sunset, snacks' },
      { time: '18:45–19:45', place: 'Drive back home (Priol)' },
    ],
  },
  {
    day: 'Day 3',
    title: 'Verna / Vasco / Betalbatim / Cabo De Rama',
    items: [
      { time: '08:15–08:45', place: 'Breakfast at home' },
      { time: '09:00–10:00', place: 'Mahalsa Temple (Verna)' },
      { time: '10:00–11:00', place: 'Birla Temple (Vasco)' },
      { time: '11:15–13:30', place: 'Betalbatim Beach – chill & play' },
      { time: '13:30–14:40', place: 'Lunch at Orzo' },
      { time: '14:40–15:30', place: 'Drive to Cabo De Rama Fort' },
      { time: '15:30–16:30', place: 'Cabo De Rama Fort – viewpoints' },
      { time: '16:30–17:20', place: 'Pebble Beach (careful descent)' },
      { time: '17:20–18:20', place: 'Hidden Cave Beach (if energy okay)' },
      { time: '18:20–19:30', place: 'The Cape Goa Café – snacks & sunset' },
    ],
  },
  {
    day: 'Day 4',
    title: 'Tambdi Surla / Netravali / Spice Farm / Chandreshwar',
    items: [
      { time: '07:10–07:40', place: 'Breakfast at home' },
      { time: '08:00–09:00', place: 'Drive to Tambdi Surla Temple' },
      { time: '09:00–09:50', place: 'Tambdi Surla – temple & nature' },
      { time: '09:50–11:15', place: 'Drive to Netravali Sanctuary' },
      { time: '11:15–12:30', place: 'Netravali Wildlife Sanctuary' },
      { time: '12:30–14:15', place: 'Netravali Spice Farm – tour + lunch' },
      { time: '14:15–15:15', place: 'Drive to Chandreshwar Parvat' },
      { time: '15:15–16:15', place: 'Chandreshwar Temple – hilltop views' },
      { time: '16:15–17:15', place: 'Drive back home' },
    ],
  },
  {
    day: 'Day 5',
    title: 'Saptakoteshwar / Maem / Tilari (Maharashtra)',
    items: [
      { time: '08:15–08:45', place: 'Breakfast at home' },
      { time: '09:00–09:40', place: 'Drive to Saptakoteshwar Temple' },
      { time: '09:40–10:15', place: 'Saptakoteshwar Temple – darshan' },
      { time: '10:15–10:25', place: 'Drive to Maem Lake' },
      { time: '10:25–11:00', place: 'Maem Lake – chill & photos' },
      { time: '11:00–12:15', place: 'Drive to Ghotgewadi (uncle’s place)' },
      { time: '12:15–14:00', place: 'Lunch + rest at uncle’s house' },
      {
        time: '14:00–16:30',
        place: 'Tilari Dam, Medhe Lake, farm visit – roaming',
      },
      { time: '16:30–18:00', place: 'Drive back home (Priol)' },
    ],
  },
  {
    day: 'Day 6',
    title: 'Ankola / Karwar / Galgibag – Road Trip',
    items: [
      { time: '06:30–06:50', place: 'Light breakfast at home' },
      { time: '07:00–10:00', place: 'Drive to Aryadurga Temple, Ankola' },
      { time: '10:00–11:00', place: 'Aryadurga Mandir – darshan' },
      { time: '11:00–11:45', place: 'Drive to Rock Garden, Karwar' },
      { time: '11:45–12:30', place: 'Rock Garden – views & photos' },
      { time: '12:30–13:15', place: 'Lunch in Ankola / Karwar' },
      { time: '13:15–14:00', place: 'More time at seafront / Rock Garden' },
      { time: '14:00–15:00', place: 'Drive to Galgibag Beach (South Goa)' },
      { time: '15:00–17:00', place: 'Galgibag Beach – quiet chill time' },
      { time: '17:00–18:15', place: 'Drive back home (Priol)' },
    ],
  },
];


// -------------------------
// ROUTES
// -------------------------

// Itinerary (read-only)
app.get('/api/itinerary', (req, res) => {
  res.json(itinerary);
});

// Expenses
app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find().sort({ createdAt: -1 });
  res.json(expenses);
});

app.post('/api/expenses', async (req, res) => {
  try {
    const exp = await Expense.create(req.body);
    res.status(201).json(exp);
  } catch (err) {
    res.status(400).json({ error: 'Error creating expense' });
  }
});

// Checklist
app.get('/api/checklist', async (req, res) => {
  const items = await ChecklistItem.find().sort({ title: 1 });
  res.json(items);
});

app.post('/api/checklist', async (req, res) => {
  try {
    const item = await ChecklistItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Error creating item' });
  }
});

app.patch('/api/checklist/:id/toggle', async (req, res) => {
  try {
    const item = await ChecklistItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    item.isDone = !item.isDone;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Error updating item' });
  }
});
// DELETE a checklist item
app.delete('/api/checklist/:id', async (req, res) => {
  try {
    await ChecklistItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting item' });
  }
});


// -------------------------
// START SERVER
// -------------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
