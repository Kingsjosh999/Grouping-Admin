import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG - REPLACE WITH YOUR REAL DATA */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/* INIT FIREBASE */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* DASHBOARD CONTAINER */
const dashboard = document.getElementById("dashboard");

/* LOAD DATA FROM FIRESTORE */
async function loadData() {
  try {
    const snapshot = await getDocs(collection(db, "students"));

    console.log("Total students:", snapshot.size);

    if (snapshot.empty) {
      dashboard.innerHTML = "<p>No data found in Firestore.</p>";
      return;
    }

    let groups = {};

    snapshot.forEach(doc => {
      let data = doc.data();

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

/* RENDER UI */
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

/* RUN */
loadData();