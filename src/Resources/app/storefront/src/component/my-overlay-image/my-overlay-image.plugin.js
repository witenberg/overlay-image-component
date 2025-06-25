import Plugin from 'src/plugin-system/plugin.class';

export default class MyOverlayImagePlugin extends Plugin {
    static options = {
        overlaySelector: '.cms-element-my-overlay-image__overlay',
        imageSelector: '.cms-element-my-overlay-image__image'
    };

    init() {
        this._initializeOverlay();
        this._registerEvents();
    }

    _initializeOverlay() {
        this.overlay = this.el.querySelector(this.options.overlaySelector);
        this.image = this.el.querySelector(this.options.imageSelector);
    }

    _registerEvents() {
        if (this.image) {
            this.image.addEventListener('load', this._onImageLoad.bind(this));
        }
    }

    _onImageLoad() {
        this.el.classList.add('image-loaded');
    }
} 