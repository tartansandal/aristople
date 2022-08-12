import React from 'react';

import {
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';

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

export const And = () => {
  return (
    <Text fontSize="1.5rem" as="span">
      &and;
    </Text>
  );
};

export const Ratio = (a, b) => {
  return (
    <TableContainer display="inline" align="center">
      <Table size="sm" variant="unstyled" maxW="fit-content">
        <Tbody>
          <Tr>
            <Td px={1} textAlign="center">
              {String(a)}
            </Td>
          </Tr>
          <Tr borderTopWidth={1} borderColor="black">
            <Td textAlign="center">{String(b)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
