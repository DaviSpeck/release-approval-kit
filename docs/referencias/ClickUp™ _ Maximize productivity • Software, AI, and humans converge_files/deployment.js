try {
    var ml_url = "https://lift-ai-js.marketlinc.com/clickup.com/deployment.js";
    var ml_script = document.createElement("script");
    ml_script.type = "text/javascript";
    ml_script.id = "ml_snippet_script_id";
    ml_script.src = ml_url + "?" + Math.floor(Math.random() * 1000000000);
    document.getElementsByTagName("head")[0].appendChild(ml_script);
} catch (e) {/*the endpoint is not available, do nothing*/
}


var ml_ga_load_count = 0;
var ml_ga_load_Interval = setInterval(function(){
	if("ga" in window || ml_ga_load_count > 8){
		clearInterval(ml_ga_load_Interval)
			

				setTimeout(function(){
					try {
						window.ml_tracker = ga.getAll()[0];
						var ml_cstatus = ML_getCookie('vs_conv_ai')
						var ml_score_int = parseInt(ml_cstatus.split('-')[1])
						var ml_vs_band = ""
						if(ml_score_int>60){
							ml_vs_band = "High Intent"
						} else if(ml_score_int>30 && ml_score_int<=60){
							ml_vs_band = "Mid Intent"
						} else{
							ml_vs_band = "Low Intent"
						}

						var ML_vs_vid = ML_getCookie('vs_vid')
						ml_tracker.send("event","Lift AI Score",ml_vs_band, ml_cstatus,{
								nonInteraction: true
							});
						ml_tracker.send("event","Lift AI VID",ML_vs_vid,{
								nonInteraction: true
							});
					} catch (e) {
						// DO Nothing
					}
				},3000)
			

	}
	ml_ga_load_count++;
}, 1000)
