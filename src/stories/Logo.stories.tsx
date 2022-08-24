import { ComponentMeta, ComponentStory } from '@storybook/react';

import Logo from '../components/Logo';

export default {
  title: 'Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

export const Default: ComponentStory<typeof Logo> = () => <Logo />;
Default.storyName = 'Logo';
