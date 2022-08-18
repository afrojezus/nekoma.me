import { collection, CollectionReference, DocumentData, Firestore } from "firebase/firestore";

export const createCollection = <T = DocumentData>(firestore: Firestore, collectionName: string) => collection(firestore, collectionName) as CollectionReference<T>;