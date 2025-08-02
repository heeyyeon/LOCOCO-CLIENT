import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { SvgGoodFill } from '../../icons/fill/components/GoodFill';
import { SvgGoodOutline } from '../../icons/fill/components/GoodOutline';
import { SvgLikeFill } from '../../icons/fill/components/LikeFill';
import { SvgLikeOutline } from '../../icons/fill/components/LikeOutline';
import ReactionToggle from './ReactionToggle';

const meta: Meta<typeof ReactionToggle> = {
  title: 'components/ReactionToggle',
  component: ReactionToggle,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    pressed: {
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryObj<typeof ReactionToggle>;

export const Vertical: Story = {
  render: function Render(args) {
    const [isPressed, setIsPressed] = useState(false);
    const { ...restArgs } = args;

    return (
      <div className="bg-black p-5 text-white">
        <ReactionToggle
          {...restArgs}
          pressed={isPressed}
          onPressedChange={setIsPressed}
        >
          {isPressed ? (
            <SvgLikeFill className="size-[2.4rem]" />
          ) : (
            <SvgLikeOutline className="size-[2.4rem]" />
          )}
          <span className="text-en-caption1">123</span>
        </ReactionToggle>
      </div>
    );
  },
  args: {
    variant: 'vertical',
  },
};

export const Horizontal: Story = {
  render: function Render(args) {
    const [isPressed, setIsPressed] = useState(false);
    const { ...restArgs } = args;

    return (
      <ReactionToggle
        {...restArgs}
        pressed={isPressed}
        onPressedChange={setIsPressed}
        className="text-en-body1"
      >
        {isPressed ? (
          <SvgGoodFill className="size-[1.8rem]" />
        ) : (
          <SvgGoodOutline className="size-[1.8rem]" />
        )}
        <span className="text-en-body1">123</span>
      </ReactionToggle>
    );
  },
  args: {
    variant: 'horizontal',
  },
};
