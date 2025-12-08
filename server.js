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
      { time: '08:45–09:15', place: 'Breakfast at home' },
      {
        time: '09:30–13:15',
        place: 'Keri Bridge, Vijayadurga, Anant, Balaji, Mangeshi',
      },
      { time: '13:15–14:00', place: 'Lunch at home' },
      {
        time: '16:00–20:00',
        place:
          'Mahalaxmi, Nageshi, Ganapati, Katamgal Dada, Shantadurga, Narasimha',
      },
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

// -------------------------
// START SERVER
// -------------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
