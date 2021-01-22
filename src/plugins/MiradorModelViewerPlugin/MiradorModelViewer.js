import React, { Component, lazy, Suspense } from 'react';
import ModelViewer from '@google/model-viewer';
import flattenDeep from 'lodash/flattenDeep';
import flatten from 'lodash/flatten';

const AudioViewer = lazy(() => import('mirador/dist/es/src/containers/AudioViewer'));
const GalleryView = lazy(() => import('mirador/dist/es/src/containers/GalleryView'));
const SelectCollection = lazy(() => import('mirador/dist/es/src/containers/SelectCollection'));
const WindowViewer = lazy(() => import('mirador/dist/es/src/containers/WindowViewer'));
const VideoViewer = lazy(() => import('mirador/dist/es/src/containers/VideoViewer'));


class MiradorModelViewer extends Component {

  get3DResources(canvas) {
    if (canvas != undefined) {
      const resources = flattenDeep([
        canvas.getContent().map(i => i.getBody()),
      ]);
      return flatten(resources.filter((resource) => resource.getProperty('type') === 'Model'));
    }
    else {
      return [];
    }
  }

  renderViewer(){
    
    const {
      audioResources, isCollection,
      isFetching, videoResources, view, windowId,
    } = this.props;

    const models = this.get3DResources(this.props.canvas);
    console.log(this.props);
    if (isCollection) {
      return (
        <>
          <SelectCollection
            windowId={windowId}
          />
        </>
      );
    }
    if (isFetching === false) {
      if (view === 'gallery') {
        return (
          <GalleryView
            windowId={windowId}
          />
        );
      }
      if (videoResources.length > 0) {
        return (
          <VideoViewer
            windowId={windowId}
          />
        );
      }
      if (audioResources.length > 0) {
        return (
          <AudioViewer
            windowId={windowId}
          />
        );
      }

      if (models.length > 0) {
        const styles = {
          width: "100%",
          height: "100%",
          background: "black"
        };

        return (
          <model-viewer
            style={{ background: styles.background, width: styles.width, height: styles.height }}
            src={models[0].id}
            alt={this.props.title}
            auto-rotate camera-controls>
          </model-viewer>
        );
      }

      
      return (
        
        <WindowViewer
          windowId={windowId}
        />
      );
    }

    else {
      return null;
    }

  }

  render() {
    return(
      <Suspense fallback={<div />}>
          {this.renderViewer()}
        </Suspense>
  )
  }
}
export default (MiradorModelViewer);