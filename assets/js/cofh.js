---
layout: null
---

var pages = [
{% for page in site.pages %}    { title: '{{ page.title }}', value: '{{ page.title }}', url: '{{ page.url }}'{% if page.mod and page.title != page.mod %}, mod: '{{ page.mod }}'{% endif %} }{% if forloop.last %}{% else %},{% endif %}
{% endfor %}
];

var setScroll = function() {
    var $anchor = $(window.location.hash);

    if ($anchor.length > 0) {
        $('html, body')
            .stop()
            .animate({
                scrollTop: $anchor.offset().top - 50
            }, 0);
    }
};
$(window).on('hashchange load', setScroll);

$.fn.enterPress = function(fn) {
    return this.each(function() {
        $(this).bind('enterPress', fn);
        $(this).keyup(function(e) {
            if (e.keyCode == 13) {
                $(this).trigger("enterPress");
            }
        })
    });
 };

$(function() {
    $('.cofh-search').on('selectitem.uk.autocomplete', function(event, data) {
        window.location.href = window.location.protocol + '//' + window.location.host + data.url;
    });
    $('.cofh-search > input').enterPress(function() {
        if ($('.cofh-search .uk-dropdown').attr('aria-expanded') == 'false' || $('.cofh-search .uk-dropdown > ul > li.uk-active').length == 0) {
            window.location.href = 'http://google.com/search?q=' + $('.cofh-search > input').val() + ' site:' + window.location.hostname;
        }
    });

    $(".uk-container a[href^='/docs/']").each(function(i, anchor) {
        $anchor = $(anchor);
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].url.search($anchor.attr('href')) >= 0) return;
        }
        $anchor.removeAttr('href');
        $anchor.addClass('uk-text-danger');
    });

    var nicks = [
        'RedstoneFurnace',
        'PhytogenicInsolator',
        'CyclicAssembler',
        'FluidTransposer',
        'SkyboysSlave',
        'TonisSlave',
        'AutonomousActivator',
        'TerrainSmasher',
        'ImplusePlate'
    ];

    var nick = nicks[Math.floor(Math.random() * nicks.length)];
    $('a.irclink').attr('href', 'http://webchat.esper.net/?nick=' + nick + '....&channels=#ThermalExpansion');

    var banner = '/assets/images/banners/banner' + Math.floor(Math.random() * 7 + 1) + '.jpg';
    $('.cofh-banner').css('background-image', 'url(' + banner + ')');
});

// Google Analytics
if(window.location.hostname.search('localhost') < 0 && window.location.hostname.search('127.0.0.1') < 0) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-62994156-1', 'auto');
    ga('send', 'pageview');
}