$(document).ready(function () {
    $(document).foundation();

    // Load the data at the start
    getData();


    // Load Page on click
    $('.top-bar>.top-bar-left>.menu>li>a').click(function (event) {
        event.preventDefault();

        var target = $(this).attr('data-target');

        if (target == 'index.html') {
            $('#hide').show();
            getData();

        } else {
            $('#hide').hide();
            $('.content').load(target);

        }
    });

    $(document).ajaxComplete(function () {
        $(document).foundation();
    });

    $('#postData').click(function () {
        postData();
    });
    $('#getlatestObject').click(function () {
        getLatestObject();
    });

    function getData() {
        $('.content').html('<div class="row"><pre></pre></div>');
        $.get('//bakverksapi.herokuapp.com/bakverk', function (data) {
            $('.content pre').html(JSON.stringify(data, undefined, 2));
        });
    }

    function postData() {
        var data = {
            "name": "New company1",
            "suffix": "LLC",
            "catchphrase": "Profound grid-enabled intranet",
            "bs": "sticky monetize e-services",
            "bsBuzz": "seize",
            "bsNoun": "initiatives",
            "bsAdjective": "virtual"
        };

        $.ajax({
            type: "POST",
            url: '//bakverksapi.herokuapp.com/bakverk',
            data: data,
            success: function (data) {
                $('.callout').prepend('<h5>Data Posted</h5><p>Data:' + JSON.stringify(data) + '</p>');
            },
            error: function (msg) {
                alert(msg);
            },
            dataType: 'JSON'
        });

        $('.callout').fadeIn('slow').fadeOut(2000);

        getData();


    }

    function getLatestObject() {

        $.ajax({
            type: "GET",
            url: '//bakverksapi.herokuapp.com/bakverk',
            success: function (data) {
                $('.content>.row').append('<pre>'+JSON.stringify(data[data.length-1], undefined, 2)+'</pre>');
            },
            error: function (msg) {
                alert(msg);
            },
            dataType: 'JSON'
        });

    }

});