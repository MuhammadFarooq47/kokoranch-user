import React from "react";
import { Input } from "./Input";

export default {
  title: "Common/Input",
  component: Input,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["email", "password"],
    },
    customStyle: { control: "object" },
  },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "email",
  placeholder:'Enter Email',
  state: "value",
  customStyle: {},
  disabled: false,
};

export const InputWithLabel = Template.bind({});
InputWithLabel.args = {
  disabled: false,
  type: "email",
  placeholder:'Enter Email',
  label: "label",
  noBorder: false,
};
export const DisabledInputWithLabel = Template.bind({});
DisabledInputWithLabel.args = {
  disabled: true,
  type: "email",
  state: "value",
  placeholder:'Enter Email',
  label: "label",
  noBorder: false,
};
export const ErrorInputWithLabel = Template.bind({});
ErrorInputWithLabel.args = {
  disabled: false,
  type: "email",
  label: "label",
  placeholder:'Enter Email',
  state: "value",
  noBorder: false,
  error: true,
  errorText: "An error has occurred, check your details!",
};

export const InputWithOutLabel = Template.bind({});
InputWithOutLabel.args = {
  disabled: false,
  type: "email",
  placeholder:'Enter Email',
  noBorder: false,
};

export const InputWithOutLabelDisable = Template.bind({});
InputWithOutLabelDisable.args = {
  disabled: true,
  type: "email",
  state: "value",
  placeholder:'Enter Email',
  noBorder: false,
};
export const ErrorInputWithOutLabel = Template.bind({});
ErrorInputWithOutLabel.args = {
  disabled: false,
  type: "email",
  noBorder: false,
  state: "value",
  error: true,
  placeholder:'Enter Email',
  errorText: "An error has occurred, check your details!",
};
