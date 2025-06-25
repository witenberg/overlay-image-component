<?php declare(strict_types=1);

namespace MyOverlayImagePlugin;

use Shopware\Core\Framework\Plugin;
use Shopware\Storefront\Framework\ThemeInterface;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;

class MyOverlayImagePlugin extends Plugin implements ThemeInterface
{
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);

        $loader = new XmlFileLoader($container, new FileLocator(__DIR__ . '/Resources/config'));
        $loader->load('services.xml');
    }

    public function getThemeConfigPath(): string
    {
        return 'Resources/theme.json';
    }
}