import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

const meta = {
  title: "thienguyen-ui/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom"],
      description: "Position of the tooltip relative to the trigger",
    },
    offset: {
      control: "number",
      description: "Distance between tooltip and trigger",
    },
    content: {
      control: "text",
      description: "Content of the tooltip",
    },
    trigger: {
      control: "select",
      options: ["hover", "click"],
      description: "How the tooltip is triggered",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a default tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    content: "Click to show tooltip",
    trigger: "click",
    children: <Button>Click me</Button>,
  },
};

export const BottomPlacement: Story = {
  args: {
    content: "Tooltip appears below",
    placement: "bottom",
    children: <Button>Hover me</Button>,
  },
};

export const CustomOffset: Story = {
  args: {
    content: "Tooltip with larger offset",
    offset: 16,
    children: <Button>Hover me</Button>,
  },
};

export const WithCustomContent: Story = {
  args: {
    content: (
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Tooltip with icon</span>
      </div>
    ),
    children: <Button>Hover me</Button>,
  },
};

export const WithCustomTrigger: Story = {
  args: {
    content: "Tooltip with custom trigger",
    children: (
      <div className="p-2 border border-gray-300 rounded cursor-help">
        Hover me
      </div>
    ),
  },
};
