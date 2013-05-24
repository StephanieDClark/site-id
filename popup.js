(function(){
var tabId; 
var onBeta = false;
var onPw = false;

	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  		tabId = tabs[0].id;
	}); 

chrome.cookies.get({url:"http:www.washingtonpost.com",name:"X-WP-Split"}, function(cookies) {

	if (cookies && cookies.value && cookies.value == 'B') {
		document.getElementById('remove_beta').style.display = 'block';
		document.getElementById('add_beta').style.display = 'none'
		onBeta=true;
	} else {
		document.getElementById('remove_beta').style.display = 'none';
		document.getElementById('add_beta').style.display = 'block';
	}
});		

chrome.cookies.get({url:"http:www.washingtonpost.com",name:"rplpwmode"}, function(cookies) {

	if (cookies && cookies.value && cookies.value == '00110001') {
		document.getElementById('remove_pw').style.display = 'block';
		document.getElementById('add_pw').style.display='none';
		onPw=true;
	} else {
		document.getElementById('remove_pw').style.display = 'none';
		document.getElementById('add_pw').style.display = 'block';
	}
});	
function click(e) {
	var t = new Date();

	t.setDate(t.getDate() + 45);
	
 		  		
  switch (e.currentTarget.id)
  {
  	case "add_beta":
  		chrome.cookies.set({url:"http:www.washingtonpost.com",name:"X-WP-Split",value:"B",domain:".washingtonpost.com",expirationDate :t.getTime()});
  		chrome.cookies.set({url:"http:www.washingtonpost.com",name:"x-split-override",value:"B",domain:".washingtonpost.com",expirationDate :t.getTime()});
        chrome.extension.sendMessage({tabId:tabId});
  		break;
  	case "remove_beta":
   		chrome.cookies.remove({url:"http:www.washingtonpost.com",name:"X-WP-Split"});
  		chrome.cookies.remove({url:"http:www.washingtonpost.com",name:"x-split-override"});
        chrome.extension.sendMessage({tabId:tabId});
  		break; 	
  	case "add_pw":
  		chrome.cookies.set({url:"http:www.washingtonpost.com",name:"rplpwmode",value:"00110001",domain:".washingtonpost.com",expirationDate :t.getTime()});
  		break;
  	case "remove_pw":
  		chrome.cookies.remove({url:"http:www.washingtonpost.com",name:"rplpwmode"});
  		break;
  }
  window.close();

}

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('div.buttons');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', click);    
  }
});
})();