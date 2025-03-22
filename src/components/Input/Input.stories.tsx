import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "thienguyen-ui/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["outline", "filled"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="filled" placeholder="Filled variant" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="Normal state" />
      <Input error placeholder="Error state" />
      <Input disabled placeholder="Disabled state" />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: "Full width input",
  },
};

export const WithValue: Story = {
  args: {
    value: "Input with value",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <label htmlFor="input-with-label" className="text-sm font-medium">
        Label
      </label>
      <Input id="input-with-label" placeholder="Input with label" />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Input error placeholder="Input with helper text" />
      <span className="text-sm text-red-500">This field is required</span>
    </div>
  ),
};

export const SearchInput: Story = {
  render: () => (
    <div className="relative">
      <Input placeholder="Search..." className="pl-8" />
      <svg
        className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  ),
};
