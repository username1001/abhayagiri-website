const searchInputSelector = '.input-append input';

// TODO Refactor new pages into .waitForPageToLoad()
// .waitForPageToLoad()

module.exports = {

    'before': function(browser) {
        browser
            .useCss()
        ;
    },

    'after': function(browser) {
        browser.end();
    },

    'latest talks test': function(browser) {
        browser
            .url(browser.launchUrl + '/home')
            .waitForPageToLoad()
            .click('#btn-menu')
            .click('#btn-talks')
            .waitForElementVisible('.latest-talks', 10000)
            .assert.containsText('body', 'Dhamma Talks')
            .assert.containsText('body', 'Play')
        ;
    },

    'collections cards on phones test': function(browser) {
        browser
            .execute(function(url) {
                window.open(url, 'phone', 'height=600,width=400');
            }, [browser.launchUrl + '/talks/collections'], function() {
                browser
                    .switchWindow('phone')
                    .waitForElementVisible('.category-list', 10000)
                    .assert.visible('.card')
                    .closeWindow();
            })
           .window_handles(function(result) {
                browser.switchWindow(result.value[0]);
           })
        ;
    },

    'old collections redirect test': function(browser) {
        browser
            .url(browser.launchUrl + '/talks/6483-20th-anniversary-compilation')
            .waitForElementVisible('.talks', 10000)
            .url(browser.launchUrl + '/th/audio/2015-thanksgiving-monastic-retreat-entire')
            .waitForElementVisible('.talks', 10000)
        ;
    },

    'single talk test': function(browser) {
        browser
            .url(browser.launchUrl + '/talks/6832')
            .waitForElementVisible('.talk', 10000)
        ;
    },

    'single talk 404 test': function(browser) {
        browser
            .url(browser.launchUrl + '/talks/xyz')
            .waitForPageToLoad()
            .assert.containsText('body', 'could not be found')
        ;
    },

    'new talks redirect test': function(browser) {
        browser
            .url(browser.launchUrl + '/new/talks')
            .waitForElementVisible('.latest-talks', 10000)
            .url(function(result) {
                this.assert.equal(result.value, browser.launchUrl + '/talks')
            })
            .url(browser.launchUrl + '/new/th/talks')
            .waitForElementVisible('.latest-talks', 10000)
            .url(function(result) {
                this.assert.equal(result.value, browser.launchUrl + '/th/talks')
            })
        ;
    }

};
