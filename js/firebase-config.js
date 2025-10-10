// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQP9AAZHgXR_5Wx_WLwFvNpjLfQWmBVcg",
  authDomain: "chemlox-contact.firebaseapp.com",
  projectId: "chemlox-contact",
  storageBucket: "chemlox-contact.appspot.com",
  messagingSenderId: "1098979571494",
  appId: "1:1098979571494:web:b9b5c1e8b5d8b5b5b5b5b5"
};

// Initialize Firebase only if not already initialized
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get Firestore instance - using var to avoid redeclaration issues
var db = typeof firebase !== 'undefined' ? firebase.firestore() : null;

// Function to save contact form data to Firestore
function saveContactForm(formData) {
  // Check if Firebase and db are properly initialized
  if (!db) {
    console.error("Firebase Firestore is not initialized");
    return Promise.resolve({ success: false, error: "Database connection error" });
  }
  
  return db.collection("contactSubmissions").add({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    subject: formData.subject,
    message: formData.message,
    timestamp: new Date() // Using regular Date instead of serverTimestamp
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    return { success: false, error: error.message };
  });
}

// Function to get all contact form submissions
function getContactSubmissions() {
  // Check if Firebase and db are properly initialized
  if (!db) {
    console.error("Firebase Firestore is not initialized");
    return Promise.resolve([]);
  }
  
  return db.collection("contactSubmissions")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      const submissions = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Handle timestamp safely
        const timestamp = data.timestamp instanceof Date ? 
          data.timestamp : 
          (data.timestamp && typeof data.timestamp.toDate === 'function' ? 
            data.timestamp.toDate() : 
            new Date());
            
        submissions.push({
          id: doc.id,
          ...data,
          timestamp: timestamp
        });
      });
      return submissions;
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
      return [];
    });
}