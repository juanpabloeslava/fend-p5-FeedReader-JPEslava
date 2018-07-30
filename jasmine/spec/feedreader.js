/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
    /* Test Suite 1: RSS Feeds (allFeeds var in app.js) */  
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty.
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

       // test 1: check if each feed has a URL in it, and then check
       // if that URL is not empty 
        it('have URL', function () {
            for (const indFeed of allFeeds) {
                // should be defined
                expect(indFeed.url).toBeDefined();
                // should not be empty
                expect(indFeed.url.length).not.toBe(0);
                // just to be sure, write on console
                console.log (`indFeed.url:  ${indFeed.url}`);
            }
        });

       // test 2: check if each feed has a Name in it, and then check
       // if that Name is not empty 
        it('have Name', function () {
            for (const indFeed of allFeeds) {
                // should be defined
                expect(indFeed.name).toBeDefined();
                // should not be empty
                expect(indFeed.name.length).not.toBe(0);
                // just to be sure, write on console
                console.log (`indFeed.name:  ${indFeed.name}`);
            }
        });
    });

    /* Test Suite 2: Menu */  
    describe('The menu', function () {
        let feedContainer = document.querySelector('body');
        let menuIcon = document.querySelector('.menu-icon-link');
        
        // Test 1: Menu is hidden by default
        it('is hidden by default', function () {
            // the menu is hidden by adding a class to the body, 
            // so we'll check if it has that class
            // expect(feedContainer.hasClass('menu-hidden')).toBe(true);
            expect(feedContainer.className).toContain('menu-hidden');
        });

        // Test 2: Menu is shown and then hidden by clicking on the menu icon button
        it('changes visibility on click', function () {
            // click a first time and check
            menuIcon.click();
            expect(feedContainer.className).not.toContain('menu-hidden');
            // click a second time and check
            menuIcon.click();
            expect(feedContainer.className).toContain('menu-hidden');
        });
    });

    /* Test Suite 2: Initial Entries */  
    describe('Initial Entries', function () {
       // the use of beforeEach is important because we're dealing with async functions
       // BeforeEach test, do the following:
        beforeEach( function (done) {
            // uses the done() to tell the beforeEach that the other action has been finished
            loadFeed(0, function () {
                // make sure loadFeed is done before getting on with the following things
                done();
            });
        });

        // test 1: Check if there's at least one feed entry after the loadFeed function is called
        it('has at least one entry', function () {
            // all .entry elements inside .feed elements in DOM
            // let entries = $('.feed .entry');
            let entries = document.querySelector('.feed').getElementsByClassName('entry');
            // test: there should be at least 1 of those elements in DOM, indicating 
            // that the loadFeed function was properly done
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    /* Test Suite 3: New Feed Selection */  
    describe('New Feed Selection', function () {
        let firstFeed;
        let secondFeed;
        
        // the use of beforeEach is important because we're dealing with async functions
        // BeforeEach test, do the following:
        beforeEach( function (done) {
            // call loadFeed() for a first time
            loadFeed(0, function () {
                // store the first feed into the firsFeed variable
                firstFeed = document.querySelector('.feed').innerHTML;
                // call loadFeed() again
                loadFeed(1, function () {
                    // store the second retrieved feed into the secondFeed variable
                    secondFeed = document.querySelector('.feed').innerHTML;
                    // call the done() after everything needed is already on the DOM
                    done();
                });
            });
        });

        // test if the content of each feed is different (just compare the variables)
        // test 1: when a new feed is loaded, the content actually changes
        it('feeds are different from one another', function () {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());
