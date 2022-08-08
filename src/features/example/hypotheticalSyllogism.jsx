import React from 'react';

import {
  Heading,
  Text,
  Box,
  // HStack,
  VStack,
  // SimpleGrid,
  // Divider,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

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
      
      <Box fontStyle="italic">
      <Heading size="md" mb={5}>Material Conditional</Heading>
      <Text>
        Pr(wood {'->'} large) = {(1 - ((wood - large_wood) / total)).toFixed(4)}
      </Text>
      <Text>
        Pr(large {'->'} metal) = {(1 - (large - large_metal) / total).toFixed(4)}
      </Text>
      <Box borderColor='gray.600' borderTopWidth={2}></Box>
      <Text>
        Pr(wood {'->'} metal) = {(1 - (wood - 0) / total).toFixed(4)}
      </Text>
      </Box>
      <Box fontStyle="italic">
      <Heading size="md" mb={5}>Natural Conditional</Heading>
      <Text>
        Pr(wood {'->'} large) = {(large_wood / wood).toFixed(4)}
      </Text>
      <Text>
        Pr(large {'->'} metal) = {(large_metal / large).toFixed(4)}
      </Text>
      <Box borderColor='gray.600' borderTopWidth={2}></Box>
      <Text>
        Pr(wood {'->'} metal) = {(0 / wood).toFixed(4)}
      </Text>
      </Box>
    </VStack>
  );
};

export default HypotheticalSyllogism;
