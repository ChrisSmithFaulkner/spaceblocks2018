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
	ext.get_temp_data = function(callback) {
		callback();
	};
	ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?request=execute&identifier=SinglePoint&parameters=T2M&startDate=20160301&endDate=20160301&userCommunity=SSE&tempAverage=DAILY&outputList=JSON,ASCII&lat=36&lon=45&user=anonymous',
              dataType: 'json',
              success: function( data ) {
                  // Got the data - parse it and return the temperature
		   features = data["features"];
            	   properties = features["properties"];
            	   parameter = properties["T2M"];
                  //temperature = parameter["20160301"];
                  callback(5);
              }
        });
    };
     // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'wait for random time', 'wait_random'],
			['W', 'return temp value', 'get_temp_data'],
			['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
        ]
    };
     // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})();
