<?php declare(strict_types=1);

namespace MyOverlayImagePlugin\Core\Content\Media\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;

class MyOverlayImageCmsElementResolver extends AbstractCmsElementResolver
{
    // Usunęliśmy wstrzykiwanie EntityRepository, ponieważ przy poprawnym użyciu
    // metod collect/enrich, Shopware sam pobierze dla nas dane.
    // public function __construct(...) {}

    public function getType(): string
    {
        return 'my-overlay-image';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        // Używamy nowoczesnego sposobu dostępu do konfiguracji pola
        $mediaConfig = $slot->getFieldConfig()->get('media');

        // Proste i bezpieczne sprawdzenie, czy konfiguracja mediów istnieje i ma ustawioną wartość
        if ($mediaConfig === null || $mediaConfig->getValue() === null) {
            return null;
        }

        $mediaId = $mediaConfig->getValue();

        // Jeśli ID jest puste, również nic nie robimy
        if (empty($mediaId)) {
            return null;
        }

        $criteriaCollection = new CriteriaCollection();
        
        // Dodajemy kryteria do wyszukania mediów na podstawie ID.
        // Klucz 'media_...' jest ważny, użyjemy go w metodzie enrich.
        $criteriaCollection->add('media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, new Criteria([$mediaId]));

        return $criteriaCollection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $data = new ArrayStruct();

        // Pobieramy wynik wyszukiwania mediów, używając tego samego klucza co w `collect`
        $mediaSearchResult = $result->get('media_' . $slot->getUniqueIdentifier());

        // Jeśli media zostały znalezione, dodajemy je do danych elementu
        if ($mediaSearchResult && $media = $mediaSearchResult->first()) {
            // Klucz 'media' będzie używany w szablonie Twig jako element.data.media
            $data->set('media', $media);
        }

        $slot->setData($data);
    }
}