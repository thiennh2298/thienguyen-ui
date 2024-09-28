import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Editor } from "./Editor";

export default {
  title: "thienguyen-ui/Editor",
  component: Editor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

// Template for stories
const Template: StoryFn<typeof Editor> = (args: any) => {
  return <Editor {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
