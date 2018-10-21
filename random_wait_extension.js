/* Extension demonstrating a blocking command block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */

new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(callback) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*1000);
    };
	
	ext.power_temp_request = function(lat,lon,) {
		//create POWER url	
		url = 'https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?request=execute&identifier=SinglePoint&parameters=T2M&startDate=20160301&endDate=20160331&userCommunity=SSE&tempAverage=DAILY&outputList=JSON,ASCII&lat='+lat+'&lon='+lon+'&user=anonymous'

		//request data
		$.get(url,{},function(data){
				features = data["features"];
				properties = features["properties"]
				parameters = properties["parameter"]
				tempData = parameters["T2M"]
				callback(tempData["20160301"])
			}, 
			'json');
	};

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'wait for random time', 'wait_random'],
			['R', 'execute POWER API call for temperature', 'power_temp_request',36,45]
        ]

    };

    // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})();
