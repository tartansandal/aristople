import React from 'react';

import {
  Heading,
  Box,
  VStack,
  HStack,
  Spacer,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import styles from './rules.module.css';
import { Ratio, MImp, NImp, Presets } from './rules.jsx';

const ModusPonens = () => {
  const current = useSelector(state => state.urn.current);

  const total = current.total;
  const metal = current.metal;
  const large_metal = current.large_metal;

  return (
    <VStack spacing={50} alignItems="flex-start" justifyContent="space-between">
      <HStack w="100%" spacing={5}>
        <Heading>Modus Ponens</Heading>
        <Spacer />
        <Presets sets={[[0, 10, 1, 989]]} />
      </HStack>
      <Box>
        <Heading align="left" size="md" mb={5} color="blue.700">
          Material Conditional
        </Heading>
        <TableContainer fontStyle="italic">
          <Table size="sm" variant="unstyled" className={styles.propTable}>
            <Tbody>
              <Tr>
                <Td>Pr(metal)</Td>
                <Td>=</Td>
                <Td verticalAlign="middle">{Ratio('N(metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td className={styles.fixed}>{Ratio(metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0 ? (metal / total).toFixed(4) : 'undefined'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(metal <MImp /> large and metal)
                </Td>
                <Td>=</Td>
                <Td>
                  {Ratio(
                    'N(total) - N(metal) + N(large and metal)',
                    'N(total)'
                  )}
                </Td>
                <Td>=</Td>
                <Td>{Ratio(total - metal + large_metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0
                    ? ((total - metal + large_metal) / total).toFixed(4)
                    : 'undefined'}
                </Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>Pr(large and metal)</Td>
                <Td>=</Td>
                <Td>{Ratio('N(large and metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td>{Ratio(large_metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0 ? (large_metal / total).toFixed(4) : 'undefined'}
                </Td>
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
          <Table size="sm" variant="unstyled" className={styles.propTable}>
            <Tbody>
              <Tr>
                <Td>Pr(metal)</Td>
                <Td>=</Td>
                <Td verticalAlign="middle">{Ratio('N(metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td className={styles.fixed}>{Ratio(metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0 ? (metal / total).toFixed(4) : 'undefined'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(metal <NImp /> large and metal)
                </Td>
                <Td>=</Td>
                <Td>{Ratio('N(large and metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td>{Ratio(large_metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0 ? (large_metal / total).toFixed(4) : 'undefined'}
                </Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>Pr(large and metal)</Td>
                <Td>=</Td>
                <Td>{Ratio('N(large and metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td>{Ratio(large_metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0 ? (large_metal / total).toFixed(4) : 'undefined'}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </VStack>
  );
};

export default ModusPonens;
