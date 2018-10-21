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
     
	ext.get_temp = function(lat, lon, date, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?request=execute&identifier=SinglePoint&parameters=T2M&startDate='+date+'&endDate='+date+'&userCommunity=SSE&tempAverage=DAILY&outputList=JSON,ASCII&lat='+lat+'&lon='+lon+'&user=anonymous',
              dataType: 'json',
              success: function( data ) {
                // Got the data - parse it and return the temperature
		features = data["features"];
		console.log(features[0]);
		console.log(features[0].properties);
            	properties = features[0].properties;
            	parameter = properties["parameter"];
		temps = parameter["T2M"];
                temperature = temps["20160301"];
                callback(temperature);
              }
        });
    };
	 
     // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature lat: %d long: %d date (YYYYMMDD) : %s', 'get_temp', 36, 45, 20160301],
		
        ]
    };
     // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})();
