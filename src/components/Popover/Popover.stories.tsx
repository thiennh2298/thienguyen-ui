import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./Popover";
import { PopoverTrigger } from "./PopoverTrigger";
import { PopoverContent } from "./PopoverContent";
import { Button } from "../Button";

const meta = {
  title: "thienguyen-ui/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom"],
    },
    offset: {
      control: "number",
    },
    defaultOpen: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placement: "top",
    trigger: "click",
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Click me</Button>
      </PopoverTrigger>
      <PopoverContent title="Popover Title">
        <p>This is a simple popover content.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithDefaultOpen: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Default Open</Button>
      </PopoverTrigger>
      <PopoverContent title="Default Open">
        <p>This popover is open by default.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const TopPlacement: Story = {
  args: {
    placement: "top",
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Top Placement</Button>
      </PopoverTrigger>
      <PopoverContent title="Top Placement">
        <p>This popover appears above the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const CustomOffset: Story = {
  args: {
    offset: 20,
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Custom Offset</Button>
      </PopoverTrigger>
      <PopoverContent title="Custom Offset">
        <p>This popover has a larger offset from the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithoutTitle: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>No Title</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>This popover doesn't have a title.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithoutArrow: Story = {
  args: {
    showArrow: false,
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Without Arrow</Button>
      </PopoverTrigger>
      <PopoverContent title="Custom Trigger">
        <p>This popover without arrow.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const HoverTrigger: Story = {
  args: {
    trigger: "hover",
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <div className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 cursor-pointer">
          Custom Trigger Element
        </div>
      </PopoverTrigger>
      <PopoverContent title="Custom Trigger">
        <p>This popover uses a custom trigger element.</p>
      </PopoverContent>
    </Popover>
  ),
};
