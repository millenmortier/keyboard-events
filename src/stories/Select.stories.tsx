import { ComponentMeta, ComponentStory } from '@storybook/react';

import Select from '../components/Select';

export default {
  title: 'Select',
  component: Select,
} as ComponentMeta<typeof Select>;

export const Default: ComponentStory<typeof Select> = (args) => (
  <Select {...args} />
);
Default.args = {
  options: ['option1', 'option2', 'option3'],
  value: 'option1',
};
Default.storyName = 'Select';
