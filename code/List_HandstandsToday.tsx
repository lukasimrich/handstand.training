import * as React from "react";
import { PropertyControls, ControlType, Stack } from "framer";
import * as Canvas from "./canvas";
import { List_Item } from "./canvas";

import { dateWithFullMonthName, convertMsToSecToString } from "./Helpers";

let componentList = [];
for (var key in Canvas) {
  if (!key.endsWith("__") && key.includes("List")) {
    componentList.push(key);
  }
}

type Props = { data: any; component: any };

export class List_HandstandsToday extends React.Component<
  { width: number; height: number; data: any },
  Props
> {
  static defaultProps = {
    ...Stack.defaultProps,
    component: componentList[0],
    data: []
  };
  static propertyControls: PropertyControls = {
    component: {
      type: ControlType.Enum,
      title: "Component",
      options: componentList
    },
    ...Stack.propertyControls
  };
  render() {
    const orderedAttemptsReverse = [...this.props.data].reverse();
    let activeComponent = Canvas[this.props.component];
    let result = [];

    orderedAttemptsReverse.map(attempt => {
      let date = new Date(attempt.date);
      let propData = {
        duration: convertMsToSecToString(attempt.duration),
        date: dateWithFullMonthName(
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes()
        ),
        key: attempt.key
      };
      result.push(React.createElement(activeComponent, propData));
    });

    return (
      <Stack
        {...this.props}
        borderStyle="solid"
        borderColor="rgba(33, 33, 33, 0.1)"
        radius="0 0 4px 4px"
        borderWidth={{ top: 0, bottom: 1, left: 1, right: 1 }}
        height={(this.props.data.length + 1) * 48 - 48}
      >
        {result}
      </Stack>
    );
  }
}
