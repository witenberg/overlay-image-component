// MyOverlayImagePlugin/src/Resources/app/administration/src/module/sw-cms/elements/my-overlay-image/component/index.js
import template from './sw-cms-el-my-overlay-image.html.twig'; // Ścieżka do szablonu HTML dla tego komponentu
import './sw-cms-el-my-overlay-image.scss'; // Ścieżka do stylów SCSS dla tego komponentu

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-my-overlay-image', {
    template, // Lub szablon inline: template: `<div>...</div>`,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    inject: ['repositoryFactory'],

    data() {
        return {
            mediaUrl: null
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },
        overlayPositionClass() {
            const position = this.element?.config?.overlayPosition?.value || 'center';
            return `overlay-position--${position}`;
        },
        overlayText() {
            return this.element?.config?.overlayText?.value || '';
        },
        buttonText() {
            return this.element?.config?.buttonText?.value || 'Przejdź do kategorii';
        },
        categoryId() {
            return this.element?.config?.category?.value;
        },
        buttonStyle() {
            return this.element?.config?.buttonStyle?.value || false;
        },
        buttonClass() {
            return this.buttonStyle ? 'my-overlay-image__button--dark' : 'my-overlay-image__button--light';
        },
        showOverlay() {
            return this.overlayText || this.categoryId;
        },
        elementStyles() {
            return {
                'position': 'relative'
            };
        }
    },

    watch: {
        'element.config.media.value': {
            handler(mediaId) {
                if (!mediaId) {
                    if (this.element.data) {
                        this.element.data.media = null;
                    }
                    this.mediaUrl = null;
                    return;
                }

                this.updateMediaItem(mediaId);
            },
            immediate: true
        },
        element: {
            handler(newVal) {
                // console.log('[sw-cms-el-my-overlay-image] element changed:', JSON.parse(JSON.stringify(newVal)));
            },
            deep: true,
            immediate: true
        }
    },

    created() {
        this.initElementConfig();
        this.initElementData();
    },

    updated() {
        // console.log('[sw-cms-el-my-overlay-image] updated, element:', JSON.parse(JSON.stringify(this.element)));
    },

    methods: {
        initElementConfig() {
            if (!this.element.config) {
                this.element.config = {};
            }

            if (!this.element.config.media) {
                this.element.config.media = {
                    source: 'static',
                    value: null
                };
            }

            if (!this.element.config.overlayPosition) {
                this.element.config.overlayPosition = {
                    source: 'static',
                    value: 'center'
                };
            }

            if (!this.element.config.overlayText) {
                this.element.config.overlayText = {
                    source: 'static',
                    value: ''
                };
            }

            if (!this.element.config.buttonText) {
                this.element.config.buttonText = {
                    source: 'static',
                    value: 'Przejdź do kategorii'
                };
            }

            if (!this.element.config.category) {
                this.element.config.category = {
                    source: 'static',
                    value: null
                };
            }

            if (!this.element.config.buttonStyle) {
                this.element.config.buttonStyle = {
                    source: 'static',
                    value: false
                };
            }
        },

        initElementData() {
            if (!this.element.data) {
                this.element.data = {};
            }
        },

        async updateMediaItem(mediaId) {
            if (!mediaId) {
                return;
            }

            try {
                const criteria = new Shopware.Data.Criteria();
                criteria.setIds([mediaId]);

                const searchResult = await this.mediaRepository.search(criteria, Shopware.Context.api);
                const media = searchResult.first();

                if (media) {
                    if (!this.element.data) {
                        this.element.data = {};
                    }
                    
                    this.element.data.media = media;
                    this.mediaUrl = media.url;
                    this.$emit('element-update', this.element);
                }
            } catch (error) {
                console.error('Error loading media:', error);
            }
        },
        goToCategory() {
            if (this.categoryId) {
                // console.log('Navigate to category:', this.categoryId);
            }
        }
    }
});