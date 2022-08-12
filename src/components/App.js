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

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Urn from '../features/urn/Urn';
import HypotheticalSyllogism from '../features/rules/HypotheticalSyllogism';
// import ModusPonens from '../features/rules/ModusPonens';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="md">
        <Grid
          templateAreas={`
            "header header"
            "urn    main"
            "footer footer"
          `}
          gridTemplateRows={'50px 1fr 30px'}
          gridTemplateColumns={'760px 1fr'}
          minH="100vh"
          gap="2"
        >
          <GridItem pl="2" bg="blue.100" area={'header'}>
            <Flex>
              <Heading>Aristople</Heading>
              <Spacer />
              <ColorModeSwitcher />
            </Flex>
          </GridItem>
          <GridItem ml={2} borderWidth={2} borderRadius="md" area={'urn'}
      >
              <Urn />
          </GridItem>
          <GridItem pl="2" area={'main'}>
            <HypotheticalSyllogism />
          </GridItem>
          <GridItem pl="2" bg="blue.100" area={'footer'}>
            <Link href='https://github.com/tartansandal/aristople' isExternal>
              Aristople on GitHub <ExternalLinkIcon mx='2px' />
            </Link>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
