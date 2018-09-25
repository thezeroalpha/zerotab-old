jQuery(document).ready(function ($) {
    var $ul = $('#favorite-links');
    var $title = $('#title');
    var $url = $('#url');
    $resetButton = $('#customBackgrounds .btn.reset')

    if (localStorage.getItem('vk-links')) {
        $ul.html(localStorage.getItem('vk-links'));
    }
    $('#add').click(function () {
        $('#favorite-links').append('<li><a href="' + $url.val() + '" target="_blank">' + $title.val() + '</a><button class="removebtn">x</button></li>');
        localStorage.setItem('vk-links', $ul.html());
        $title.val("");
        $url.val("https://");
        $("#add-link-form").slideToggle("100");
    });
    $("#favorite-links").on('click', '.removebtn', function () {
        $(this).parent().remove();
        localStorage.setItem('vk-links', $ul.html());
    });
    $("#new-link-button").click(function () {
        $("#add-link-form").slideToggle("100");
    });
    $bg_container = $('#customBackgrounds')
    $bg_list = $('#customBackgrounds .list')
    $bg_thumb = $('#customBackgrounds .list .thumb.template')
    bg_count = 9
    for (var i = 0; i <= 8; i++) {
        var img_src = 'media/bg-thumbs/bg' + i + '.jpg'
        console.log(img_src)
        var $thumb = $bg_thumb.clone()
        $thumb.removeClass('template')
        $thumb.css('background-image', 'url(' + img_src + ')')
        $thumb.attr('data-id', i)
        console.log($thumb)
        $thumb.appendTo($bg_list)
    }
    $('#customBackgrounds .list .thumb').on('mouseover', function () {
        if ($bg_container.hasClass('active'))
            changeBackground($(this).attr('data-id'))
    })
    $('#customBackgrounds .list .thumb').on('mouseleave', function () {
        if ($bg_container.hasClass('active'))
            changeBackground(backgroundImgId)
    })
    $('#customBackgrounds .list .thumb').on('click', function () {
        if (!$bg_container.hasClass('active'))
            return
        backgroundImgId = $(this).attr('data-id')
        localStorage.setItem('background_id', backgroundImgId)
        $(this).siblings().removeClass('active')
        $(this).addClass('active')
        if ($resetButton.css('display') == 'none')
            $resetButton.show(500)
    })
    $('#customBackgrounds .btn.toggle').on('click', function () {
        $('#customBackgrounds').toggleClass('active')
    })
    $('#customBackgrounds .btn.reset').on('click', function () {
        backgroundImgId = ''
        localStorage.setItem('background_id', backgroundImgId)
        $('#customBackgrounds .list .thumb').removeClass('active')
        changeBackground(backgroundImgId)
    })
});
