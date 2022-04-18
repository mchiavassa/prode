$(function () {
    let lists = $('.async-list');

    function loadList(list) {
        const url = list.data('source-url');
        const loading = list.next('div.row').find('.loading');
        const loadMoreBtn = list.next('div.row').find('.loadMore');

        const loadMoreItems = function () {
            let loadedItems = list.find('.item-list').length;

            let options = {
                url: url,
                success: function (response) {
                    list.append(response).hide().fadeIn(500);

                    if (list.find('.item-list').length === loadedItems) {
                        if (loadMoreBtn) {
                            loadMoreBtn.addClass('disabled');
                            loadMoreBtn.unbind('click');
                        }

                    }
                },
                error: function () {
                    toastr.error(errorMessageFetchData);
                    loading.fadeOut(500);
                }
            };

            if (loadMoreBtn) {
                options.data = {
                    loadedItems: loadedItems
                }
            }

            loading.show();
            $.ajax(options).done(function () {
                loading.fadeOut(500);
            });
        };

        if (loadMoreBtn) {
            loadMoreBtn.click(function () {
                loadMoreItems();
            });
        }

        loadMoreItems();
    }

    for (let i = 0; i < lists.length; i++) {
        loadList($(lists[i]));
    }
});
