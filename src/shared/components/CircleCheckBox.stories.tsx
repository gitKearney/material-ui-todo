import type { Meta, StoryObj } from '@storybook/react';

import CircleCheckBox from './CircleCheckBox';

const meta = {
  component: CircleCheckBox,
} satisfies Meta<typeof CircleCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};