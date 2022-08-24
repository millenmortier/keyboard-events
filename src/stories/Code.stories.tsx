import { ComponentMeta, ComponentStory } from '@storybook/react';
import Code from '../components/Code';

export default {
  title: 'Code',
  component: Code,
} as ComponentMeta<typeof Code>;

export const Default: ComponentStory<typeof Code> = (args) => (
  <Code>{args.text}</Code>
);
Default.args = { text: 'Some text' };
Default.storyName = 'Code';
