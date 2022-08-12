import React from 'react';

import {
  Heading,
  Text,
  Button,
  Box,
  // HStack,
  VStack,
  // Flex,
  // Grid,
  // SimpleGrid,
  // Divider,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  List,
  ListItem,
  ListIcon,
  // OrderedList,
  // UnorderedList,
} from '@chakra-ui/react';

import { ArrowLeftIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateAll } from '../urn/urnSlice';
import styles from './rules.module.css';
import {Ratio, MImp, NImp } from './rules.jsx'

const Presets = () => {
  const dispatch = useDispatch();

  return (
    <Box>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={ArrowLeftIcon} color="green.500" />
          <Button
            onClick={() =>
              dispatch(
                updateAll({
                  small_wood: 0,
                  large_wood: 10,
                  small_metal: 1,
                  large_metal: 989,
                })
              )
            }
          >
            Preset: 0, 10, 1, 989
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

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

      <Presets />
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
                  {Ratio('N(total) - N(wood) + N(large and wood)', 'N(total)')}
                </Td>
                <Td>=</Td>
                <Td className={styles.fixed}>
                  {Ratio(total - wood + large_wood, total)}
                </Td>
                <Td>=</Td>
                <Td isNumeric>
                  {((total - wood + large_wood) / total).toFixed(4)}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(large <MImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>
                  {Ratio(
                    'N(total) - N(large) + N(large and metal)',
                    'N(total)'
                  )}
                </Td>
                <Td>=</Td>
                <Td>{Ratio(total - large + large_metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>
                  {((total - large + large_metal) / total).toFixed(4)}
                </Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>
                  Pr(wood <MImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>
                  {Ratio('N(total) - N(wood) + N(wood and metal)', 'N(total)')}
                </Td>
                <Td>=</Td>
                <Td>{Ratio(total - wood + 0, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>{((total - wood) / total).toFixed(4)}</Td>
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
                <Td>{Ratio('N(large and wood)', 'N(wood)')}</Td>
                <Td>=</Td>
                <Td className={styles.fixed}>{Ratio(large_wood, wood)}</Td>
                <Td>=</Td>
                <Td isNumeric>{(large_wood / wood).toFixed(4)}</Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(large <NImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>{Ratio('N(large and metal)', 'N(large)')}</Td>
                <Td>=</Td>
                <Td>{Ratio(large_metal, large)}</Td>
                <Td>=</Td>
                <Td isNumeric>{(large_metal / large).toFixed(4)}</Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>
                  Pr(wood <NImp /> metal)
                </Td>
                <Td>=</Td>
                <Td>{Ratio('N(wood and metal)', 'N(wood)')}</Td>
                <Td>=</Td>
                <Td>{Ratio(0, wood)}</Td>
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
