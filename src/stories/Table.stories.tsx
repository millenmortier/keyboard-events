import { ComponentMeta, ComponentStory } from '@storybook/react';

import Table from '../components/Table';

export default {
  title: 'Table',
  component: Table,
} as ComponentMeta<typeof Table>;

export const Default: ComponentStory<typeof Table> = () => (
  <Table>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Value 1.1</td>
        <td>Value 1.2</td>
        <td>Value 1.3</td>
      </tr>
      <tr>
        <td>Value 2.1</td>
        <td>Value 2.2</td>
        <td>Value 2.3</td>
      </tr>
    </tbody>
  </Table>
);
Default.storyName = 'Table';
