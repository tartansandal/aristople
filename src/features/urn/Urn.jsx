import React, {
  //useState
} from 'react';
// import PropTypes from 'prop-types';
// import styles from "./Urn.module.css";
import {
  //  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  // SliderMark,
  HStack,
  VStack,
  // FormControl,
  FormLabel,
  Divider,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import {
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

// cache an expensive calculation
const log10001 = Math.log(10001);

const slider = (title, value, setter) => {

  // log mapping for min=0, max=10000, and steps=0..100
  const onSliderChange = v => {
    let result = Math.floor(Math.pow(10001, v / 100)) - 1;
    if (isNaN(result)) return 0;
    setter(result);
  };
  const inverse = v => {
    const result = Math.floor((100 * Math.log1p(v)) / log10001);
    if (isNaN(result)) return 100;
    return result;
  }

  const onNumberChange = val => setter(val);

  return (
    <HStack spacing={6}>
      <FormLabel w={120}>{title}</FormLabel>
      <NumberInput
        maxW="100px"
        mr="2rem"
        min={0}
        max={10000}
        value={value}
        onChange={onNumberChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        w={200}
        flex="1"
        focusThumbOnChange={false}
        min={0}
        max={100}
        value={inverse(value)}
        onChange={onSliderChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={4} ml={2} />
      </Slider>
    </HStack>
  );
};

// <SliderThumb fontSize="sm" boxSize="32px" children={value} />
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
      {slider('Total', totalValue, updateTotalValue)}
      <Divider />
      <Text>Material</Text>
      {slider('Wood', woodValue, updateWoodValue)}
      {slider('Metal', metalValue, updateMetalValue)}
      <Divider />
      <Text>Size</Text>
      {slider('Small', smallValue, updateSmallValue)}
      {slider('Large', largeValue, updateLargeValue)}
      <Divider />
      <Text>Combinations</Text>
      {slider('Small and Wood', smallWoodValue, updateSmallWoodValue)}
      {slider('Large and Wood', largeWoodValue, updateLargeWoodValue)}
      {slider('Small and Metal', smallMetalValue, updateSmallMetalValue)}
      {slider('Large and Metal', largeMetalValue, updateLargeMetalValue)}
    </VStack>
  );
};

Urn.propTypes = {};

export default Urn;
