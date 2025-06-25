// MyOverlayImagePlugin/src/Resources/app/administration/src/module/sw-cms/elements/my-overlay-image/index.js

// 1. Importy definicji komponentów Vue
import './component';
import './config';
import './preview';

// 2. Rejestracja elementu CMS
Shopware.Service('cmsService').registerCmsElement({
    name: 'my-overlay-image',
    label: 'My Overlay Image',
    component: 'sw-cms-el-my-overlay-image',
    configComponent: 'sw-cms-el-config-my-overlay-image',
    previewComponent: 'sw-cms-el-preview-my-overlay-image',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            required: true
        },
        overlayPosition: {
            source: 'static',
            value: 'center'
        },
        overlayText: {
            source: 'static',
            value: ''
        },
        buttonText: {
            source: 'static',
            value: 'Przejdź do kategorii'
        },
        category: {
            source: 'static',
            value: null
        }
    },
    // collect: function(element) {
    //     return {
    //         media: element.config.media.value
    //     };
    // }
});