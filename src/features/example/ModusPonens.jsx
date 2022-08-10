import React from 'react';

import {
  Heading,
  Text,
  Button,
  Box,
  HStack,
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

const And = () => {
  return (
    <Text fontSize="1.5rem" as="span">
      &and;
    </Text>
  );
};

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

const ModusPonens = () => {
  const total = useSelector(state => state.urn.total);
  const wood = useSelector(state => state.urn.wood);
  const metal = useSelector(state => state.urn.metal);
  const large = useSelector(state => state.urn.large);
  const large_metal = useSelector(state => state.urn.large_metal);
  const large_wood = useSelector(state => state.urn.large_wood);
  // const small_wood = useSelector(state => state.urn.large_wood);

  return (
    <VStack spacing={50} alignItems="flex-start" justifyContent="space-between">
      <Heading>Modus Ponens</Heading>

      <Presets />
      <Box>
        <Heading align="left" size="md" mb={5} color="blue.700">
          Material Conditional
        </Heading>
        <TableContainer fontStyle="italic">
          <Table size="sm" variant="unstyled">
            <Tbody>
              <Tr>
                <Td>Pr(metal)</Td>
                <Td>=</Td>
                <Td verticalAlign="middle">{Ratio('N(metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td>
                  <HStack alignContent="center">{Ratio(metal, total)}</HStack>
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(metal / total).toFixed(4)}</Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(metal <MImp /> large and metal)
                </Td>
                <Td>=</Td>
                <Td>{Ratio('N(total) - N(metal) + N(large and metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td>{Ratio(total - metal + large_metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>{(total - metal + large_metal / total).toFixed(4)}</Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>
                  Pr(large and metal)
                </Td>
                <Td>=</Td>
                <Td>
                    {Ratio('N(large and metal)', 'N(total)')}
                </Td>
                <Td>=</Td>
                <Td>
                    {Ratio(large_metal, total)}
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(large_metal / total).toFixed(4)}</Td>
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
          <Table size="sm" variant="unstyled">
            <Tbody>
              <Tr>
                <Td>Pr(metal)</Td>
                <Td>=</Td>
                <Td verticalAlign="middle">{Ratio('N(metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td>
                  <HStack alignContent="center">{Ratio(metal, total)}</HStack>
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(metal / total).toFixed(4)}</Td>
              </Tr>
              <Tr>
                <Td>
                  Pr(metal <MImp /> large and metal)
                </Td>
                <Td>=</Td>
                <Td>{Ratio('N(large and metal)', 'N(total)')}</Td>
                <Td>=</Td>
                <Td>{Ratio(large_metal, total)}</Td>
                <Td>=</Td>
                <Td isNumeric>{(large_metal / total).toFixed(4)}</Td>
              </Tr>
              <Tr borderTopWidth={2} borderColor="gray.600">
                <Td>
                  Pr(large and metal)
                </Td>
                <Td>=</Td>
                <Td>
                    {Ratio('N(large and metal)', 'N(total)')}
                </Td>
                <Td>=</Td>
                <Td>
                    {Ratio(large_metal, total)}
                </Td>
                <Td>=</Td>
                <Td isNumeric>{(large_metal / total).toFixed(4)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </VStack>
  );
};

const Ratio = (a, b) => {
  return (
    <TableContainer display="inline">
      <Table size="sm" variant="unstyled">
        <Tr>
          <Td textAlign="center">{a}</Td>
        </Tr>
        <Tr borderTopWidth={1} borderColor="black">
          <Td textAlign="center">{b}</Td>
        </Tr>
      </Table>
    </TableContainer>
  );
};

export default ModusPonens;
