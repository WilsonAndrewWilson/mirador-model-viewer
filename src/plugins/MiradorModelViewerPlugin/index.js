import React, { Component } from 'react';
import ModelViewer from '@google/model-viewer';
import {
  getCurrentCanvas, getManifestTitle,getWindowConfig
} from 'mirador/dist/es/src/state/selectors';
import flattenDeep from 'lodash/flattenDeep';
import flatten from 'lodash/flatten';

import MiradorModelViewer from './MiradorModelViewer'

// Define this like a selector so that this content can be passed directly into the component as a prop
function threeDResources(canvas) {
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

// Only add the necessary additional mapStateToProps
  const mapStateToProps = (state, { canvasId, windowId }) => {
  const canvas = getCurrentCanvas(state, { canvasId, windowId });
  return {
    threeDResources: threeDResources(canvas),
    title: getManifestTitle(state, { canvasId, windowId }),
    background: getWindowConfig(state, { windowId }).modelViewerBackground || "#000000",
    progressBarHeight: getWindowConfig(state, { windowId }).modelViewerProgressHeight || "5px",
    progressBarColor: getWindowConfig(state, { windowId }).modelViewerProgressColor || "rgba(0, 0, 0, 0.4)",
  };
};

export default {
  target: 'WindowViewer',
  mode: 'wrap',
  component: MiradorModelViewer,
  mapStateToProps: mapStateToProps
}
