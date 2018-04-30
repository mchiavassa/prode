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
                    list.append(response);

                    if (list.find('.item-list').length === loadedItems) {
                        if (loadMoreBtn) {
                            loadMoreBtn.addClass('disabled');
                            loadMoreBtn.unbind('click');
                        }

                    }
                },
                error: function () {
                    toastr.error("Ocurrió un error al intentar traer algunos datos.");
                    loading.hide();
                }
            };

            if (loadMoreBtn) {
                options.data = {
                    loadedItems: loadedItems
                }
            }

            loading.show();
            $.ajax(options).done(function () {
                loading.hide();
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
