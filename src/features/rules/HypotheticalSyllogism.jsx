import React from 'react';

import {
  Heading,
  Box,
  VStack,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import styles from './rules.module.css';
import { Ratio, MImp, NImp, AND, Presets } from './rules.jsx';

const HypotheticalSyllogism = () => {
  const current = useSelector(state => state.urn.current);

  const total = current.total;
  const wood = current.wood;
  // const metal = metal;
  const large = current.large;
  const large_metal = current.large_metal;
  const large_wood = current.large_wood;
  // const small_wood = current.large_wood;

  return (
    <VStack spacing={50} alignItems="flex-start" justifyContent="space-between">
      <Heading>Hypothetical Syllogism</Heading>
      <Box>
        <Heading align="left" size="md" mb={5} color="blue.700">
          Material Conditional
        </Heading>
        <TableContainer fontStyle="italic">
          <Table size="sm" variant="unstyled" className={styles.propTable}>
            <Tbody>
              <Tr>
                <Td>
                  Pr(wood <MImp /> large)
                </Td>
                <Td>=</Td>
                <Td verticalAlign="middle">
                  <Ratio
                    top={`N(total) - N(wood) + N(large ${AND} wood)`}
                    bottom={'N(total)'}
                  />
                </Td>
                <Td>=</Td>
                <Td className={styles.fixed}>
                  <Ratio top={total - wood + large_wood} bottom={total} />
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0
                    ? ((total - wood + large_wood) / total).toFixed(4)
                    : 'undefined'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(large <MImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio
                    top={`N(total) - N(large) + N(large ${AND} metal)`}
                    bottom={'N(total)'}
                  />
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio top={total - large + large_metal} bottom={total} />
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0
                    ? ((total - large + large_metal) / total).toFixed(4)
                    : 'undefined'}
                </Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>
                  Pr(wood <MImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio
                    top={`N(total) - N(wood) + N(wood ${AND} metal)`}
                    bottom={'N(total)'}
                  />
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio top={total - wood + 0} bottom={total} />
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {total > 0
                    ? ((total - wood) / total).toFixed(4)
                    : 'undefined'}
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
                <Td>
                  Pr(wood <NImp /> large)
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio top={`N(large ${AND} wood)`} bottom={'N(wood)'} />
                </Td>
                <Td>=</Td>
                <Td className={styles.fixed}>
                  <Ratio top={large_wood} bottom={wood} />
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {wood > 0 ? (large_wood / wood).toFixed(4) : 'undefined'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(large <NImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio top={`N(large ${AND} metal)`} bottom={'N(large)'} />
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio top={large_metal} bottom={large} />
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {large > 0 ? (large_metal / large).toFixed(4) : 'undefined'}
                </Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>
                  Pr(wood <NImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio top={`N(wood ${AND} metal)`} bottom={'N(wood)'} />
                </Td>
                <Td>=</Td>
                <Td>
                  <Ratio top={0} bottom={wood} />
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {wood > 0 ? (0 / wood).toFixed(4) : 'undefined'}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Presets sets={[[0, 10, 1, 989]]} />
    </VStack>
  );
};

export default HypotheticalSyllogism;
