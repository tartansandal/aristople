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

const LogSlider = ({
  title,
  value,
  setter,
  steps = 200,
  maxValue = 10001,
}) => {
  // cache an expensive calculation
  const logOfMaxPlus1 = Math.log(maxValue + 1);

  // inverse of logMapping
  const expMapping = v => {
    let result = Math.round(Math.exp((v * logOfMaxPlus1) / steps)) - 1;
    return result;
  };
  // inverse of expMapping
  const logMapping = v => {
    const result = Math.round((steps * Math.log1p(v)) / logOfMaxPlus1);
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
          value={logMapping(value)}
          onChange={(v) => setter(expMapping(v))}
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
