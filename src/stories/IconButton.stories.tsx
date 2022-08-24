import { ComponentMeta, ComponentStory } from '@storybook/react';
import IconButton from '../components/IconButton';
import { FiEdit } from 'react-icons/fi';

export default {
  title: 'IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

export const Default: ComponentStory<typeof IconButton> = () => (
  <IconButton>
    <FiEdit />
  </IconButton>
);
Default.storyName = 'IconButton';
