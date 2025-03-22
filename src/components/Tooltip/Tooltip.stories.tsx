import { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";
import { ReactNode } from "react";

const meta = {
  title: "thienguyen-ui/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    triggerComponent: {
      description: "Element that triggers the tooltip",
      type: { name: "other", value: "ReactNode", required: true },
      control: "select",
      options: ["Default Button", "Text Only", "Icon Button", "Custom Element"],
      mapping: {
        "Default Button": <Button>Hover me</Button>,
        "Text Only": "Hover this text",
        "Icon Button": (
          <Button>
            <span>🔍 Info</span>
          </Button>
        ),
        "Custom Element": (
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-help">
            ?
          </div>
        ),
      },
      table: {
        type: {
          summary: "ReactNode",
          detail: `type ReactNode = string | number | boolean | null | undefined | ReactElement | ReactFragment | ReactPortal | Iterable<ReactNode>`,
        },
      },
    },
    content: {
      description: "Content to be displayed in the tooltip",
      control: "select",
      options: ["Simple Text", "Rich Content", "List Content", "Mixed Content"],
      mapping: {
        "Simple Text": "This is a simple tooltip",
        "Rich Content": (
          <div className="flex flex-col gap-2 p-1">
            <strong>Rich Content</strong>
            <p>With formatting</p>
          </div>
        ),
        "List Content": (
          <ul className="list-disc list-inside">
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        ),
        "Mixed Content": (
          <>
            <h3 className="font-bold">Mixed Content</h3>
            <p>With {42} number</p>
          </>
        ),
      },
    },
    placement: {
      description: "Position of the tooltip relative to the trigger element",
      control: "select",
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "topLeft",
        "topRight",
        "bottomLeft",
        "bottomRight",
      ],
    },
    delay: {
      description: "Delay before showing/hiding the tooltip (in milliseconds)",
      control: "number",
    },
    offset: {
      description: "Distance between tooltip and trigger element (in pixels)",
      control: "number",
    },
    showArrow: {
      description: "Whether to show the arrow pointing to the trigger element",
      control: "boolean",
    },
    interactive: {
      description: "Whether the tooltip can be interacted with",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base default props
const defaultProps = {
  triggerComponent: <Button>Hover me</Button>,
  content: "This is a tooltip",
  placement: "top",
  delay: 200,
  offset: 8,
  showArrow: true,
  interactive: true,
} as const;

// Default story
export const Default: Story = {
  args: defaultProps,
};

// Placement variants
export const TopPlacement: Story = {
  args: {
    ...defaultProps,
    placement: "top",
    content: "Tooltip on top",
  },
};

export const BottomPlacement: Story = {
  args: {
    ...defaultProps,
    placement: "bottom",
    content: "Tooltip on bottom",
  },
};

export const LeftPlacement: Story = {
  args: {
    ...defaultProps,
    placement: "left",
    content: "Tooltip on left",
  },
};

export const RightPlacement: Story = {
  args: {
    ...defaultProps,
    placement: "right",
    content: "Tooltip on right",
  },
};

export const TopLeftPlacement: Story = {
  args: {
    ...defaultProps,
    placement: "topLeft",
    content: "Tooltip on top left",
  },
};

export const TopRightPlacement: Story = {
  args: {
    ...defaultProps,
    placement: "topRight",
    content: "Tooltip on top right",
  },
};

export const BottomLeftPlacement: Story = {
  args: {
    ...defaultProps,
    placement: "bottomLeft",
    content: "Tooltip on bottom left",
  },
};

export const BottomRightPlacement: Story = {
  args: {
    ...defaultProps,
    placement: "bottomRight",
    content: "Tooltip on bottom right",
  },
};

// Content variants
export const WithLongContent: Story = {
  args: {
    ...defaultProps,
    content:
      "This is a tooltip with very long content that might wrap to multiple lines. It demonstrates how the tooltip handles longer text content and maintains proper positioning.",
  },
};

export const WithHTMLContent: Story = {
  args: {
    ...defaultProps,
    content: (
      <div className="flex flex-col gap-2 p-1">
        <strong>Rich HTML Content</strong>
        <p className="text-sm">This tooltip contains formatted content with:</p>
        <ul className="list-disc list-inside text-sm">
          <li>Multiple lines</li>
          <li>Formatted text</li>
          <li>Lists and other HTML elements</li>
        </ul>
      </div>
    ),
  },
};

// Style variants
export const CustomStyling: Story = {
  args: {
    ...defaultProps,
    className: "bg-blue-900 text-white font-medium px-4 py-2 rounded-lg",
    content: "Custom styled tooltip",
  },
};

export const WithoutArrow: Story = {
  args: {
    ...defaultProps,
    showArrow: false,
    content: "Tooltip without arrow",
  },
};

// Behavior variants
export const NonInteractive: Story = {
  args: {
    ...defaultProps,
    interactive: false,
    content: "Non-interactive tooltip (will hide when you try to hover on it)",
  },
};

export const LongDelay: Story = {
  args: {
    ...defaultProps,
    delay: 1000,
    content: "Tooltip with 1 second delay",
  },
};

export const LargeOffset: Story = {
  args: {
    ...defaultProps,
    offset: 20,
    content: "Tooltip with larger offset from trigger",
  },
};

// Custom trigger variants
export const CustomTrigger: Story = {
  args: {
    ...defaultProps,
    triggerComponent: (
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-help">
        ?
      </div>
    ),
    content: "Tooltip with custom trigger element",
  },
};

// ReactNode Examples
export const StringTrigger: Story = {
  args: {
    ...defaultProps,
    triggerComponent: "Hover this text",
    content: "Tooltip triggered by a string",
  },
};

export const NumberTrigger: Story = {
  args: {
    ...defaultProps,
    triggerComponent: 42,
    content: "Tooltip triggered by a number",
  },
};

export const FragmentTrigger: Story = {
  args: {
    ...defaultProps,
    triggerComponent: (
      <>
        <span>Hover</span>
        <span className="ml-1">me</span>
      </>
    ),
    content: "Tooltip triggered by a Fragment",
  },
};

export const ComplexTrigger: Story = {
  args: {
    ...defaultProps,
    triggerComponent: (
      <div className="flex items-center gap-2 bg-blue-100 p-2 rounded">
        <span>🔍</span>
        <span>Hover for info</span>
      </div>
    ),
    content: (
      <div className="flex flex-col gap-2">
        <strong>Complex Trigger Example</strong>
        <p>Shows how to use complex JSX as trigger</p>
      </div>
    ),
  },
};

export const MixedContent: Story = {
  args: {
    ...defaultProps,
    triggerComponent: <Button>Mixed Content</Button>,
    content: (
      <>
        <h3 className="font-bold mb-2">Mixed Content Example</h3>
        <p className="text-sm">Text mixed with elements:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Item 1</li>
          <li>Item 2 {/* Comment */}</li>
          <li>Item {3}</li>
        </ul>
        Plain text here
        {42}
        <Button className="mt-2">A button</Button>
      </>
    ),
  },
};
