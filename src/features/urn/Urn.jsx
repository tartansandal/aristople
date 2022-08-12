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

// Factor out setting "maxValue" and "steps"
const MyLogSlider = props => {
  return (
    <LogSlider
      title={props.title}
      value={props.value}
      setter={props.setter}
      maxValue={MAX_IN_URN}
      steps={200}
    />
  );
};

const Urn = () => {
  const current = useSelector(state => state.urn.current);

  const totalValue = current.total;
  const metalValue = current.metal;
  const woodValue = current.wood;
  const smallValue = current.small;
  const largeValue = current.large;
  const smallWoodValue = current.small_wood;
  const largeWoodValue = current.large_wood;
  const smallMetalValue = current.small_metal;
  const largeMetalValue = current.large_metal;

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
        <MyLogSlider
          title="Total"
          value={totalValue}
          setter={updateTotalValue}
        />
      </VStack>
      <HStack>
        <VStack>
          <Text>Material</Text>
          <VStack spacing={2} p={3} pr={6} borderWidth="1px" borderRadius="lg">
            <MyLogSlider
              title="Wood"
              value={woodValue}
              setter={updateWoodValue}
            />
            <MyLogSlider
              title="Metal"
              value={metalValue}
              setter={updateMetalValue}
            />
          </VStack>
        </VStack>
        <VStack>
          <Text>Size</Text>
          <VStack spacing={2} p={3} pr={6} borderWidth="1px" borderRadius="lg">
            <MyLogSlider
              title="Small"
              value={smallValue}
              setter={updateSmallValue}
            />
            <MyLogSlider
              title="Large"
              value={largeValue}
              setter={updateLargeValue}
            />
          </VStack>
        </VStack>
      </HStack>
      <Text>Combinations</Text>
      <VStack spacing={2} p={3} pr={6} borderWidth="1px" borderRadius="lg">
        <SimpleGrid columns={2} spacingY={3} spacingX={10}>
          <MyLogSlider
            title="Small &and; Wood"
            value={smallWoodValue}
            setter={updateSmallWoodValue}
          />
          <MyLogSlider
            title="Large &and; Wood"
            value={largeWoodValue}
            setter={updateLargeWoodValue}
          />
          <MyLogSlider
            title="Small &and; Metal"
            value={smallMetalValue}
            setter={updateSmallMetalValue}
          />
          <MyLogSlider
            title="Large &and; Metal"
            value={largeMetalValue}
            setter={updateLargeMetalValue}
          />
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

Urn.propTypes = {};

export default Urn;
