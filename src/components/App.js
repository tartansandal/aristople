import React from 'react';
import {
  ChakraProvider,
  Box,
  // Text,
  Heading,
  VStack,
  // HStack,
  Flex,
  Spacer,
  // Divider,
  Grid,
  GridItem,
  Center,
  theme,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import Urn from '../features/urn/Urn';
import HypotheticalSyllogism from '../features/example/hypotheticalSyllogism';

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
          <GridItem ml={2} borderWidth={2} borderRadius="md" area={'urn'}>
    <VStack minH="90vh" justifyContent="center">
              <Urn />
    </VStack>
          </GridItem>
          <GridItem pl="2" area={'main'}>
              <HypotheticalSyllogism />
          </GridItem>
          <GridItem pl="2" bg="blue.100" area={'footer'}>
            Footer
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
