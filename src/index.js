import Mirador from 'mirador/dist/es/src/index';
import MiradorModelViewerPlugin from './plugins/MiradorModelViewerPlugin/index.js';
import config from './mirador-config';
import { miradorImageToolsPlugin } from 'mirador-image-tools';

const plugins = [miradorImageToolsPlugin,MiradorModelViewerPlugin];

Mirador.viewer(config, plugins);
