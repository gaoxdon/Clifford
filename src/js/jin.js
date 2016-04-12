(function(){
	var inNav = document.getElementById("inNav");
	var astNav = document.getElementById("listNav");
	var functionNav = document.getElementById("functionNav");
	var functionList = document.getElementById("functionList");
	var searchNav = document.getElementById("searchNav");
	var searchInput = document.getElementById("searchInput");
	var hosLink_Han = document.getElementById("hosLink_Han");
	var hosLink = document.getElementById("hosLink");
	hosLink_Han.addEventListener("touchend",function(){
		if(hosLink.className){
			this.className= "";
			hosLink.className = "";
		}else{
			this.className= "active";
			hosLink.className = "active";
		}
	})
	listNav.addEventListener("touchend",function(){
		var str = inNav.className;
		if(str.indexOf("active")==-1){
			inNav.className = str + " active";
			html.style.width = "100%";
			html.style.height = "100%";
			html.style.overflow = "hidden";
		}else{
			inNav.className = str.replace(" active", "");
			html.style.width = "auto";
			html.style.height = "auto";
			html.style.overflow = "auto";
			hosLink.className = "";
			hosLink_Han.className = "";
		}
	});
	functionNav.addEventListener("touchend",function(){
		var str = inNav.className;
		if(str.indexOf("func")==-1){
			inNav.className = str + " func";
			html.style.width = "100%";
			html.style.height = "100%";
			html.style.overflow = "hidden";
			functionList.style.zIndex = "20";
		}else{
			inNav.className = str.replace(" func", "");
			html.style.width = "auto";
			html.style.height = "auto";
			html.style.overflow = "auto";
			functionList.style.zIndex = "0";
		}
	});
	searchNav.addEventListener("touchend",function(){
		var str = inNav.className;
		if(str.indexOf("search")==-1){
			inNav.className = str + " search";
			html.style.width = "100%";
			html.style.height = "100%";
			html.style.overflow = "hidden";
			searchInput.style.zIndex = "20";
		}else{
			inNav.className = str.replace(" search", "");
			html.style.width = "auto";
			html.style.height = "auto";
			html.style.overflow = "auto";
			searchInput.style.zIndex = "0";
		}
	});
})()

