/**
 * img_cmp.js provides functions to compare the images  
 *
 */

function compareImages(img1, img2) {

	var host = target.host();
 
	var result = host.performTaskWithPathArgumentsTimeout("/usr/local/bin/compare", ["-metric", "MAE", img1, img2, "diff"], 5);

	var res = new Object();
	res['exitCode'] = result.exitCode;
        res['stdout'] = result.stdout;
        res['stderr'] = result.stderr;

	return res;
}


function isPlaying(target, rect) {

	var host = target.host();

	target.captureRectWithName(rect, "screenShot0");	
	target.captureRectWithName(rect, "screenShot1");	
	
	// Wait for views capture
	target.delay(3);

	var result = host.performTaskWithPathArgumentsTimeout("/bin/bash", ["./integration/javascript/libs/getCurrentFolder.sh"], 5);

	UIALogger.logMessage("exitCode: " + result.exitCode);
	UIALogger.logMessage("stdout: " + result.stdout);
	UIALogger.logMessage("stderr: " + result.stderr);

	var currentFolder = result.stdout.toString();        
	var basePath = "integration/tmp/results/";	
	
	var imgPath0 = basePath + currentFolder + "/screenShot0.png";
	var imgPath1 = basePath + currentFolder + "/screenShot1.png";

	UIALogger.logMessage("Path of captured images: " + imgPath0);

	var res = compareImages(imgPath0, imgPath1);
	UIALogger.logMessage("Comparing the image with the reference one.." + res.stderr);

	if (res.stderr == "0 (0)") {
		return 0;
	} else {
		return 1;
	} 
}
