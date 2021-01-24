import React, { Component } from 'react';
import ModelViewer from '@google/model-viewer';
import {
  getCurrentCanvas, getManifestoInstance,
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
  const manifestoInstance = getManifestoInstance(state, { windowId });
  const canvas = getCurrentCanvas(state, { canvasId, windowId });
  return {
    threeDResources: threeDResources(canvas),
  };
};

export default {
  target: 'WindowViewer',
  mode: 'wrap',
  component: MiradorModelViewer,
  mapStateToProps: mapStateToProps
}
