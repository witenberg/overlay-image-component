<?php declare(strict_types=1);

namespace MyOverlayImagePlugin\Core\Content\Media\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Content\Category\CategoryEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;

class MyOverlayImageCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'my-overlay-image';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $criteriaCollection = new CriteriaCollection();
        
        $mediaConfig = $slot->getFieldConfig()->get('media');
        if ($mediaConfig !== null && !empty($mediaConfig->getValue())) {
            $criteriaCollection->add('media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria([$mediaConfig->getValue()]));
        }

        $categoryConfig = $slot->getFieldConfig()->get('category');
        if ($categoryConfig !== null && !empty($categoryConfig->getValue())) {
            $categoryCriteria = new Criteria([$categoryConfig->getValue()]);
            $categoryCriteria->addAssociation('seoUrls');
            $criteriaCollection->add('category_' . $slot->getUniqueIdentifier(), CategoryDefinition::class, $categoryCriteria);
        }

        return $criteriaCollection->all() ? $criteriaCollection : null;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $data = new ArrayStruct();
        $config = $slot->getFieldConfig();

        // Przekazujemy proste wartości konfiguracyjne
        $data->set('overlayText', $config->get('overlayText')?->getValue());
        $data->set('overlayPosition', $config->get('overlayPosition')?->getValue());
        $data->set('buttonText', $config->get('buttonText')?->getValue());
        $data->set('buttonStyle', $config->get('buttonStyle')?->getValue());

        // Przekazujemy zresolve'owane media
        $mediaSearchResult = $result->get('media_' . $slot->getUniqueIdentifier());
        if ($mediaSearchResult && $media = $mediaSearchResult->first()) {
            $data->set('media', $media);
        }

        // Przekazujemy zresolve'owaną kategorię i jej poprawny URL
        $categorySearchResult = $result->get('category_' . $slot->getUniqueIdentifier());
        if ($categorySearchResult && $category = $categorySearchResult->first()) {
            // Nie przekazujemy już całego obiektu, żeby nie zaśmiecać danych
            // $data->set('category', $category); 
            
            $seoUrl = $this->findBestSeoUrl($category, $resolverContext);
            if ($seoUrl) {
                $data->set('categoryUrl', $seoUrl);
            }
        }

        $slot->setData($data);
    }

    private function findBestSeoUrl(CategoryEntity $category, ResolverContext $resolverContext): ?string
    {
        if (!$category->getSeoUrls() || $category->getSeoUrls()->count() === 0) return null;

        $salesChannelContext = $resolverContext->getSalesChannelContext();
        $languageId = $salesChannelContext->getLanguageId();
        $salesChannelId = $salesChannelContext->getSalesChannelId();
        $bestMatch = null;

        foreach ($category->getSeoUrls() as $seoUrl) {
            if ($seoUrl->getLanguageId() !== $languageId) continue;
            if ($seoUrl->getIsCanonical()) {
                if ($seoUrl->getSalesChannelId() === $salesChannelId) return $seoUrl->getSeoPathInfo();
                if ($seoUrl->getSalesChannelId() === null) $bestMatch = $seoUrl->getSeoPathInfo();
            }
        }
        
        if ($bestMatch !== null) return $bestMatch;

        foreach ($category->getSeoUrls() as $seoUrl) {
             if ($seoUrl->getLanguageId() === $languageId && $seoUrl->getSalesChannelId() === $salesChannelId) return $seoUrl->getSeoPathInfo();
        }
        
        return null;
    }
}