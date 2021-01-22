import React, { Component } from 'react';
import ModelViewer from '@google/model-viewer';
import {
  getCurrentCanvas,getManifestTitle, getManifestoInstance, getVisibleCanvasAudioResources, getVisibleCanvasVideoResources, getWindow,getManifestStatus
} from 'mirador/dist/es/src/state/selectors';

import MiradorModelViewer from './MiradorModelViewer'

const mapStateToProps = (state, { canvasId,windowId }) => {
  const manifestoInstance = getManifestoInstance(state, { windowId });
  return {
    audioResources: getVisibleCanvasAudioResources(state, { windowId }) || [],
    isCollection: manifestoInstance && manifestoInstance.isCollection(),
    isCollectionDialogVisible: getWindow(state, { windowId }).collectionDialogOn,
    videoResources: getVisibleCanvasVideoResources(state, { windowId }) || [],
    isFetching:getManifestStatus(state, { windowId }).isFetching,
    title: getManifestTitle(state, { canvasId, windowId }),
    canvas: getCurrentCanvas(state, { canvasId, windowId })
  };
};

export default {
  target: 'WindowViewer',
  mode: 'wrap',
  component: MiradorModelViewer,
  mapStateToProps: mapStateToProps
}
