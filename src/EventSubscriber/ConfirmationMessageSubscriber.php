<?php

namespace Drupal\commerce_add_to_cart_confirmation\EventSubscriber;

use Drupal\commerce_cart\Event\CartEntityAddEvent;
use Drupal\commerce_cart\Event\CartEvents;
use Drupal\Core\Render\Markup;
use Drupal\Core\Render\RendererInterface;
use Drupal\views\Views;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event Subscriber CommerceAddToCartConfirmationMessage.
 */
class ConfirmationMessageSubscriber implements EventSubscriberInterface {

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * Constructs a new ConfirmationMessageSubscriber instance.
   *
   * @param \Drupal\Core\Render\RendererInterface $renderer
   *   The renderer.
   */
  public function __construct(RendererInterface $renderer) {
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[CartEvents::CART_ENTITY_ADD][] = ['onRespond'];
    return $events;
  }

  /**
   * Code that should be triggered on event specified.
   */
  public function onRespond(CartEntityAddEvent $event) {
    $view = Views::getView('confirm_message_product_display');
    $view->setDisplay('default');
    $view->setArguments([$event->getOrderItem()->id()]);
    $elements = $view->render();
    $message = $this->renderer->render($elements);
    $rendered_message = Markup::create($message);
    drupal_set_message($rendered_message, 'commerce-add-to-cart-confirmation');
  }

}
