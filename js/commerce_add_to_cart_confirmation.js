(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.commerce_add_to_cart_confirmation = {
    attach:function (context) {
      var popup_content = $('.commerce-add-to-cart-confirmation', context).clone();
      $('.commerce-add-to-cart-confirmation').remove();
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
        });
        confirmationModal.showModal();

        popup_content.on('click touchend', '.commerce-add-to-cart-confirmation-close', function() {
          Drupal.dialog(popup_content).close();
        });
      }
    }
  }
})(jQuery, Drupal);
