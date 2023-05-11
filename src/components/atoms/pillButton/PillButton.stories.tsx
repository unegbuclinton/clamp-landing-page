import { Meta, StoryObj } from "@storybook/react";
import PillButton from ".";
import { AiOutlineKey } from "react-icons/ai";
import { useState } from "react";

const meta: Meta<typeof PillButton> = {
  title: "PillButton",
  component: PillButton,
};

export default meta;

type Story = StoryObj<typeof PillButton>;

export const Primary: Story = {
  render: () => <PillButton text="Primary" icon={<AiOutlineKey />} />,
};

export const Secondary: Story = {
  render: () => <PillButton outline text="Secondary" icon={<AiOutlineKey />} />,
};

const ButtonWithHooks = () => {
  const [isPrimary, setIsPrimary] = useState(false);

  const handleOnChange = () => {
    setIsPrimary((prev) => !prev);
  };
  return (
    <PillButton outline={isPrimary} onClick={handleOnChange} text="Click Me" />
  );
};
export const WithHooks: Story = {
  render: () => <ButtonWithHooks />,
};
