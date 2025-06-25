import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'my-overlay-image',
    label: 'my-overlay-image.block.label',
    category: 'image',
    component: 'sw-cms-block-my-overlay-image',
    previewComponent: 'sw-cms-preview-my-overlay-image',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    // To jest KLUCZOWY fragment, który łączy blok z elementem.
    slots: {
        content: {
            type: 'my-overlay-image',
            default: {
                config: {},
                data: {}
            }
        }
    }
});