import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Function to fetch segments from Firestore
export const fetchSegments = async () => {
  try {
    const segmentsCollection = collection(db, "segments");
    const segmentsSnapshot = await getDocs(segmentsCollection);
    const segmentsList = segmentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return segmentsList;
  } catch (error) {
    console.error("Error fetching segments: ", error);
    return [];
  }
};
