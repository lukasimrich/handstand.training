import * as React from "react";
import { PropertyControls, ControlType, Scroll } from "framer";

// Define type of property
interface Props {
  dataAvailable: React.ReactNode;
  emptyState: React.ReactNode;
}

export class ScrollHandstandsContainer extends React.Component<
  { width: number; height: number; isLoading: any },
  Props
> {
  static defaultProps = { direction: "vertical", overflow: "hidden" };
  static propertyControls: PropertyControls<Props> = {
    dataAvailable: {
      type: ControlType.ComponentInstance,
      title: "Data Available"
    },
    emptyState: {
      type: ControlType.ComponentInstance,
      title: "Empty State"
    }
  };

  // Overwrite the default "position: absolute"
  cloneElement = e =>
    React.cloneElement(e, {
      style: { position: "relative", transform: "translate(0,0)" }
    });

  render() {
    const { emptyState, dataAvailable, isLoading } = this.props;

    if (emptyState[0] && dataAvailable[0]) {
      return (
        <Scroll {...this.props}>
          {isLoading
            ? this.cloneElement(emptyState[0])
            : this.cloneElement(dataAvailable[0])}
        </Scroll>
      );
    } else {
      return <div>Connect Empty and Data Available State</div>;
    }
  }
}
