<?php
/**
 * Created by PhpStorm.
 * User: oleg
 * Date: 28.12.16
 * Time: 22:32
 */

namespace Drupal\commerce_add_to_cart_confirmation\EventSubscriber;

use Drupal\commerce_cart\Event\CartEntityAddEvent;
use Drupal\commerce_cart\Event\CartEvents;
use Drupal\Core\Render\Markup;
use Drupal\views\Views;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event Subscriber CommerceAddToCartConfirmationMessage.
 */
class CommerceAddToCartConfirmationMessage implements EventSubscriberInterface {
  public static function getSubscribedEvents() {
    // For this example I am using KernelEvents constants (see below a full list).
    $events[CartEvents::CART_ENTITY_ADD][] = ['onRespond'];
    return $events;
  }

  /**
   * Code that should be triggered on event specified
   */
  public function onRespond(CartEntityAddEvent $event) {
    $message = '<div class="added-product-title">' . t('Item successfully added to your cart') . '</div>';
    $view = Views::getView('confirm_message_product_display');
    $view->setDisplay('default');
    $view->setArguments([$event->getOrderItem()->id()]);
    $elements = $view->render();

    $message .= \Drupal::service('renderer')->render($elements);
    // $message .= views_embed_view('confirm_message_product_display', 'default', $line_item->line_item_id);
    $rendered_message = Markup::create($message);
    drupal_set_message($rendered_message, 'commerce-add-to-cart-confirmation');

  }

}