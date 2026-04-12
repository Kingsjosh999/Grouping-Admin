import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/* Firebase Config */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dashboard = document.getElementById("dashboard");

async function loadData() {
  const snapshot = await getDocs(collection(db, "students"));

  let groups = {};

  snapshot.forEach(doc => {
    let data = doc.data();

    if (!groups[data.group]) {
      groups[data.group] = [];
    }

    groups[data.group].push(data);
  });

  render(groups);
}

function render(groups) {
  dashboard.innerHTML = "";

  for (let group in groups) {
    let students = groups[group];

    let section = document.createElement("div");

    section.innerHTML = `
      <h2>${group}</h2>
      <ul>
        ${students.map(s => `
          <li>• ${s.name}, ${s.phone}, ${s.matric}</li>
        `).join("")}
      </ul>
    `;

    dashboard.appendChild(section);
  }
}

loadData();