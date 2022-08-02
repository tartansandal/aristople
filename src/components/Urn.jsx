import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styles from "./Urn.module.css";
import {
  Button,
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

const slider = (title, value, setter) => {

  const logSetter = (val) => setter(Math.floor(Math.pow(10001, val/100))-1);
  const inverse   = (val) => Math.floor(100*Math.log1p(val)/Math.log(10001));

  return (
    <HStack spacing={6}>
      <FormLabel w={120}>{title}</FormLabel>
      <NumberInput
        maxW="100px"
        mr="2rem"
        min={0}
        max={10000}
        value={value}
        onChange={setter}
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
        onChange={logSetter}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={4} ml={2}/>
      </Slider>
    </HStack>
  );
};

// <SliderThumb fontSize="sm" boxSize="32px" children={value} />
const Urn = () => {
  const [totalValue, setTotalValue] = useState(50);
  const [metalValue, setMetalValue] = useState(50);
  const [woodValue, setWoodValue] = useState(50);
  const [smallValue, setSmallValue] = useState(50);
  const [largeValue, setLargeValue] = useState(50);

  const [smallWoodValue, setSmallWoodValue] = useState(50);
  const [largeWoodValue, setLargeWoodValue] = useState(50);
  const [smallMetalValue, setSmallMetalValue] = useState(50);
  const [largeMetalValue, setLargeMetalValue] = useState(50);

  return (
    <VStack spacing={5}>
      {slider('Total', totalValue, setTotalValue)}
      <Divider />
      <Text>Material</Text>
      {slider('Wood', woodValue, setWoodValue)}
      {slider('Metal', metalValue, setMetalValue)}
      <Divider />
      <Text>Size</Text>
      {slider('Small', smallValue, setSmallValue)}
      {slider('Large', largeValue, setLargeValue)}
      <Divider />
      <Text>Combinations</Text>
      {slider('Small and Wood', smallWoodValue, setSmallWoodValue)}
      {slider('Large and Wood', largeWoodValue, setLargeWoodValue)}
      {slider('Small and Metal', smallMetalValue, setSmallMetalValue)}
      {slider('Large and Metal', largeMetalValue, setLargeMetalValue)}
    </VStack>
  );
};

Urn.propTypes = {};

export default Urn;
