import { ComponentMeta, ComponentStory } from '@storybook/react';

import Kbd from '../components/Kbd';

export default {
  title: 'Kbd',
  component: Kbd,
} as ComponentMeta<typeof Kbd>;

export const Default: ComponentStory<typeof Kbd> = (args) => (
  <Kbd>{args.key}</Kbd>
);
Default.args = { key: 'Ctrl' };
Default.storyName = 'Kbd';
