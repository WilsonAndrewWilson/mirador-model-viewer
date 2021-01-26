import React, { Component} from 'react';
import ModelViewer from '@google/model-viewer';

class MiradorModelViewer extends Component {
  render3DViewer(){
    const {
      threeDResources,
    } = this.props;

    const styles = {
      width: "100%",
      height: "100%",
      background: this.props.background,
    };
    
    //Model viewer uses css custom properties. This is to workaround using them "inline"
    const progressBarHeight={ "--progress-bar-height": this.props.progressBarHeight };
    const progressBarColor={ "--progress-bar-color": this.props.progressBarColor };
    console.log(this.props.autoRotate);
    return (
      <model-viewer
        style={{...styles,...progressBarHeight,...progressBarColor}}
        src={threeDResources[0].id}
        alt={this.props.title}    
        auto-rotate={this.props.autoRotate?true : undefined  }
        camera-controls>
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
