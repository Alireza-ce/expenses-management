import * as firebase from "firebase/app";
import { addDoc, collection, getDoc, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { BudgetRecord } from "./firebase.model";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

//db config and function
const db = getFirestore();

export const budgetRef = collection(db, "budgets");

export const getBudgetList = getDocs(budgetRef);

export const addBudget = (budgetRecord: BudgetRecord) => {
  return addDoc(budgetRef, budgetRecord);
};

export const auth = getAuth(app);
export default app;
