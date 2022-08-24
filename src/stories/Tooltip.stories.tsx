import { ComponentMeta, ComponentStory } from '@storybook/react';

import Tooltip from '../components/Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export const Default: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip label={args.label}>Hover this text</Tooltip>
);
Default.args = {
  label: 'And this text will show up!',
};
Default.storyName = 'Tooltip';
