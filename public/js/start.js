(function(page){
  if (window) {
    window.onload = function() {
      console.log("Window Loaded.");
      page.load();
    }.bind(page);
  }
})(new StartPage());

function StartPage() {
  this.activeUserPage = 0;
  this.maxPages = 0;
  this.selectedUser = null;
  this.selectedType = null;
  
  this.load = function() {
    var pages = document.getElementsByClassName("user_page");
    if (!pages) return;
    this.maxPages = pages.length-1;

    for (i = 0; i < pages.length; i++) {
      var left = document.getElementById("left_" + i);
      var right = document.getElementById("right_" + i);
      
      left.onclick = function() {
        this.nextPageLeft(document.getElementById("user_page_" + this.activeUserPage));
        return; 
      }.bind(this);

      right.onclick = function() { 
        this.nextPageRight(document.getElementById("user_page_" + this.activeUserPage));
        return; 
      }.bind(this);
    }
    var users = document.getElementsByClassName("user");
    if (!users) return;

    for (i = 0; i < users.length; i++) {
      var user = users[i];
      context = this;
      user.onclick = function() {
        context._unselect.bind(context)();
        context.selectedUser = this;
        this.classList.remove("user_unselected");
        this.classList.add("user_selected");
        context._setGoLink.bind(context)();
        return;
      }
    }
    var types = document.getElementsByClassName("type");
    if (!types) return;

    for (i = 0; i < types.length; i++) {
      var type = types[i];
      context = this;
      type.onclick = function() {
        context._unselectType.bind(context)();
        context.selectedType = this;
        this.classList.remove("option_unselected");
        this.classList.add("option_selected");
        context._setGoLink.bind(context)();
        return;
      }
    }
    return; 
  };
  this.nextPageLeft = function(activePage) {
    if (!activePage) return;
    //this._unselect(this);
    if (this.activeUserPage+1 > this.maxPages) {
      this.activeUserPage = 0;
    }
    else {
      this.activeUserPage += 1;
    }
    var nextPage = document.getElementById("user_page_" + this.activeUserPage);
    if (!nextPage) return;
    
    this._setAnimation(activePage, "leaveLeft");
    this._showPage(nextPage);
    this._setAnimation(nextPage, "fromRight");
    setTimeout(function(){this._hidePage(activePage)}.bind(this), 1000);
    return;
  }
  this.nextPageRight = function(activePage) {
    if (!activePage) return;
    //this._unselect.bind(this)();
    if (this.activeUserPage-1 < 0) {
      this.activeUserPage = this.maxPages;
    }
    else {
      this.activeUserPage -= 1;
    }
    var nextPage = document.getElementById("user_page_" + this.activeUserPage);
    if (!nextPage) return;

    this._setAnimation(activePage, "leaveRight");
    this._showPage(nextPage);
    this._setAnimation(nextPage, "fromLeft");
    setTimeout(function(){this._hidePage(activePage)}.bind(this), 1000);
    return;
  };
  this._setGoLink = function() {
    var link = document.getElementById("link_go");
    if (this.selectedType && this.selectedUser) {
      link.href = "http://localhost:4000/" + this.selectedType.dataset.type + "/" + this.selectedUser.dataset.id;
      link.classList.remove("hide");
      return;
    }
    link.classList.add("hide");
    return;
  };
  this._unselect = function() {
    if (this.selectedUser != null) {
      this.selectedUser.classList.remove("user_selected");
      this.selectedUser.classList.add("user_unselected");
      this.selectedUser = null;
    }
    return;
  };
  this._unselectType = function() {
    if (this.selectedType != null) {
      this.selectedType.classList.remove("option_selected");
      this.selectedType.classList.add("option_unselected");
      this.selectedType = null;
    }
    return;
  };
  this._stripAnimation = function(page) {
    page.classList.remove("fromLeft");
    page.classList.remove("fromRight");
    page.classList.remove("leaveLeft");
    page.classList.remove("leaveRight"); 
    page.classList.remove("animated");   
    return; 
  };
  this._setAnimation = function(page, style) { 
    this._stripAnimation(page);
    page.classList.add("animated");
    page.classList.add(style);  
    return; 
  };
  this._hidePage = function(page) {
    page.classList.add("hide");
    page.parentElement.classList.add("hide");
    return; 
  };
  this._showPage = function(page) {
    page.classList.remove("hide");
    page.parentElement.classList.remove("hide");
    return; 
  };
}