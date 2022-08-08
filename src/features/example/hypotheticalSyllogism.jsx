import React from 'react';

import {
  Heading,
  Text,
  Box,
  HStack,
  VStack,
  // SimpleGrid,
  // Divider,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const MImp = () => {
  return (
    <>
      <Text fontSize="1.5rem" as="span">
        &rarr;
      </Text>
      <sub>m</sub>
    </>
  );
};

// Nice if we could find a font library with nice math symbols
const NImp = () => {
  return (
    <>
      <Text fontSize="1.5rem" as="span">
        &rarr;
      </Text>
      <sub>n</sub>
    </>
  );
};

const HypotheticalSyllogism = () => {
  const total = useSelector(state => state.urn.total);
  const wood = useSelector(state => state.urn.wood);
  // const metal = useSelector(state => state.urn.metal);
  const large = useSelector(state => state.urn.large);
  const large_metal = useSelector(state => state.urn.large_metal);
  const large_wood = useSelector(state => state.urn.large_wood);
  const small_wood = useSelector(state => state.urn.large_wood);

  return (
    <VStack spacing={50} alignItems="flex-start" justifyContent="space-between">
      <Heading>Hypothetical Syllogism</Heading>

      <Box>
        <Heading align="left" size="md" mb={5} color="blue.700">
          Material Conditional
        </Heading>
        <TableContainer size="sm" fontStyle="italic">
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td>
                  Pr(wood <MImp /> large)
                </Td>
                <Td>=</Td>
                <Td verticalAlign="middle">
                  <HStack alignContent="center">
                    <Text>1 -</Text>
                    {Over('N(small and wood)', 'N(total)')}
                  </HStack>
                </Td>
                <Td>=</Td>
                <Td>
                  <HStack alignContent="center">
                    <Text>1 -</Text>
                    {Over(small_wood, total)}
                  </HStack>
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(1 - small_wood / total).toFixed(4)}</Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(large <MImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>
                  <HStack alignContent="center">
                    <Text>1 -</Text>
                    {Over('N(large and wood)', 'N(total)')}
                  </HStack>
                </Td>
                <Td>=</Td>
                <Td>
                  <HStack alignContent="center">
                    <Text>1 -</Text>
                    {Over(large_wood, total)}
                  </HStack>
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(1 - large_wood / total).toFixed(4)}</Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>
                  Pr(wood <MImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>
                  <HStack alignContent="center">
                    <Text>1 -</Text>
                    {Over('N(wood and wood)', 'N(total)')}
                  </HStack>
                </Td>
                <Td>=</Td>
                <Td>
                  <HStack alignContent="center">
                    <Text>1 -</Text>
                    {Over(wood, total)}
                  </HStack>
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(1 - wood / total).toFixed(4)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Heading align="left" size="md" mb={5} color="blue.700">
          Natural Conditional
        </Heading>
        <TableContainer size="sm" fontStyle="italic">
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td>
                  Pr(wood <NImp /> large)
                </Td>
                <Td>=</Td>
                <Td>{Over('N(large and wood)', 'N(wood)')}</Td>
                <Td>=</Td>
                <Td>{Over(large_wood, wood)}</Td>
                <Td>=</Td>
                <Td isNumeric>{(large_wood / wood).toFixed(4)}</Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(large <NImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>{Over('N(large and metal)', 'N(large)')}</Td>
                <Td>=</Td>
                <Td>{Over(large_metal, large)}</Td>
                <Td>=</Td>
                <Td isNumeric>{(large_metal / large).toFixed(4)}</Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>
                  Pr(wood <NImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>{Over('N(wood and metal)', 'N(wood)')}</Td>
                <Td>=</Td>
                <Td>{Over(0, wood)}</Td>
                <Td>=</Td>
                <Td isNumeric>{(0 / wood).toFixed(4)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </VStack>
  );
};

const Over = (a, b) => {
  return (
    <TableContainer size="sm" display="inline">
      <Tr>
        <Td textAlign="center">{a}</Td>
      </Tr>
      <Tr borderTopWidth={1} borderColor="black">
        <Td textAlign="center">{b}</Td>
      </Tr>
    </TableContainer>
  );
};

export default HypotheticalSyllogism;
