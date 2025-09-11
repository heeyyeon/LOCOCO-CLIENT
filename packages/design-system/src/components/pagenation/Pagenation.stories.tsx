import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import Pagenation from './Pagenation';

const meta: Meta<typeof Pagenation> = {
  title: 'Components/Pagenation',
  component: Pagenation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function PagenationWrapper({
  totalPages,
  initialPage = 1,
}: {
  totalPages: number;
  initialPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <Pagenation
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={setCurrentPage}
    />
  );
}

export const Small: Story = {
  render: () => <PagenationWrapper totalPages={6} />,
};

export const RightMoveable: Story = {
  render: () => <PagenationWrapper totalPages={8} initialPage={1} />,
};

export const LeftMoveable: Story = {
  render: () => <PagenationWrapper totalPages={8} initialPage={8} />,
};

export const LeftAndRightMoveable: Story = {
  render: () => <PagenationWrapper totalPages={12} initialPage={6} />,
};

export const SinglePage: Story = {
  render: () => <PagenationWrapper totalPages={1} initialPage={1} />,
};
