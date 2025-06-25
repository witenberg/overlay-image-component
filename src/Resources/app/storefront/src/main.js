// Register the component
import './component/my-overlay-image/index';

import MyOverlayImagePlugin from './component/my-overlay-image/my-overlay-image.plugin';

// Register your plugin
const PluginManager = window.PluginManager;
PluginManager.register('MyOverlayImagePlugin', MyOverlayImagePlugin, '[data-my-overlay-image-plugin]'); 