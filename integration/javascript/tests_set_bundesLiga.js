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
 * @param - list of desired matches to set the reminder, e.g. testErinnerungen(0,3,4);
 */

function testErinnerungen() {
	
	var args = arguments;
	
	test("Test Erinnerungen", function(target, app) {
		
		target.delay(2);

		//-- Tap on Spieltage/Videos tab
		testTabBarItem(app, "Spieltage/Videos", "12. Spieltag");

		target.delay(2);
		
		//-- Tap on Erinnerungen icon
		var window = app.mainWindow();
		var collectionView = window.collectionViews()[0];
		
		for (var i = 0; i < args.length; i++) 
		{	
			collectionView.cells()[args[i]].buttons()[0].tap();
			target.delay(2);
		}
		
		target.delay(2);

		//-- Tap on Erinnerungen tab
		testTabBarItem(app, "Erinnerungen", "Erinnerungen");
		
		//-- Assert that the count of Erinnerungen is correct
		UIALogger.logMessage("Assert that the count of Erinnerunge is : " + args.length);
		var window = app.mainWindow();
		assertEquals(args.length, window.tableViews()[0].cells().length);

		target.delay(3);
				
		//-- Tap on Spieltage/Videos tab
		testTabBarItem(app, "Spieltage/Videos", "12. Spieltag");
		
		target.delay(3);

	});
}

/**
 * Function testInfoViewControllerStructure  - checks the structure on Info view controller
 * 
 */

function testInfoViewControllerStructure() {
	test("Test the structure on Info VC", function(target, app) {
	
		target.delay(2);

		//-- Tap on Spieltage/Videos tab 
		testTabBarItem(app, "Info", "InfoTableView");
		
		target.delay(2);	
		
		assertWindow({
		    tableViews: [
	      		{
					cells: [
	  		          { name: "Nutzungsbedingungen" },
	  		          { name: "FAQ" },
	  				  { name: "Datenschutz" },
	  				  { name: "Jugendschutz" },
	  				  { name: "Impressum" }
	  		        ]
	      	  	},
				{ name: "Empty list" }
			]
		});

	});
}

/**
 * Function testInfoViewControllerContent  - checks the content on Info view controller for individual menu items 
 * 
 */

function testInfoViewControllerContent(menuItem, refNavigationItem, refHeader) {
	test("Test the content on Info VC", function(target, app) {
	
		target.delay(2);

		//-- Tap on Spieltage/Videos tab 
		testTabBarItem(app, "Info", "InfoTableView");
		
		target.delay(2);	
		
		//-- Tap on menu item
		var window = app.mainWindow();
		window.tableViews()[0].cells()[menuItem].tap();
			
		target.delay(2);	
		
		var navigationItem = window.navigationBars()[1].name();
		var header = window.tableViews()[1].cells()[0].webViews()[0].staticTexts()[0].name();
		
		assertEquals(refNavigationItem, navigationItem);
		assertEquals(refHeader, header);
		
	});
}

/**
 * Function testBundesligaLiveVCStructure  - checks the structure on testBundesligaLiveVCStructure view controller
 * 
 */

function testBundesligaLiveVCStructure() {
	test("Test the structure of BundesligaLive VC", function(target, app) {
		
		target.delay(2);

		//-- Tap on Bundesliga live tab 
		testTabBarItem(app, "Bundesliga live", "Bundesliga live");
		
		target.delay(2);	
		
		assertWindow({
			navigationBar: { name: "Bundesliga live" },
		    buttons: [
				{ name : "Play Icon Large" },
				{ isValid : 1 }
			],
			collectionViews: [
				{ 
					cells: [
	  		          { isValid: 1 },
	  		          { isValid: 1 },
	  				  { isValid: 1 },
	  				  { isValid: 1 },
	  				  { isValid: 1 },
	  		          { isValid: 1 },
	  		          { isValid: 1 },
	  				  { isValid: 1 },
	  				  { isValid: 1 },
	  				  { isValid: 1 }
	  		        ]
				}
			],
			scrollViews: [
				{
					collectionViews: [
						{ isValid: 1 }
					]
				}
			]
		});

	});
}







