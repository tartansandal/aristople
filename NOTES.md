# Notes

## Potential React Libraries

Need a library that gives us nice sliders/inputs

Decided on Chakra-ui

## What components do I need?

* Slider for total number of balls.
  * Label
  * Value
  * up down arrows
  * Logarithmic values with markers
  * dont need tooltip if allowing

* a drop down with the number of properties considered

* define properties?
  * properties are "distinct": a ball either has the property or not.
  * a ball can have any combination of the supplied properties?

* Distinct versus linked properties
  * green/red, light/dark are distinct pairs

* A set of distinct properties that balls can have
  * Slider for numer of balls with each property
  * Constrained by the total number of balls
  * ? can balls hav none of the properties?
  * A slider for each (distinct) combination of properties

* A set of constraints on properties
  * number of balls with a property must be less than the number in the urn.
  * some properties may preclude others (e.g can be red and green)

* A set of distinct property combinations that balls can have?
  * With a slider for each with a proportion of total displayed
  * only constrained by total number of balls
