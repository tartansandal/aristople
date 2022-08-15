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
  const scale = steps / Math.log1p(maxValue/steps);

  const log = useCallback(
    (val) => {
      // inverse of our custom exp function
      return Math.round(scale*(Math.log1p(val/steps)));
    },
    [steps, scale],
  );

  const exp = useCallback(
    (val) => {
      // inverse of or custom log function
      return Math.round(steps*Math.expm1((val/scale)));
    },
    [steps, scale],
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
