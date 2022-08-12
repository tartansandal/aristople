import React from 'react';

import {
  List,
  ListItem,
  // ListIcon,
  Link,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <VStack align="start">
      <Heading>Rules</Heading>
      <List align="start">
        <ListItem>
          <Link as={RouterLink} to="/aristople/hypothetical-syllogism">
            Hypothetical Sylogism
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/aristople/modus-ponens">
            Modus Ponens
          </Link>
        </ListItem>
      </List>
    </VStack>
  );
};

export default NavBar;
