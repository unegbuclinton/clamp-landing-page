import { Meta, StoryObj } from "@storybook/react";
import InfoCard from ".";

const meta: Meta<typeof InfoCard> = {
  title: "InfoCard",
  component: InfoCard,
};

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const SimpleCard: Story = {
  render: () => (
    <InfoCard
      label="Simple Card"
      description="Created Card"
      subText="This is a simple card"
    />
  ),
};

export const CardWithLongText: Story = {
  render: () => (
    <InfoCard
      label="Card with long text"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur porro tenetur enim culpa repellendus. Illum, quae. Quaerat, ab reiciendis? Maxime iusto dolore quas sapiente pariatur!"
      subText="This is a simple card"
    />
  ),
};

export const CardWithMoreComponent: Story = {
  render: () => (
    <InfoCard
      label="Card with component"
      description="Created Card"
      subText="This is a simple card"
    >
      <div>
        <h1>I am a component</h1>
        <div className=" flex flex-col max-w-[50%]">
          <input type="text" />
          <button className="py-1 px-2 border-none mt-3 bg-sky-600 text-white rounded-md">
            I am in a card
          </button>
        </div>
      </div>
    </InfoCard>
  ),
};
