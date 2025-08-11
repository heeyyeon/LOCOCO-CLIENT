import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크박스의 체크 상태',
    },
    disabled: {
      control: 'boolean',
      description: '체크박스 비활성화 여부',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

// 기본 체크박스 (체크되지 않은 상태)
export const Default: Story = {
  args: {
    checked: false,
  },
};

// 체크된 상태
export const Checked: Story = {
  args: {
    checked: true,
  },
};

// 비활성화된 상태 (체크되지 않음)
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

// 비활성화된 상태 (체크됨)
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

// 커스텀 스타일이 적용된 체크박스
export const CustomStyle: Story = {
  args: {
    checked: false,
    className: 'border-blue-500 data-[state=checked]:bg-blue-500',
  },
};

// 큰 사이즈 체크박스
export const Large: Story = {
  args: {
    checked: false,
    className: 'size-8',
  },
};

// 작은 사이즈 체크박스
export const Small: Story = {
  args: {
    checked: false,
    className: 'size-4',
  },
};

// 라벨이 있는 체크박스
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        이용약관에 동의합니다
      </label>
    </div>
  ),
  args: {
    checked: false,
  },
};

// 체크박스 그룹 (다중 선택)
export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" />
        <label htmlFor="option1" className="text-sm font-medium leading-none">
          옵션 1
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" checked />
        <label htmlFor="option2" className="text-sm font-medium leading-none">
          옵션 2
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" disabled />
        <label
          htmlFor="option3"
          className="text-sm font-medium leading-none text-gray-500"
        >
          옵션 3 (비활성화)
        </label>
      </div>
    </div>
  ),
};

// 폼에서 사용되는 체크박스
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">회원가입</h3>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <label htmlFor="terms" className="text-sm font-medium leading-none">
            이용약관에 동의합니다 <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="privacy" required />
          <label htmlFor="privacy" className="text-sm font-medium leading-none">
            개인정보 처리방침에 동의합니다{' '}
            <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" />
          <label
            htmlFor="marketing"
            className="text-sm font-medium leading-none"
          >
            마케팅 정보 수신에 동의합니다
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        가입하기
      </button>
    </form>
  ),
};
