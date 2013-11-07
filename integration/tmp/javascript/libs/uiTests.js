/**
 * uiTests.js provides set of general UI tests  
 *
 */

#import "tuneup_js/tuneup.js"


/**
 * Function testTabBar - simply checks if there is a required view controller after tab bar item click.  
 *
 * @param app
 * @param tabBarItem - name of Tab bar item to be tested
 * @param navigationItem - desired view controller name
 */

function testTabBarItem(app, tabBarItem, navigationItem) {
    	
	UIALogger.logMessage("Select the " + tabBarItem + " tab.");
    	
	var tabBar = app.tabBar();
    	var selectedTabName = tabBar.selectedButton().name();
    	
	if (selectedTabName != tabBarItem) {
        	tabBar.buttons()[tabBarItem].tap();
    	}

    	target.delay(2);
    	
	//-- Assert that the app has navigated into the required view controller
	var window = app.mainWindow();
	assertEquals(navigationItem, window.navigationBars()[0].name());
}