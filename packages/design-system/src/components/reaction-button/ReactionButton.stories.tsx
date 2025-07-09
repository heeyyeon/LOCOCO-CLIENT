import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SvgGoodFill } from '../../icons/fill/components/GoodFill';
import { SvgGoodOutline } from '../../icons/fill/components/GoodOutline';
import { SvgLikeFill } from '../../icons/fill/components/LikeFill';
import { SvgLikeOutline } from '../../icons/fill/components/LikeOutline';
import ReactionButton from './ReactionButton';

const meta: Meta<typeof ReactionButton> = {
  title: 'components/ReactionButton',
  component: ReactionButton,
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

type Story = StoryObj<typeof ReactionButton>;

export const Vertical: Story = {
  render: (args) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
      <div className="bg-black p-5 text-white">
        <ReactionButton
          pressed={isPressed}
          onPressedChange={setIsPressed}
          {...args}
        >
          {isPressed ? (
            <SvgLikeFill className="size-[2.4rem]" />
          ) : (
            <SvgLikeOutline className="size-[2.4rem]" />
          )}
          <span className="text-en-caption1">123</span>
        </ReactionButton>
      </div>
    );
  },
  args: {
    variant: 'vertical',
  },
};

export const Horizontal: Story = {
  render: (args) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
      <ReactionButton
        pressed={isPressed}
        onPressedChange={setIsPressed}
        className="text-en-body1"
        {...args}
      >
        {isPressed ? (
          <SvgGoodFill className="size-[1.8rem]" />
        ) : (
          <SvgGoodOutline className="size-[1.8rem]" />
        )}
        <span className="text-en-body1">123</span>
      </ReactionButton>
    );
  },
  args: {
    variant: 'horizontal',
  },
};
