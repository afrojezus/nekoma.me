import { Box, Button, Card, Center, Group, Stack, Text, TextInput, Title, Transition } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { LinkObject } from '../models';
import { apiCall, DEBUG } from '../utils';
import { ResponseData } from './api/create-link';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [newLink, setNewLink] = useState<string>('');
  const form = useForm({
    initialValues: {
      link: ''
    }
  });
  const submit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      if (DEBUG) {
        console.log(values);
      }
      const res = await apiCall<ResponseData<LinkObject>, Error>(`/api/create-link`, {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain'
        },
        body: values.link
      });
      setNewLink(res.data!.link);
    } catch (error: any) {
      console.error(error);
      showNotification({ message: error?.message, color: "red" });
    } finally {
      setLoading(false);
    }
  });
  return (
    <>
      <Head>
        <title>nekoma.me</title>
        <meta name="description" content="URL shortener for people who really, really, like cats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack my="xl">
        <Center>
          <Title sx={(theme) => ({
            color: theme.colors[theme.primaryColor][2],
            fontSize: "4rem",
            textShadow: `
              0px 2px 1px ${theme.colors[theme.primaryColor][5]},
              0px 3px 1px ${theme.colors[theme.primaryColor][6]},
              0px 4px 1px ${theme.colors[theme.primaryColor][7]},
              0px 5px 1px ${theme.colors[theme.primaryColor][8]},
              0px 6px 12px rgba(0,0,0,.2);
              `
          })}>
            <Link href="/">nekoma.me</Link>
          </Title>
        </Center>
        <Center>
          <Text>shorten your urls with a cute one</Text>
        </Center>
      </Stack>
      <Box autoComplete="off" component="form" sx={{ flex: 1 }} onSubmit={submit}>
        <Group>
          <TextInput disabled={loading} sx={{ flex: 1 }} {...form.getInputProps("link")} />
          <Button disabled={loading} type="submit">Nekofy</Button>
        </Group>
      </Box>
      <Transition transition="slide-down" mounted={!(!newLink?.length)}>
        {(styles) => <Card my="xl" style={styles}>
          <Group>
            <Text sx={(theme) => ({ color: theme.colors.dark[3] })}>your new nekofied link:</Text>
            <Text color="pink" sx={{ flex: 1 }}><a target="_blank"
              rel="noopener noreferrer" href={newLink}>{newLink}</a></Text>
          </Group></Card>}
      </Transition>
    </>
  );
};

export default Home;
