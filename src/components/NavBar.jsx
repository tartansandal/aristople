import React from 'react';

import {
  Link,
  // Heading,
  VStack,
  Button,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <VStack pt={3} align="start">
      <Link as={NavLink} to="introduction">
        {({ isActive }) => <Button isActive={isActive}>Introduction</Button>}
      </Link>
      <Link as={NavLink} to="hypothetical-syllogism">
        {({ isActive }) => (
          <Button isActive={isActive}>Hypothetical Sylogism</Button>
        )}
      </Link>
      <Link as={NavLink} to="modus-ponens">
        {({ isActive }) => <Button isActive={isActive}>Modus Ponens</Button>}
      </Link>
    </VStack>
  );
};

export default NavBar;
