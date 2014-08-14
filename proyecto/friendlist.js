(function() {
    
    Titanium.Facebook.appid = "134793934930";
    Titanium.Facebook.permissions = ['publish_stream', 'read_stream', 'user_photos', 'friends_photos'];
 
    Titanium.Facebook.addEventListener('login', function(e) {
        if(e.success) {
            getAlbumCovers();
            return;
        } else if(e.error || e.cancelled) {
            return;
        }
    });
    
    var mainWindow = Ti.UI.createWindow({
            title : 'Tab 1',
            backgroundColor : '#fff'
        })
        ,
        tableview = Ti.UI.createTableView({
            backgroundColor : 'transparent',
            rowBackgroundColor : 'white'
        })
        ,
        activityIndicator = Ti.UI.createActivityIndicator({
        	message:' Loading...',
        })
        ,
        fb_button = Ti.Facebook.createLoginButton();
 
    function setupWindow() {
        mainWindow.add(activityIndicator);
        if(!Titanium.Facebook.loggedIn) {
            
            mainWindow.add(fb_button);
 
        } else {
            mainWindow.remove(fb_button);
            getAlbumCovers();
            mainWindow.add(tableview);
        }
 
        mainWindow.open();
    }
 
    function getAlbumCovers() {
        activityIndicator.show();
        Ti.API.debug(Titanium.Facebook.accessToken);
 
        Titanium.Facebook.requestWithGraphPath('me/albums', {
            fields : 'id,name,cover_photo,count,created_time'
        }, 'GET', function(e) {
 
            if(e.success) {
 
                Ti.API.debug(e.result);
 
                if(e.result) {
                    
                    var rows = [];
                    
                    var data = JSON.parse(e.result).data;
                    for(x in data) {
                        Ti.API.debug(JSON.stringify(data[x]));
 
                        var row = Titanium.UI.createTableViewRow({
                            width : '100%',
                            height : 'auto'
                        });
                        var image = Titanium.UI.createImageView({
                            image : "https://graph.facebook.com/" + (data[x].cover_photo || 0) + "/picture?access_token=" + Ti.Facebook.accessToken,
                            top : 0,
                            left : 0,
                            width : 100,
                            height : 100
                        });
                        var title = Titanium.UI.createLabel({
                            text : String.format("%s (%d)", data[x].name, data[x].count),
                            top : 0,
                            left : 110,
                            width : 'auto',
                            height : 'auto'
                        });
                        row.add(image);
                        row.add(title);
                        rows.push(row);
                    }
                    
                    tableview.setData(rows);
                }
 
            } else if(e.cancelled) {
                Ti.API.debug("user cancelled");
            } else {
                Ti.API.debug(e.result);
            }
            activityIndicator.hide();
        });
    }
 
 
    setupWindow();
 
})();