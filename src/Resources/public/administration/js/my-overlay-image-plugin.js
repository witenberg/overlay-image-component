!function(){var e={286:function(){Shopware.Component.register("sw-cms-el-preview-my-overlay-image",{template:`
        <div class="sw-cms-el-preview-my-overlay-image">
            <img v-if="mediaUrl" :src="mediaUrl" alt="Background Image" class="sw-cms-el-preview-my-overlay-image__image">
            <div v-else class="sw-cms-el-preview-my-overlay-image__placeholder">
                {{ $tc('my-overlay-image-plugin.element.preview.placeholder') }}
            </div>
            <div class="sw-cms-el-preview-my-overlay-image__overlay" :style="overlayStyle">
                <div v-html="overlayText"></div>
                <div class="sw-cms-el-preview-my-overlay-image__button">Button</div>
            </div>
        </div>
    `,props:{element:{type:Object,required:!0}},computed:{mediaUrl(){return this.element.data&&this.element.data.media?this.element.data.media.url:"/bundles/myoverlayimageplugin/img/overlay_image_placeholder.png"},overlayText(){return this.element.config.overlayText.value||""},overlayPosition(){return this.element.config.overlayPosition.value||"center"},overlayStyle(){return({"top-left":{top:"0",left:"0",transform:"translate(0, 0)"},"top-center":{top:"0",left:"50%",transform:"translate(-50%, 0)"},"top-right":{top:"0",right:"0",transform:"translate(0, 0)"},"center-left":{top:"50%",left:"0",transform:"translate(0, -50%)"},center:{top:"50%",left:"50%",transform:"translate(-50%, -50%)"},"center-right":{top:"50%",right:"0",transform:"translate(0, -50%)"},"bottom-left":{bottom:"0",left:"0",transform:"translate(0, 0)"},"bottom-center":{bottom:"0",left:"50%",transform:"translate(-50%, 0)"},"bottom-right":{bottom:"0",right:"0",transform:"translate(0, 0)"}})[this.overlayPosition]}},created(){let e=`
            .sw-cms-el-preview-my-overlay-image {
                position: relative;
                width: 100%;
                min-height: 150px;
                background-color: #f0f0f0;
                border: 1px dashed #ccc;
                overflow: hidden;
            }
            .sw-cms-el-preview-my-overlay-image__image {
                width: 100%;
                height: auto;
                display: block;
                object-fit: cover;
                opacity: 0.6; // Aby overlay był widoczny
            }
            .sw-cms-el-preview-my-overlay-image__placeholder {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #e0e0e0;
                color: #888;
                font-style: italic;
            }
            .sw-cms-el-preview-my-overlay-image__overlay {
                position: absolute;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .sw-cms-el-preview-my-overlay-image__overlay p {
                margin: 0;
            }
            .sw-cms-el-preview-my-overlay-image__button {
                background-color: #007bff;
                color: white;
                padding: 5px 10px;
                border-radius: 3px;
                margin-top: 5px;
                font-size: 12px;
            }
        `,t=document.createElement("style");t.innerHTML=e,document.head.appendChild(t)}})},660:function(){Shopware.Service("cmsService").registerCmsBlock({name:"my-overlay-image",label:"My Overlay Image",category:"image",component:"sw-cms-block-my-overlay-image",previewComponent:"sw-cms-preview-my-overlay-image",defaultConfig:{}}),Shopware.Component.register("sw-cms-block-my-overlay-image",{template:`
        <div class="sw-cms-block-my-overlay-image">
            <slot name="my-overlay-image"></slot>
        </div>
    `}),Shopware.Component.register("sw-cms-preview-my-overlay-image",{template:`
        <div class="sw-cms-preview-my-overlay-image">
            <div class="sw-cms-preview-my-overlay-image__image">
                <img src="/bundles/myoverlayimageplugin/img/overlay_image_preview.png" alt="Overlay Image Preview">
            </div>
            <div class="sw-cms-preview-my-overlay-image__overlay">
                Overlay Image
            </div>
        </div>
    `})}},t={};function a(o){var i=t[o];if(void 0!==i)return i.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,a),l.exports}a.p="bundles/myoverlayimageplugin/",window?.__sw__?.assetPath&&(a.p=window.__sw__.assetPath+"/bundles/myoverlayimageplugin/"),a(660),Shopware.Component.register("sw-cms-el-config-my-overlay-image",{template:`
        <div class="sw-cms-el-config-my-overlay-image">
            <sw-cms-el-config-base :element="element">
                <sw-upload-listing @media-upload-sidebar-open="onOpenMediaSidebar"
                                   @media-item-selection-change="onMediaSelectionChange"
                                   :upload-tag="element.id"
                                   :key="element.id"
                                   :items="[element.data.media]"
                >
                </sw-upload-listing>

                <sw-single-select
                    class="sw-cms-el-config-my-overlay-image__overlay-position"
                    :label="$tc('my-overlay-image-plugin.element.config.overlayPositionLabel')"
                    :options="overlayPositionOptions"
                    v-model="element.config.overlayPosition.value"
                    @change="onPositionChange"
                >
                </sw-single-select>

                <sw-text-editor
                    class="sw-cms-el-config-my-overlay-image__overlay-text"
                    :label="$tc('my-overlay-image-plugin.element.config.overlayTextLabel')"
                    v-model="element.config.overlayText.value"
                    @change="onTextChange"
                >
                </sw-text-editor>

                <sw-entity-single-select
                    class="sw-cms-el-config-my-overlay-image__category-select"
                    :label="$tc('my-overlay-image-plugin.element.config.categoryLabel')"
                    entity="category"
                    v-model="element.config.category.value"
                    @change="onCategoryChange"
                    search-property="name"
                >
                </sw-entity-single-select>
            </sw-cms-el-config-base>
        </div>
    `,mixins:[Shopware.Mixin.get("cms-element")],data(){return{overlayPositionOptions:[{value:"top-left",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.topLeft")},{value:"top-center",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.topCenter")},{value:"top-right",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.topRight")},{value:"center-left",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.centerLeft")},{value:"center",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.center")},{value:"center-right",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.centerRight")},{value:"bottom-left",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.bottomLeft")},{value:"bottom-center",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.bottomCenter")},{value:"bottom-right",label:this.$tc("my-overlay-image-plugin.element.config.overlayPosition.bottomRight")}]}},created(){this.createdComponent()},methods:{createdComponent(){this.element.config.overlayPosition.value||(this.element.config.overlayPosition.value="center"),this.element.config.overlayText.value||(this.element.config.overlayText.value="<h1>Your Title</h1><p>Your Text</p><button>Button</button>"),this.$watch("element.config.overlayPosition.value",e=>{this.element.config.overlayPosition.value=e}),this.$watch("element.config.overlayText.value",e=>{this.element.config.overlayText.value=e}),this.$watch("element.config.category.value",e=>{this.element.config.category.value=e})},onOpenMediaSidebar(){this.$emit("on-change-element-config",{...this.element.config,media:{source:"static",value:null}}),this.element.config.media.source="static"},onMediaSelectionChange(e){let t=e[0];if(!t){this.element.config.media.value=null;return}this.element.config.media.value=t.id,this.element.data.media=t},onPositionChange(){this.updateElementData()},onTextChange(){this.updateElementData()},onCategoryChange(e){this.element.config.category.value=e,this.updateElementData()},updateElementData(){this.$emit("element-update",this.element)}}}),a(286),console.log("MyOverlayImagePlugin: main.js załadowany i definicje CMS załadowane.")}();