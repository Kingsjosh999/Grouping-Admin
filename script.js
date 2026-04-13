import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/* 🔥 YOUR REAL FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyDuBek8rT7rH0o0SkyMLjkYJ6XftcIgcgc",
  authDomain: "grouping-system-2d529.firebaseapp.com",
  projectId: "grouping-system-2d529",
  storageBucket: "grouping-system-2d529.firebasestorage.app",
  messagingSenderId: "317853326834",
  appId: "1:317853326834:web:71d64991425b5c9c539f6b"
};

/* 🚀 INIT FIREBASE */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* 🎯 DASHBOARD ELEMENT */
const dashboard = document.getElementById("dashboard");

/* 📥 LOAD DATA */
async function loadData() {
  try {
    console.log("Connecting to Firebase...");

    const snapshot = await getDocs(collection(db, "students"));

    console.log("Total students:", snapshot.size);

    if (snapshot.empty) {
      dashboard.innerHTML = "<p>No data found in Firestore.</p>";
      return;
    }

    let groups = {};

    snapshot.forEach(doc => {
      const data = doc.data();

      if (!groups[data.group]) {
        groups[data.group] = [];
      }

      groups[data.group].push(data);
    });

    render(groups);

  } catch (error) {
    console.error("Error loading data:", error);
    dashboard.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}

/* 🖥️ RENDER UI */
function render(groups) {
  dashboard.innerHTML = "";

  Object.keys(groups).forEach(groupName => {
    const students = groups[groupName];

    const section = document.createElement("div");

    section.innerHTML = `
      <h2>${groupName} (${students.length}/30)</h2>
      <ul>
        ${students.map(s => `
          <li>
            ${s.name} | ${s.phone} | ${s.matric}
          </li>
        `).join("")}
      </ul>
    `;

    dashboard.appendChild(section);
  });
}

/* ▶️ RUN */
loadData();