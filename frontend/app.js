// 🔗 BACKEND URL
const BASE_URL = 'https://goa-trip-backend.onrender.com'; 

// ---------- TAB SWITCHING ----------
const tabs = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('.tab');

tabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    tabs.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    sections.forEach((sec) => {
      sec.classList.toggle('active', sec.id === tab);
    });
  });
});

// ---------- ITINERARY ----------
async function loadItinerary() {
  try {
    const res = await fetch(`${BASE_URL}/api/itinerary`);
    const data = await res.json();

    const container = document.getElementById('itinerary-container');
    container.innerHTML = '';

    data.forEach((day) => {
      const div = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = `${day.day} – ${day.title}`;
      div.appendChild(title);

      day.items.forEach((item) => {
        const p = document.createElement('p');
        p.innerHTML = `<span class="badge">${item.time}</span> ${item.place}`;
        div.appendChild(p);
      });

      container.appendChild(div);
    });
  } catch (err) {
    console.error('Itinerary error', err);
  }
}

// ---------- EXPENSES ----------
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const expenseSummary = document.getElementById('expense-summary');

expenseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(expenseForm);
  const payload = {
    day: formData.get('day'),
    category: formData.get('category'),
    amount: Number(formData.get('amount')),
    paidBy: formData.get('paidBy'),
    note: formData.get('note'),
  };

  try {
    await fetch(`${BASE_URL}/api/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    expenseForm.reset();
    loadExpenses();
  } catch (err) {
    console.error('Expense add error', err);
  }
});

async function loadExpenses() {
  try {
    const res = await fetch(`${BASE_URL}/api/expenses`);
    const data = await res.json();

    expenseList.innerHTML = '';
    let total = 0;

    data.forEach((exp) => {
      total += exp.amount;
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <div><strong>${exp.day}</strong> – ₹${exp.amount} (${exp.category})</div>
          <div class="small">Paid by ${exp.paidBy}${exp.note ? ' – ' + exp.note : ''}</div>
        </div>
      `;
      expenseList.appendChild(li);
    });

    const perHead = data.length ? Math.round(total / 6) : 0;
    expenseSummary.textContent = `Total: ₹${total} | Per head (approx): ₹${perHead}`;
  } catch (err) {
    console.error('Expense load error', err);
  }
}

// ---------- CHECKLIST ----------
const checklistForm = document.getElementById('checklist-form');
const checklistList = document.getElementById('checklist-list');

checklistForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(checklistForm);
  const payload = {
    title: formData.get('title'),
    type: formData.get('type'),
    day: formData.get('day') || '',
  };

  try {
    await fetch(`${BASE_URL}/api/checklist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    checklistForm.reset();
    loadChecklist();
  } catch (err) {
    console.error('Checklist add error', err);
  }
});

async function toggleChecklist(id) {
  try {
    await fetch(`${BASE_URL}/api/checklist/${id}/toggle`, {
      method: 'PATCH',
    });
    loadChecklist();
  } catch (err) {
    console.error('Checklist toggle error', err);
  }
}

async function loadChecklist() {
  try {
    const res = await fetch(`${BASE_URL}/api/checklist`);
    const data = await res.json();

    checklistList.innerHTML = '';

    data.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>
          <input type="checkbox" ${item.isDone ? 'checked' : ''} onclick="toggleChecklist('${item._id}')">
          ${item.title}${item.day ? ' (' + item.day + ')' : ''}
        </span>
        <span class="tag">${item.type}</span>
      `;
      checklistList.appendChild(li);
    });
  } catch (err) {
    console.error('Checklist load error', err);
  }
}

// expose to window so inline onclick works
window.toggleChecklist = toggleChecklist;

// ---------- INITIAL LOAD ----------
loadItinerary();
loadExpenses();
loadChecklist();
