import React, { Component, lazy, Suspense } from 'react';
import ModelViewer from '@google/model-viewer';

class MiradorModelViewer extends Component {
  render3DViewer(){
    const {
      threeDResources,
    } = this.props;

    const styles = {
      width: "100%",
      height: "100%",
      background: "black"
    };

    return (
      <model-viewer
        style={{ background: styles.background, width: styles.width, height: styles.height }}
        src={threeDResources[0].id}
        alt={this.props.title}
        auto-rotate camera-controls>
      </model-viewer>
    );
  }

  render() {
    const { TargetComponent, targetProps, threeDResources } = this.props;
    // Conditionally render new functionality when there is 3D content.
    if (threeDResources && threeDResources.length > 0) {
      return this.render3DViewer();
    } else {
      return (
        <TargetComponent {...targetProps} />
      )
    }
  }
}
export default MiradorModelViewer;
