import React from 'react';

import {
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Flex,
  VStack,
  Heading,
  Button,
  List,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { updateAll } from '../urn/urnSlice';

export const AND = '\u2227';
export const LAND = () => {
  return <>&and;</>;
};

export const MImp = () => {
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
export const NImp = () => {
  return (
    <>
      <Text fontSize="1.5rem" as="span">
        &rarr;
      </Text>
      <sub>n</sub>
    </>
  );
};

export const Ratio = ({ top, bottom }) => {
  const color = useColorModeValue('black', 'white');
  return (
    <TableContainer display="inline" align="center">
      <Table size="sm" variant="unstyled" maxW="fit-content">
        <Tbody>
          <Tr>
            <Td px={1} textAlign="center">
              {String(top)}
            </Td>
          </Tr>
          <Tr borderTopWidth={1} borderColor={color}>
            <Td textAlign="center">{String(bottom)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export const Presets = ({ sets }) => {
  const dispatch = useDispatch();

  const buttons = sets.map(set => {
    return (
      <ListItem key={set.join('_')}>
        <Button
          size="sm"
          rightIcon={<ArrowRightIcon />}
          onClick={() =>
            dispatch(
              updateAll({
                small_wood: set[0],
                large_wood: set[1],
                small_metal: set[2],
                large_metal: set[3],
              })
            )
          }
        >
          {set.join(', ')}
        </Button>
      </ListItem>
    );
  });

  return (
    <Flex w="100%" justify="end">
      <VStack>
        <Heading size="md" align="center">
          Presets
        </Heading>
        <List spacing={3}>{buttons}</List>
      </VStack>
    </Flex>
  );
};
