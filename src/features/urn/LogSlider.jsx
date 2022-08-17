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

import { useSelector } from 'react-redux';

const LogSlider = ({ title, value, setter, steps = 200, maxValue = 10000 }) => {

  // See https://www.geogebra.org/graphing/dz9k95e4 for details of this
  // calulation
  const c = 45   // this determines how sharply values increase with each step

  // the following relation ensures the min is 0 and the max is maxValue
  const d = maxValue / Math.expm1(steps/c)

  const log = useCallback(
    val => {
      // inverse of our custom exp function
      return Math.round(c * Math.log1p(val / d));
    },
    [c,d]
  );

  const exp = useCallback(
    val => {
      // inverse of or custom log function
      return Math.round(d * Math.expm1(val / c));
    },
    [c,d]
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [sliderValue, setSliderValue] = useState(log(value));

  // so we reset the slider on underflow or overflow
  const overflow = useSelector(state => state.urn.error.overflow);
  const underflow = useSelector(state => state.urn.error.underflow);

  // so adjacent sliders update when the state changes
  useEffect(() => {
    setSliderValue(log(value));
  }, [value, log, overflow, underflow]);

  return (
    <HStack spacing={5}>
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
          bg="blue.500"
          color="white"
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
