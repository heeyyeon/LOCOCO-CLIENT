import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import Pagination from './Pagenation';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
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

// Interactive wrapper component
function PaginationWrapper({
  totalPages,
  initialPage = 1,
}: {
  totalPages: number;
  initialPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={setCurrentPage}
    />
  );
}

export const Small: Story = {
  render: () => <PaginationWrapper totalPages={6} />,
};

export const RightMoveable: Story = {
  render: () => <PaginationWrapper totalPages={8} initialPage={1} />,
};

export const LeftMoveable: Story = {
  render: () => <PaginationWrapper totalPages={8} initialPage={8} />,
};

export const LeftAndRightMoveable: Story = {
  render: () => <PaginationWrapper totalPages={12} initialPage={6} />,
};

export const SinglePage: Story = {
  render: () => <PaginationWrapper totalPages={1} initialPage={1} />,
};
