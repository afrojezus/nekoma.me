import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppShell, Box, Container, Footer, Group, MantineProvider, Text, Title } from '@mantine/core';
import Head from 'next/head';
import Image from "next/image";
import { useColorScheme } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>neko.short</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>

    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={{
        primaryColor: "pink",
        colorScheme: "dark",
        fontFamily: "Manrope !important",
      }}
    >
      <NotificationsProvider position="top-center">
        <AppShell
          styles={{
            "main": {
              display: "flex",
              flexFlow: "column wrap"
            }
          }}
          footer={<Footer height={48}>
            <Container sx={{ height: "100%" }}>
              <Group position="apart" sx={{ height: "inherit" }}>
                <Title color="pink" order={6}>
                  nekoma.me
                </Title>
                <Group>
                  <Text size="xs">Created with ❤️ by afroj</Text>
                  <Text component="a" size="xs"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Text>
                </Group>
              </Group>
            </Container>
          </Footer>}
        >
          <Box sx={{
            zIndex: -1,
            opacity: 0.3,
            pointerEvents: "none",
            filter: "brightness(0.3) contrast(1.7)",
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0
          }}>
            <Image blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==" objectFit="cover" alt="" layout="fill" src="https://safebooru.org//images/3907/fcd3889d4b104c2fb236a910c1626c28cd0fe705.jpg" />
            <Box sx={(theme) => ({
              position: "fixed",
              height: "100%",
              width: "100%",
              top: 0,
              left: 0,
              backgroundColor: theme.fn.primaryColor(),
              opacity: 0.3
            })} />
          </Box>
          <Container m="auto" sx={{ width: 960 }}>
            <Component {...pageProps} />
          </Container>
        </AppShell>
      </NotificationsProvider>
    </MantineProvider>
  </>;
}

export default MyApp;
