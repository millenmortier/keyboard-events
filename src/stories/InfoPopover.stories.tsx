import { ComponentMeta, ComponentStory } from '@storybook/react';

import InfoPopover from '../components/InfoPopover';

export default {
  title: 'InfoPopover',
  component: InfoPopover,
} as ComponentMeta<typeof InfoPopover>;

export const Default: ComponentStory<typeof InfoPopover> = (args) => (
  <InfoPopover>{args.children}</InfoPopover>
);
Default.args = {
  children:
    'Content of the popover. Here, you can provide can additional details on whatever you want',
};
Default.storyName = 'InfoPopover';
