import React from 'react';

import {
  List,
  ListItem,
  // ListIcon,
  Link,
  // Heading,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <VStack pt={3} align="start">
      <List align="start">
        <ListItem>
          <Link as={RouterLink} to="introduction">
            Introduction
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="hypothetical-syllogism">
            Hypothetical Sylogism
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="modus-ponens">
            Modus Ponens
          </Link>
        </ListItem>
      </List>
    </VStack>
  );
};

export default NavBar;
