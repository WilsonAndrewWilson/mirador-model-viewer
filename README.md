# mirador-model-viewer

- [About](#about)
- [Running Mirador with mirador-model-viewer locally](#running-mirador-with-mirador-model-viewer-locally)
- [Incorporating mirador-model-viewer with your existing Mirador instance](#incorporating-mirador-model-viewer-with-your-existing-mirador-instance)
- [Model Viewer options](#model-viewer-options)
- [3D object support](#3d-object-support)
- [Example manifests](#example-manifests)
- [Live demo](#live-demo)
- [Where else can I use my 3D Manifests?](#where-else-can-i-use-my-3d-manifests)

![screenshot](https://i.imgur.com/t0PxMpV.jpeg)

## About
Incorporating [Google Model Viewer](https://model-viewer.dev) into Mirador for viewing manifests that include 3D objects. Only formats supported by model-viewer will work with this plugin (GLTF, or their binary equivalent : GLB. See the [3D object support section](#3d-object-support).

The IIIF spec is not yet formalised for 3D objects, so this plugin reads manifests that have been commonly adopted for displaying GLTF/GLB models.  See the [manifest examples](#example-manifests) below for the supported manifest format.  It is hoped that once the 3D specification is finalised, Mirador will incorporate it into it's core and this plugin can be retired :-).

PRs welcome - this is very much early in development.

## Running Mirador with mirador-model-viewer locally
This repo includes mirador and mirador-image-tools and can be compiled using webpack. It's not recommended to deploy this in a production environment but instead integrate the plugin into your existing Mirador build.
1. Ensure you have Node and NPM installed.
2. Clone this repo (or download/extract as zip if you wish)
3. Navigate to the directory
4. Run `npm-install`
5. Run `npm-start`
6. Edit the `index.html` to change config options or manifests

If you do want to deploy this whole package (not recommended):
1. Edit `webpack.config.js` and change the `publicPath` option to the location you will be deploying the JS.
2. Edit `mirador-config.js` to set your mirador options. See [Mirador Wiki](https://github.com/ProjectMirador/mirador/wiki) for more.
2. Run `npm-install`
3. Run `npm build`
4. Copy the contents of the `dist` directory to the location you defined in 1.
5. Include Mirador in your site - see the included `index.html` for an example.


## Incorporating mirador-model-viewer with your existing Mirador instance
Once the plugin has been tested more, the package may end up in NPM making this easier, but for the time being, to include the plugin with your Mirador build:
1. Clone this repo (or download/extract as zip if you wish)
2. Ensure you have `@google/model-viewer` added to your dependencies in your Mirador's `package.json`. Version `1.2.1` is known to work.
3. Copy `MiradorModelViewerPlugin` directory to your `src\plugins` directory(create `plugins` if it doesn't exist yet)
4. In Mirador's `index.js`, import the plugin and add to your array of plugins passed to Mirador:
    ````    
    import Mirador from 'mirador/dist/es/src/index';
    import MiradorModelViewerPlugin from './plugins/MiradorModelViewerPlugin/index.js';
    import config from './mirador-config';
    const plugins = [MiradorModelViewerPlugin];

    Mirador.viewer(config, plugins);

    ````
5. Build/compile your Mirador instance using whatever build tool you usually use (Webpack, gulp grunt,make, etc)
6. Set any options you want to set for the plugin in the initialisation file for Mirador.

## Model Viewer options
There are a few options you can set when you initialise Mirador. These are optional and will default to Model Viewer defaults if not set. These are set at the Window-level in your Mirador instance and can be set as default window options in your general config, or "per-window" when initalising.
| Option | Description | Default
| ----------- | ----------- | -----------
| modelViewerBackground | The background colour, any standard css colour value is accepted (rgb,#,text etc) | #000000
| modelViewerProgressHeight | The height,in pixels, of the loading progress bar. Ensure "px" is added to the value. | 5px
| modelViewerProgressColor | The color of the progress bar, any standard css colour value is accepted (rgb,#,text etc)  | rgba(0, 0, 0, 0.4)
| modelViewerAutoRotate | Whether the object automatically rotates when you are not interacting with it  | false

### Example of default options when set in your mirador config

````
export default {
    id: 'mirador',
       displayAllAnnotations: false,
       window: {
          sideBarOpenByDefault: sidebar,
          imageToolsEnabled: true,
          imageToolsOpen: false,
          modelViewerBackground :"#000000", 
          modelViewerProgressHeight:"5px",
          modelViewerProgressColor:"#fc03be",
          modelViewerAutoRotate:true,   
       },
  windows: wins,
  catalog: mans
  };

````

### Example of "per window" options when set at initialisation
````
<script type="text/javascript">
      var sidebar=true;
      var wins=[
              {imageToolsOpen: false,
                modelViewerBackground :"#000000", 
                modelViewerProgressHeight:"10px",
                modelViewerProgressColor:"red",
                modelViewerAutoRotate:false,
                manifestId: "https://collections.st-andrews.ac.uk/1001108/manifest"}      
             ];
             
             var mans=[  
              {manifestId: "  https://preview.iiif.io/cookbook/master/recipe/0003-mvm-video/manifest.json", provider: "Video"},           
              {manifestId: "https://collections.st-andrews.ac.uk/1001108/manifest", provider: "3D item"},
              {manifestId: "https://collections.st-andrews.ac.uk/762345/manifest", provider: "3D item"},
              {manifestId: "https://collections.st-andrews.ac.uk/38099/manifest", provider: "Image"}
             ];
          </script>
````

## 3D Object support
Model Viewer accepts any GLTF or Binary GLTF (GLB) file.   It is recommended to use GLB otherwise you need to ensure that all the assets(texture,model etc) are in the same directory of the GLTF file which can be tricky if using a CMS/AMS to deliver content.
It is recommended that the objects are around 10MB maximum for loading.  There are some tools that can help converting and reducing the objects:

[Obj2Gltf](https://github.com/CesiumGS/obj2gltf) for converting OBJ files/assets to GLTF/GLB.  It is recommended to use the `--unlit` parameter when converting. To convert directly to GLB, use the `-b` parameter.

[Gltf pipeline](https://github.com/CesiumGS/gltf-pipeline) for reducing the file size by using Draco compression if your object is still over 10MB.  Using this tool will require some experimentation with the draco compression parameters to avoid too much quality reduction.  These settings have been known to make a good compromise :
````
gltf-pipeline -i input.glb -o output.glb -d -b --draco.compressionLevel 1 --draco.quantizePositionBits 20 --draco.quantizeNormalBits 15 --draco.quantizeTexcoordBits 20 --draco.quantizeColorBits 15 --draco.quantizeGenericBits 20
````
(Thanks to [Ed Silverton](https://github.com/edsilv) for guidance with conversions. )

## Example manifests
- [https://collections.st-andrews.ac.uk/761844/manifest](https://collections.st-andrews.ac.uk/761844/manifest)
- [https://collections.st-andrews.ac.uk/1001108/manifest](https://collections.st-andrews.ac.uk/1001108/manifest)
- [https://collections.st-andrews.ac.uk/762339/manifest](https://collections.st-andrews.ac.uk/762339/manifest)
- [https://collections.st-andrews.ac.uk/762345/manifest](https://collections.st-andrews.ac.uk/762345/manifest)
- [https://iiif-3d-manifests.netlify.app/collection/gltf/flight-helmet/index.json](https://iiif-3d-manifests.netlify.app/collection/gltf/flight-helmet/index.json)
- [https://bl-3d.netlify.app/collection/jane-austen-writing-desk/index.json](https://bl-3d.netlify.app/collection/jane-austen-writing-desk/index.json)

## Live demo

- [Single 3D object](https://collections.st-andrews.ac.uk/workspace/individual/1001108)
- [Multiple types of objects](https://collections.st-andrews.ac.uk/workspace/selection/17330830)


## Where else can I use my 3D Manifests?
Glad you asked! [Exhibit](https://exhibit.so) is a IIIF Storytelling tool where you can import your 3D manifests, pan, zoom , and add annotations to tell compelling stories about your objects. Give it a bash!
