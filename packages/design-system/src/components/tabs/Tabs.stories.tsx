import type { Meta, StoryObj } from '@storybook/react';
import Tab from '../tab/Tab';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const PrimaryTabs: Story = {
  name: 'Primary Tabs',
  render: () => (
    <Tabs>
      <Tab label="Tab 1" variant="primary" active />
      <Tab label="Tab 2" variant="primary" />
      <Tab label="Tab 3" variant="primary" />
    </Tabs>
  ),
};

export const SecondaryTabs: Story = {
  name: 'Secondary Tabs',
  render: () => (
    <Tabs>
      <Tab label="Tab A" variant="secondary" active />
      <Tab label="Tab B" variant="secondary" />
      <Tab label="Tab C" variant="secondary" />
    </Tabs>
  ),
};
