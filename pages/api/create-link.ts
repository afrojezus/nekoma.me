import { customAlphabet } from "nanoid";
import { getFirestore, setDoc, doc, Timestamp, getDoc, getDocs } from 'firebase/firestore';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { LinkObject } from "../../models";
import { createCollection, DEBUG } from "../../utils";
import { createFirebaseApp } from "../../firebase/clientApp";

export type ResponseData<T> = {
    type: "error" | "success";
    code: number;
    message?: string;
    data?: T;
};

const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const getHash = customAlphabet(characters, 4);
const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData<LinkObject>>) => {
    if (req.method !== "POST" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        return res.status(405).json({
            type: "error",
            code: 405,
            message: "Invalid operation."
        });
    }
    if (DEBUG) {
        console.log(req.body);
    }
    if (!req.body) {
        return res.status(400).send({
            type: "error",
            code: 400,
            message: "Expected {link: string}"
        });
    }
    try {
        const app = await createFirebaseApp();
        const db = await getFirestore(app);
        const linkCollection = createCollection<LinkObject>(db, 'url-info');
        const hash = getHash();
        const date = Timestamp.now();
        const linkExists = await getDocs(linkCollection);
        if (!(linkExists.docs.some((x) => x.data().link === req.body))) {
            await setDoc(doc(linkCollection, hash), {
                link: req.body,
                date
            });
            const shortLink = `${process.env.HOST}/${hash}`;
            res.status(201);
            return res.send({
                type: "success",
                code: 201,
                data: {
                    link: shortLink,
                    date
                }
            });
        } else {
            const databaseLink = linkExists.docs.find((x) => x.data().link === req.body);
            const shortLink = `${process.env.HOST}/${databaseLink?.id}`;
            res.status(201);
            return res.send({
                type: "success",
                code: 201,
                data: {
                    link: shortLink,
                    date: databaseLink!.data().date,
                    expiresAt: databaseLink!.data().expiresAt
                }
            });
        }
    } catch (err: any) {
        res.status(500);
        return res.send({
            code: 500,
            type: "error",
            message: err?.message
        });
    }
};

export default handler;