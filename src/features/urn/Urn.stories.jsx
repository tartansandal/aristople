import React from 'react';

import Urn from './Urn';

export default {
  title: 'Urn',
  component: Urn,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Urn {...args} />;

export const Default = Template.bind({});
Default.args = {};
