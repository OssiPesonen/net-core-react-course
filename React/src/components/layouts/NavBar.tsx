import { Stack, Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';

interface NavBarProps {
  onClickAddActivity: () => void;
}

export default function NavBar ({ onClickAddActivity }: NavBarProps) {
  return (
    <div id="top">
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={8} p={8}>
        <div id="logo">
          <Link href="/"><a><Image src={logo} alt="Reactivities" /></a></Link>
        </div>
        <Stack spacing={8} direction='row'>
          <Link href="/"><a>Reactivities</a></Link>
          <Link href="/"><a>Activities</a></Link>
        </Stack>
        <Stack>
          <Button variant="outline" colorScheme="white" onClick={onClickAddActivity}>
            Create activity
          </Button>
        </Stack>
      </Flex>
    </div>
  )
}