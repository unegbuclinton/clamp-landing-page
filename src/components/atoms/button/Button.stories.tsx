import { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button text="Primary Button" type="button" />,
};

export const Secondary: Story = {
  render: () => <Button outline text="Secondary Button" type="button" />,
};
