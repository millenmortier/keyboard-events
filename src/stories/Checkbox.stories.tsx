import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox from '../components/Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Default: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox
    checked={args.checked}
    onChange={() => {
      args.checked = !args.checked;
    }}
  />
);
Default.args = { checked: true };
Default.storyName = 'Checkbox';
