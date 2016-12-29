(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.commerce_add_to_cart_confirmation_overlay = {
    attach:function (context, settings) {
      var popup_content = $('.messages--commerce-add-to-cart-confirmation');
      if (popup_content.length > 0) {
        var popup_title = popup_content.find('.added-product-title').html()
        popup_content.find('.added-product-title').remove();
        $('.messages--commerce-add-to-cart-confirmation').remove();

        var frontpageModal = Drupal.dialog(popup_content, {
          title: popup_title,
          dialogClass: 'commerce-add-to-cart-confirmation',
          width: 575,
          height: 230,
          autoResize: true,
          resizable: false,

          close: function (event) {
            // Удаляем элемент который использовался для содержимого.
            $(event.target).remove();
          },
          buttons: [
            {
              text: Drupal.t('Go to checkout'),
              class: 'button button--primary',
              click: function () {
                changeTextEditor(field, newFormatID);
                confirmationDialog.close();
              }
            },
            {
              text: Drupal.t('Continue shopping'),
              class: 'button',
              click: function () {
                // Restore the active format ID: cancel changing text format. We
                // cannot simply call event.preventDefault() because jQuery's
                // change event is only triggered after the change has already
                // been accepted.
                $select.val(activeFormatID);
                confirmationDialog.close();
              }
            }
          ],
        });
        // Отображает модальное окно с overlay.
        frontpageModal.showModal();


        // // Add the background overlay.
        // $('body').append("<div class=\"commerce_add_to_cart_confirmation_overlay\"></div>");
        //
        // // Enable the close link.
        // $('.commerce-add-to-cart-confirmation-close').on('click touchend', function(e) {
        //   e.preventDefault();
        //   $('.commerce-add-to-cart-confirmation').remove();
        //   $('.commerce_add_to_cart_confirmation_overlay').remove();
        // });
      }
    }
  }
})(jQuery, Drupal, drupalSettings);
