import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./";
import { Button } from "../Button";

const meta = {
  title: "thienguyen-ui/Popover",
  component: Popover,
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
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Click me</Button>
      </PopoverTrigger>
      <PopoverContent>This is a simple popover content</PopoverContent>
    </Popover>
  ),
  args: {
    placement: "bottom",
    offset: 8,
  },
};

export const WithTitle: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Notification Settings</Button>
      </PopoverTrigger>
      <PopoverContent title="Notification Settings">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span>Email notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Push notifications</span>
            <input type="checkbox" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Confirm Action</Button>
      </PopoverTrigger>
      <PopoverContent
        title="Confirm Action"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary">Confirm</Button>
          </div>
        }
      >
        Are you sure you want to delete this item?
      </PopoverContent>
    </Popover>
  ),
};

export const TopPlacement: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Top Placement</Button>
      </PopoverTrigger>
      <PopoverContent>This popover appears on top</PopoverContent>
    </Popover>
  ),
  args: {
    placement: "top",
  },
};

// Placement examples
export const Placements: Story = {
  decorators: [
    (Story) => (
      <div
        className="grid grid-cols-1 gap-8 p-4 place-items-center"
        style={{ width: "300px", height: "300px" }}
      >
        <Story args={{ placement: "top" }} />
        <Story args={{ placement: "bottom" }} />
      </div>
    ),
  ],
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button variant="outline">Placement</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="text-sm">
          Current placement:{" "}
          <span className="font-semibold">{args.placement}</span>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Content variations
export const WithHeaderFooter: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>With Header & Footer</Button>
      </PopoverTrigger>
      <PopoverContent
        title="Notification Settings"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button variant="secondary">Save Changes</Button>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Email notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Push notifications</span>
            <input type="checkbox" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const RichContent: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>View Details</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-[280px] space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              className="rounded-full"
            />
            <div>
              <h3 className="font-medium">Product Update</h3>
              <p className="text-sm text-gray-500">New features available</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                />
              </svg>
              <span>Improved performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                />
              </svg>
              <span>New API endpoints</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Interactive example
export const InteractiveForm: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Contact Us</Button>
      </PopoverTrigger>
      <PopoverContent
        title="Send Message"
        footer={
          <div className="flex justify-end">
            <Button variant="secondary">Send Message</Button>
          </div>
        }
      >
        <form className="w-[300px] space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              placeholder="Type your message..."
            />
          </div>
        </form>
      </PopoverContent>
    </Popover>
  ),
};

// Custom styling
export const CustomStyle: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full hover:opacity-90">
          Custom Theme
        </button>
      </PopoverTrigger>
      <PopoverContent className="!bg-gradient-to-r !from-violet-500 !to-fuchsia-500 !text-white !border-0">
        <div className="p-2">
          <h3 className="font-medium mb-2">Custom Themed Popover</h3>
          <p className="text-sm">With gradient background and custom styling</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  args: {
    placement: "top",
  },
};
