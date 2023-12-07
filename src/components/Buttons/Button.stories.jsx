import React from "react";

import { Button } from "./Button";
import Colors from "../../stories/assets/Colors";

export default {
  title: "Common/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    customStyle: { control: "object" },
    iconCustomStyle: { control: "object" },
    icon: { control: "file" },
    disabledIcon: { control: "file" },
  },
};
