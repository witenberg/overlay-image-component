try {
    const { Criteria } = Shopware.Data;
    console.log('[Preview] preview/index.js loaded');

    Shopware.Component.register('sw-cms-el-preview-my-overlay-image', {
        template: `
            <div class="sw-cms-el-preview-my-overlay-image">
                <img v-if="actualMediaUrl" :src="actualMediaUrl" alt="Background Image" class="sw-cms-el-preview-my-overlay-image__image">
                <div v-else class="sw-cms-el-preview-my-overlay-image__placeholder">
                    {{$tc('my-overlay-image-plugin.element.preview.placeholder')}}
                </div>
                <div class="sw-cms-el-preview-my-overlay-image__overlay" :style="overlayStyle">
                    <div v-html="overlayText"></div>
                    <div class="sw-cms-el-preview-my-overlay-image__button">Button</div>
                </div>
            </div>
        `,
        props: {
            element: {
                type: Object,
                required: true
            }
        },
        inject: ['repositoryFactory'],
        data() {
            return {
                mediaUrlInternal: null
            };
        },
        computed: {
            mediaRepository() {
                return this.repositoryFactory.create('media');
            },
            mediaIdFromConfig() {
                return this.element?.config?.media?.value || null;
            },
            actualMediaUrl() {
                if (this.element?.data?.media?.url) {
                    console.log('[Preview] Using element.data.media.url:', this.element.data.media.url);
                    return this.element.data.media.url;
                }
                if (this.mediaUrlInternal) {
                    console.log('[Preview] Using mediaUrlInternal:', this.mediaUrlInternal);
                    return this.mediaUrlInternal;
                }
                console.log('[Preview] actualMediaUrl: No direct URL, relying on watcher/fetch.', this.mediaIdFromConfig);
                return null;
            },
            overlayText() {
                try {
                    return this.element.config.overlayText.value || '';
                } catch (e) {
                    console.error('[sw-cms-el-preview-my-overlay-image] ERROR in computed overlayText:', e, this.element);
                    return '';
                }
            },
            overlayPosition() {
                try {
                    return this.element.config.overlayPosition.value || 'center';
                } catch (e) {
                    console.error('[sw-cms-el-preview-my-overlay-image] ERROR in computed overlayPosition:', e, this.element);
                    return 'center';
                }
            },
            overlayStyle() {
                try {
                    const positionStyles = {
                        'top-left': { top: '0', left: '0', transform: 'translate(0, 0)' },
                        'top-center': { top: '0', left: '50%', transform: 'translate(-50%, 0)' },
                        'top-right': { top: '0', right: '0', transform: 'translate(0, 0)' },
                        'center-left': { top: '50%', left: '0', transform: 'translate(0, -50%)' },
                        'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
                        'center-right': { top: '50%', right: '0', transform: 'translate(0, -50%)' },
                        'bottom-left': { bottom: '0', left: '0', transform: 'translate(0, 0)' },
                        'bottom-center': { bottom: '0', left: '50%', transform: 'translate(-50%, 0)' },
                        'bottom-right': { bottom: '0', right: '0', transform: 'translate(0, 0)' }
                    };
                    return positionStyles[this.overlayPosition];
                } catch (e) {
                    console.error('[sw-cms-el-preview-my-overlay-image] ERROR in computed overlayStyle:', e, this.element);
                    return {};
                }
            }
        },
        watch: {
            mediaIdFromConfig: {
                immediate: true,
                handler(newMediaId, oldMediaId) {
                    console.log(`[Preview] Watcher: mediaIdFromConfig changed from "${oldMediaId}" to "${newMediaId}"`);
                    if (newMediaId) {
                        this.fetchMedia(newMediaId);
                    } else {
                        this.mediaUrlInternal = null;
                    }
                }
            }
        },
        methods: {
            async fetchMedia(mediaId) {
                if (!mediaId) {
                    this.mediaUrlInternal = null;
                    console.log('[Preview] fetchMedia: Aborted, no mediaId provided.');
                    return;
                }
                console.log('[Preview] fetchMedia: Attempting to fetch media for ID:', mediaId);
                try {
                    const media = await this.mediaRepository.get(mediaId, Shopware.Context.api);
                    if (media && media.url) {
                        this.mediaUrlInternal = media.url;
                        console.log('[Preview] fetchMedia: Success, URL set to:', media.url);
                    } else {
                        this.mediaUrlInternal = null;
                        console.warn('[Preview] fetchMedia: Media found but no URL, or media not found for ID:', mediaId, media);
                    }
                } catch (e) {
                    this.mediaUrlInternal = null;
                    console.error('[sw-cms-el-preview-my-overlay-image] ERROR in fetchMedia:', e, 'Media ID:', mediaId);
                }
            }
        },
        created() {
            try {
                console.log('[Preview] created, initial element.config.media.value:', this.element?.config?.media?.value);
            } catch (e) {
                console.error('[sw-cms-el-preview-my-overlay-image] ERROR in created:', e, this.element);
            }
        }
    });
} catch (e) {
    console.error('[sw-cms-el-preview-my-overlay-image] ERROR in component registration:', e);
}