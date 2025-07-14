try {
    // console.log('[MyOverlayImage] Starting component registration');
    
    Shopware.Component.register('sw-cms-el-config-my-overlay-image', {
        template: `
            <div class="sw-cms-el-config-my-overlay-image">
                <sw-cms-el-config-base v-if="element && element.id" :element="element">
                    <template #default>
                        <sw-media-field
                            label="Obraz"
                            :value="element.config.media.value"
                            @update:value="onMediaInput"
                        />
                        <sw-single-select
                            label="Pozycja overlay"
                            :options="overlayPositionOptions"
                            :value="element.config.overlayPosition.value"
                            @update:value="onOverlayPositionInput"
                        />
                        <sw-text-editor
                            label="Tekst overlay"
                            :value="element.config.overlayText.value"
                            @update:value="onOverlayTextInput"
                        />
                        <sw-entity-single-select
                            label="Kategoria (przycisk)"
                            entity="category"
                            :value="element.config.category.value"
                            @update:value="onCategoryInput"
                            search-property="name"
                        />
                        <sw-text-field
                            label="Tekst przycisku"
                            :value="element.config.buttonText.value"
                            @update:value="onButtonTextInput"
                        />
                        <sw-single-select
                            label="Styl przycisku"
                            :options="buttonStyleOptions"
                            :value="element.config.buttonStyle.value"
                            @update:value="onButtonStyleInput"
                        />
                    </template>
                </sw-cms-el-config-base>
                <div v-else style="color: red;">Brak danych elementu CMS.</div>
            </div>
        `,
        props: {
            element: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                overlayPositionOptions: [
                    { value: 'top-left', label: 'Lewy górny' },
                    { value: 'top-center', label: 'Góra, środek' },
                    { value: 'top-right', label: 'Prawy górny' },
                    { value: 'center-left', label: 'Lewy środek' },
                    { value: 'center', label: 'Centrum' },
                    { value: 'center-right', label: 'Prawy środek' },
                    { value: 'bottom-left', label: 'Lewy dolny' },
                    { value: 'bottom-center', label: 'Dół, środek' },
                    { value: 'bottom-right', label: 'Prawy dolny' }
                ],
                buttonStyleOptions: [
                    { value: false, label: 'Jasny' },
                    { value: true, label: 'Ciemny' }
                ]
            };
        },
        created() {
            this.initConfig();
        },
        mounted() {
            this.validateElement();
        },
        watch: {
            element: {
                handler(newVal) {
                    if (newVal) {
                        try {
                            // Inicjalizacja config jako obiekt reaktywny
                            if (!newVal.config) {
                                newVal.config = {};
                            }
                            // Inicjalizacja każdego pola config jako obiekt reaktywny z value i source
                            const defaultConfig = {
                                media: { source: 'static', value: null, required: true, entity: { name: 'media' } },
                                overlayPosition: { source: 'static', value: 'center' },
                                overlayText: { source: 'static', value: '' },
                                buttonText: { source: 'static', value: 'Przejdź do kategorii' },
                                category: { source: 'static', value: null, entity: { name: 'category' } },
                                buttonStyle: { source: 'static', value: false }
                            };
                            Object.keys(defaultConfig).forEach(key => {
                                if (!newVal.config[key]) {
                                    newVal.config[key] = {};
                                }
                                Object.keys(defaultConfig[key]).forEach(prop => {
                                    if (newVal.config[key][prop] === undefined) {
                                        newVal.config[key][prop] = defaultConfig[key][prop];
                                    }
                                });
                            });
                            this.validateElement();
                        } catch (error) {
                            console.error('[MyOverlayImage] Error in element watch handler:', error);
                        }
                    }
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            initConfig() {
                const defaultConfig = {
                    media: { source: 'static', value: null, required: true, entity: { name: 'media' } },
                    overlayPosition: { source: 'static', value: 'center' },
                    overlayText: { source: 'static', value: '' },
                    buttonText: { source: 'static', value: 'Przejdź do kategorii' },
                    category: { source: 'static', value: null, entity: { name: 'category' } },
                    buttonStyle: { source: 'static', value: false }
                };
                Object.keys(defaultConfig).forEach(key => {
                    if (!this.element.config[key]) {
                        this.element.config[key] = {};
                    }
                    Object.keys(defaultConfig[key]).forEach(prop => {
                        if (this.element.config[key][prop] === undefined) {
                            this.element.config[key][prop] = defaultConfig[key][prop];
                        }
                    });
                });
            },
            onMediaInput(mediaId) {
                // console.log('[MyOverlayImage] onMediaInput', mediaId);
                this.element.config.media.value = mediaId;
                this.emitElementUpdate();
            },
            onOverlayPositionInput(value) {
                this.element.config.overlayPosition.value = value;
                this.emitElementUpdate();
            },
            onOverlayTextInput(value) {
                this.element.config.overlayText.value = value;
                this.emitElementUpdate();
            },
            onButtonTextInput(value) {
                this.element.config.buttonText.value = value;
                this.emitElementUpdate();
            },
            onCategoryInput(value) {
                this.element.config.category.value = value;
                this.emitElementUpdate();
            },
            onButtonStyleInput(value) {
                this.element.config.buttonStyle.value = value;
                this.emitElementUpdate();
            },
            emitElementUpdate() {
                this.$emit('element-update', this.element);
            },
            validateElement() {
                try {
                    if (!this.element) {
                        return false;
                    }
                    if (!this.element.config) {
                        return false;
                    }
                    if (!this.element.config.overlayPosition) {
                        return false;
                    }
                    if (!this.element.config.overlayText) {
                        return false;
                    }
                    if (!this.element.config.buttonText) {
                        return false;
                    }
                    if (!this.element.config.category) {
                        return false;
                    }
                    if (!this.element.config.buttonStyle) {
                        return false;
                    }
                    return true;
                } catch (error) {
                    return false;
                }
            }
        }
    });
    // console.log('[MyOverlayImage] Component registration completed');
} catch (e) {
    console.error('[MyOverlayImage] ERROR in component registration:', e);
}