import { Center, Text } from "@mantine/core";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import { NextApiRequest, NextPage } from "next";
import Head from "next/head";
import { createFirebaseApp } from "../firebase/clientApp";
import { LinkObject } from "../models";
import { createCollection } from "../utils";

export const getServerSideProps = async (req: NextApiRequest) => {
    const hash = req.query.hash as string;
    const app = await createFirebaseApp();
    const db = await getFirestore(app);
    const linkCollection = createCollection<LinkObject>(db, 'url-info');
    const link = await getDoc(doc(linkCollection, hash));

    if (link.exists()) {
        return {
            redirect: {
                destination: link.data()?.link,
                permanent: false
            }
        };
    }
    return {
        props: {}
    };
};

const HashPage: NextPage = () => {
    return <>
        <Head>
            <title>neko-shorter</title>
            <meta name="description" content="Quick and dirty url shortener" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Center>
            <Text size="xl">The requested link is no longer available.</Text>
        </Center>
    </>;
};

export default HashPage;