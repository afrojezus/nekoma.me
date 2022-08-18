import { Timestamp } from "firebase/firestore";

export interface LinkObject {
    link: string;
    date: Timestamp;
    expiresAt?: Timestamp;
}

export default LinkObject;