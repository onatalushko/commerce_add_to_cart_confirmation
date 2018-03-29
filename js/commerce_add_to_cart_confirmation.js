(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.commerce_add_to_cart_confirmation_overlay = {
    attach:function (context) {
      var popup_content = $('.messages--commerce-add-to-cart-confirmation > div', context).clone();
      $('.messages--commerce-add-to-cart-confirmation').remove();
      if (popup_content.length > 0) {
        var popup_title = popup_content.find('.added-product-title').html();
        popup_content.find('.added-product-title').remove();

        var confirmationModal = Drupal.dialog(popup_content, {
          title: popup_title,
          dialogClass: 'commerce-add-to-cart-confirmation',
          width: 745,
          height: 375,
          maxWidth: '95%',
          autoResize: true,
          resizable: false,

          close: function (event) {
            $(event.target).remove();
          },
          buttons: [
            {
              text: Drupal.t('Continue shopping'),
              class: 'button',
              click: function () {
                confirmationModal.close();
              }
            },
            {
              text: Drupal.t('Go to checkout'),
              class: 'button button--primary',
              click: function () {
                window.location.href = '/cart';
                confirmationModal.close();
              }
            }
          ]
        });
        confirmationModal.showModal();
      }
    }
  }
})(jQuery, Drupal);
