import React from 'react';
import LogSlider from '../../components/LogSlider';

import {
  HStack,
  VStack,
  Text,
  SimpleGrid,
  Heading,
  // Box,
} from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import {
  MAX_IN_URN,
  updateTotal,
  updateWood,
  updateMetal,
  updateSmall,
  updateLarge,
  updateSmallMetal,
  updateLargeMetal,
  updateSmallWood,
  updateLargeWood,
} from './urnSlice';

const Urn = () => {
  const totalValue = useSelector(state => state.urn.total);
  const metalValue = useSelector(state => state.urn.metal);
  const woodValue = useSelector(state => state.urn.wood);
  const smallValue = useSelector(state => state.urn.small);
  const largeValue = useSelector(state => state.urn.large);
  const smallWoodValue = useSelector(state => state.urn.small_wood);
  const largeWoodValue = useSelector(state => state.urn.large_wood);
  const smallMetalValue = useSelector(state => state.urn.small_metal);
  const largeMetalValue = useSelector(state => state.urn.large_metal);

  const dispatch = useDispatch();

  const updateTotalValue = v => dispatch(updateTotal(v));
  const updateMetalValue = v => dispatch(updateMetal(v));
  const updateWoodValue = v => dispatch(updateWood(v));
  const updateSmallValue = v => dispatch(updateSmall(v));
  const updateLargeValue = v => dispatch(updateLarge(v));
  const updateSmallWoodValue = v => dispatch(updateSmallWood(v));
  const updateLargeWoodValue = v => dispatch(updateLargeWood(v));
  const updateSmallMetalValue = v => dispatch(updateSmallMetal(v));
  const updateLargeMetalValue = v => dispatch(updateLargeMetal(v));

  return (
    <VStack spacing={5}>
      <Heading m={3}>The Urn</Heading>
      <VStack spacing={2} p={3} pr={6} borderWidth="1px" borderRadius="lg">
        <LogSlider
          title="Total"
          value={totalValue}
          setter={updateTotalValue}
          maxValue={MAX_IN_URN}
        />
      </VStack>
      <HStack>
        <VStack>
          <Text>Material</Text>
          <VStack spacing={2} p={3} pr={6} borderWidth="1px" borderRadius="lg">
            <LogSlider
              title="Wood"
              value={woodValue}
              setter={updateWoodValue}
              maxValue={MAX_IN_URN}
            />
            <LogSlider
              title="Metal"
              value={metalValue}
              setter={updateMetalValue}
              maxValue={MAX_IN_URN}
            />
          </VStack>
        </VStack>
        <VStack>
          <Text>Size</Text>
          <VStack spacing={2} p={3} pr={6} borderWidth="1px" borderRadius="lg">
            <LogSlider
              title="Small"
              value={smallValue}
              setter={updateSmallValue}
              maxValue={MAX_IN_URN}
            />
            <LogSlider
              title="Large"
              value={largeValue}
              setter={updateLargeValue}
              maxValue={MAX_IN_URN}
            />
          </VStack>
        </VStack>
      </HStack>
      <Text>Combinations</Text>
      <VStack spacing={2} p={3} pr={6} borderWidth="1px" borderRadius="lg">
        <SimpleGrid columns={2} spacingY={3} spacingX={10}>
          <LogSlider
            title="Small and Wood"
            value={smallWoodValue}
            setter={updateSmallWoodValue}
            maxValue={MAX_IN_URN}
          />
          <LogSlider
            title="Large and Wood"
            value={largeWoodValue}
            setter={updateLargeWoodValue}
            maxValue={MAX_IN_URN}
          />
          <LogSlider
            title="Small and Metal"
            value={smallMetalValue}
            setter={updateSmallMetalValue}
            maxValue={MAX_IN_URN}
          />
          <LogSlider
            title="Large and Metal"
            value={largeMetalValue}
            setter={updateLargeMetalValue}
            maxValue={MAX_IN_URN}
          />
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

Urn.propTypes = {};

export default Urn;