import React from 'react';

import {
  Heading,
  Text,
  Box,
  // HStack,
  VStack,
  // SimpleGrid,
  // Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
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

  return (
    <VStack spacing={50} alignItems="flex-start" justifyContent="space-between">
      <Heading>Hypothetical Syllogism</Heading>

      <Box>
        <Heading align="left" size="md" mb={5} color="blue.700">
          Material Conditional
        </Heading>
        <TableContainer fontStyle="italic">
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td>
                  Pr(wood <MImp /> large)
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {(1 - (wood - large_wood) / total).toFixed(4)}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(large <MImp /> metal)
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {(1 - (large - large_metal) / total).toFixed(4)}
                </Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor='gray.600'>
                <Td>
                  Pr(wood <MImp /> metal)
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(1 - (wood - 0) / total).toFixed(4)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Heading align="left" size="md" mb={5} color="blue.700">
          Natural Conditional
        </Heading>
        <TableContainer fontStyle="italic">
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td>
                  Pr(wood <NImp /> large)
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(large_wood / wood).toFixed(4)}</Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(large <NImp /> metal)
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(large_metal / large).toFixed(4)}</Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor='gray.600'>
                <Td>
                  Pr(wood <NImp /> metal)
                </Td>
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

export default HypotheticalSyllogism;
