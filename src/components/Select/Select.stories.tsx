import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" },
];

const meta = {
  title: "thienguyen-ui/Select",
  component: Select,
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    placeholder: "Select an option",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select options={options} size="sm" placeholder="Small select" />
      <Select options={options} size="md" placeholder="Medium select" />
      <Select options={options} size="lg" placeholder="Large select" />
    </div>
  ),
  args: {
    options,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        options={options}
        variant="outline"
        placeholder="Outline variant"
      />
      <Select options={options} variant="filled" placeholder="Filled variant" />
    </div>
  ),
  args: {
    options,
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select options={options} placeholder="Normal state" />
      <Select options={options} error placeholder="Error state" />
      <Select options={options} disabled placeholder="Disabled state" />
    </div>
  ),
  args: {
    options,
  },
};

export const FullWidth: Story = {
  args: {
    options,
    fullWidth: true,
    placeholder: "Full width select",
  },
};

export const WithValue: Story = {
  args: {
    options,
    value: "2",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <label htmlFor="select-with-label" className="text-sm font-medium">
        Label
      </label>
      <Select options={options} placeholder="Select with label" />
    </div>
  ),
  args: {
    options,
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Select options={options} error placeholder="Select with helper text" />
      <span className="text-sm text-red-500">Please select an option</span>
    </div>
  ),
  args: {
    options,
  },
};

export const CustomOptions: Story = {
  args: {
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ],
    placeholder: "Select a framework",
  },
};
