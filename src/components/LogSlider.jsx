import React from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  // SliderMark,
  HStack,
  VStack,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const LogSlider = ({ title, value, setter, steps = 500, maxValue = 10000 }) => {
  // cache an expensive calculation
  const logOfMaxPlus1 = Math.log(maxValue + 1);

  // Log mapping for min=0, max=MAX_IN_URN, and steps=0..steps
  const onSliderChange = v => {
    let result = Math.floor(Math.pow(maxValue + 1, v / steps)) - 1;
    if (isNaN(result)) return 0;
    setter(result);
  };
  const inverse = v => {
    const result = Math.floor((steps * Math.log1p(v)) / logOfMaxPlus1);
    if (isNaN(result)) return steps;
    return result;
  };

  const onNumberChange = val => setter(val);

  return (
    <VStack align="left">
      <FormLabel m={0}>{title}</FormLabel>
      <HStack spacing={0}>
        <NumberInput
          size="sm"
          maxW="100px"
          mr="1rem"
          min={0}
          max={maxValue}
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
          max={steps}
          value={inverse(value)}
          onChange={onSliderChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={4} ml={2} />
        </Slider>
      </HStack>
    </VStack>
  );
};

export default LogSlider;
