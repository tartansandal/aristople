import React, { useState, useEffect, useCallback } from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  // SliderMark,
  Tooltip,
  HStack,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const LogSlider = ({ title, value, setter, steps = 200, maxValue = 10001 }) => {
  // cache an expensive calculation
  const logOfMaxPlus1 = Math.log(maxValue + 1);

  const log = useCallback(
    (val) => {
      // inverse of our custom exp function
      return Math.round((steps * Math.log1p(val)) / logOfMaxPlus1);
    },
    [steps, logOfMaxPlus1],
  );

  const exp = useCallback(
    (val) => {
      // inverse of or custom log function
      return Math.round(Math.exp((val * logOfMaxPlus1) / steps)) - 1;
    },
    [steps, logOfMaxPlus1],
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [sliderValue, setSliderValue] = useState(log(value));

  // so adjacent sliders update when the state changes
  useEffect( () => {
    setSliderValue(log(value));
    }, [value, log]
  );

  return (
      <HStack spacing={5} >
        <FormLabel m={0}>{title}</FormLabel>
        <NumberInput
          size="sm"
          maxW="100px"
          mr="1rem"
          min={0}
          max={maxValue}
          value={value}
          onChange={v => setter(v)}
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
          value={sliderValue}
          onChange={v => setSliderValue(v)}
          onChangeEnd={v => setter(exp(v))}

          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg='blue.500'
            color='white'
            placement="top"
            isOpen={showTooltip}
            label={exp(sliderValue)}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </HStack>
  );
};

export default LogSlider;
