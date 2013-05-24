// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when a message is passed.  We assume that the content script
// wants to show the page action.
function onRequest(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script)
  // was on.
    var tabId = (sender.tab.id > 0)?sender.tab.id:request.tabId;
	chrome.cookies.get({url:"http:www.washingtonpost.com",name:"X-WP-Split"}, function(cookies) {
	if (cookies && cookies.value) {
	  chrome.pageAction.setIcon({tabId:tabId,path:'letter-'+cookies.value+'-icon.png'});
	  chrome.pageAction.setTitle({tabId:tabId,title:'You are on the Beta site!'});
	  chrome.pageAction.show(tabId);
	} else {
	  chrome.pageAction.setIcon({tabId:tabId,path:'letter-a-icon.png'});
	  chrome.pageAction.setTitle({tabId:tabId,title:'You are on the Live site!'});
	  chrome.pageAction.show(tabId);
	}
})
  

  // Return nothing to let the connection be cleaned up.
  //sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  onRequest(request,sender,sendResponse)
  });

