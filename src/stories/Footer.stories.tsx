import { ComponentMeta, ComponentStory } from '@storybook/react';
import Footer from '../components/Footer';

export default {
  title: 'Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

export const Default: ComponentStory<typeof Footer> = (args) => (
  <Footer>{args.content}</Footer>
);
Default.args = { content: 'Made by John Doe - © 2022' };
Default.storyName = 'Footer';
