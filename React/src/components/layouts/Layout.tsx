import NavBar from '@/components/layouts/NavBar';
import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

interface LayoutProps {
  children: JSX.Element
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id="body">
      <Head>
        <title>Reactivities</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon/favicon.ico"/>
      </Head>
      <NavBar />
      <Container maxW="1280px">
        {children}
      </Container>
    </div>
  )
}

export default Layout;