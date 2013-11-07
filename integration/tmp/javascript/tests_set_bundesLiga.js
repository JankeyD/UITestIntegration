/**
 * This file contains the set of functions customized for BundesLiga app 
 * to be use for UI testing. 
 *
 */

#import "./libs/img_cmp.js"
#import "./libs/tuneup_js/tuneup.js"
#import "./libs/uiTests.js"


/**
 * Function logElementTree
 */

function showElementTree() {
	var target = UIATarget.localTarget();
	var app = target.frontMostApp();

	app.logElementTree();
}


/**
 * Function testVideoPlaying  - tests if the video player is running
 * 
 */
function testVideoPlaying() {
	test("Test video playing", function(target, app) {
	
		target.delay(2);

    		//-- Play the video
		var window = app.mainWindow();
		window.buttons()["Play Icon Large"].tap();

		target.delay(5);

		var video = window.elements()["Video"];
	
		if (! video.isValid()) {
 	   		UIALogger.logFail("Could not locate video view");    
		} else {
			var rect = video.rect();
			if (isPlaying(target, rect)) {
				UIALogger.logPass("Video is playing.");
			} else {
				UIALogger.logFail("Video is not playing.");
			}
		}	
	});
}



/**
 * Function testTabBar  - tests the Tab bar functionality
 * 
 */

function testTabBar() {
	test("Test Tab bar", function(target, app) {
	
		target.delay(2);

		//-- Tap on Tabellen tab 
		testTabBarItem(app, "Tabellen", "Tabellen");
	
		target.delay(2);		

		//-- Tap on Bundesliga live tab 
		testTabBarItem(app, "Bundesliga live", "Bundesliga live");

		target.delay(2);

	});
}

/**
 * Function testMatchesCount  - tests the count of mathces under Spieltage/Videos tab item
 * 
 * @param refCount - referenced count of matches
 */

function testMatchesCount(refCount) {
	test("Test matches count", function(target, app) {
	
		target.delay(2);

		//-- Tap on Spieltage/Videos tab 
		testTabBarItem(app, "Spieltage/Videos", "12. Spieltag");
		
		target.delay(2);	
			
		//-- Assert that the count of matches is referenced one
		UIALogger.logMessage("Assert that the count of matches is : " + refCount);
		var window = app.mainWindow();
		assertEquals(refCount, window.collectionViews()[0].elements().length);

	});
}

/**
 * Function testTeamsCount  - tests the count of teams under Tabellen tab item
 * 
 * @param refCount - referenced count of teams
 */

function testTeamsCount(refCount) {
	test("Test teams count", function(target, app) {
	
		target.delay(2);

		//-- Tap on Tabellen tab 
		testTabBarItem(app, "Tabellen", "Tabellen");
		
		var window = app.mainWindow();
	
		//-- Filter the cells only
		var teamsCount = 0;

		for (var i = 0; i < window.tableViews()[0].elements().length; i++)
		{	 
			var elementType = window.tableViews()[0].elements()[i];
			if (elementType == "[object UIATableCell]") {
				teamsCount ++;
			}		
		}

		assertEquals(refCount, teamsCount);	

	});
}


/**
 * Function testErinnerungen  - tests setting on / off Errinerungen
 * 
 * @param
 */

function testErinnerungen() {
	test("Test Erinnerungen", function(target, app) {
	
		target.delay(2);

		//-- Tap on Spieltage/Videos tab
		testTabBarItem(app, "Spieltage/Videos", "12. Spieltag");
		
		target.delay(2);
		
		//-- Tap on Erinnerungen icon
		var window = app.mainWindow();
		window.collectionViews()[0].cells()[1].buttons()[0].tap();

		//target.delay(2);

		//-- Tap on Erinnerungen tab
		testTabBarItem(app, "Erinnerungen", "Erinnerungen");

		target.delay(5);

		//-- Tap on Spieltage/Videos tab
		testTabBarItem(app, "Spieltage/Videos", "12. Spieltag");
		
		target.delay(3);

	});
}







