import React from 'react';
import {
  ChakraProvider,
  Box,
  // Text,
  Heading,
  // VStack,
  // HStack,
  Flex,
  Spacer,
  // Divider,
  Grid,
  GridItem,
  // Center,
  Link,
  theme,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import ColorModeSwitcher from './ColorModeSwitcher';
import NavBar from './NavBar';
import Urn from '../features/urn/Urn';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="md">
        <Grid
          templateAreas={`
            "header header header"
            "nav    main   urn"
            "footer footer footer"
          `}
          gridTemplateRows={'50px 1fr 30px'}
          gridTemplateColumns={'200px 1fr 760px'}
          minH="100vh"
          gap="2"
        >
          <GridItem  area={'header'} pl="2" bg="blue.100">
            <Flex>
              <Spacer />
              <Heading>Aristople</Heading>
              <Spacer />
              <ColorModeSwitcher />
            </Flex>
          </GridItem>
          <GridItem area={'nav'} pl="2" borderRightWidth={2}>
            <NavBar />
          </GridItem>
          <GridItem area={'main'} pl="2">
            <Outlet />
          </GridItem>
          <GridItem area={'urn'} ml={2} borderLeftWidth={2}>
            <Urn />
          </GridItem>
          <GridItem pl="2" bg="blue.100" area={'footer'}>
            <Link href="https://github.com/tartansandal/aristople" isExternal>
              Aristople on GitHub <ExternalLinkIcon mx="2px" />
            </Link>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
