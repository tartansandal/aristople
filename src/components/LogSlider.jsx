import React, { useState, useEffect, useCallback } from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  // SliderMark,
  Tooltip,
  HStack,
  VStack,
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

  // inverse of or custom log function
  const exp = val => {
    let result = Math.round(Math.exp((val * logOfMaxPlus1) / steps)) - 1;
    return result;
  };
  // inverse of our custom exp function
  const log = val => {
    return Math.round((steps * Math.log1p(val)) / logOfMaxPlus1);
  };

  // a memoized version for use in useEffect
  const memoizedLog = useCallback(
    (val) => {
      return Math.round((steps * Math.log1p(val)) / logOfMaxPlus1);
    },
    [steps, logOfMaxPlus1],
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [sliderValue, setSliderValue] = useState(log(value));

  // so adjacent sliders updatewiehn the state changes
  useEffect( () => {
    setSliderValue(memoizedLog(value));
    }, [value, memoizedLog]
  );

  const onSliderChangeEnd = (v) => {
    const new_value = exp(v);
    setter(new_value);
    if (value !== new_value) {
      setSliderValue(memoizedLog(value))
    }
  };

  return (
      <HStack >
        <FormLabel mb={0}>{title}</FormLabel>
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
          onChangeEnd={onSliderChangeEnd}

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
