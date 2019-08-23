// only dev server scripts

if (window.location.href.includes('www0') || window.location.href.includes('jorgen')) {
  var demo = true;
  var query = window.location.href.split('?')[1];
      if (window.location.href.includes("#")) {
        query = query.split("#")[0];
      }
  var regionNumbers = ['r1','r2','r3','r4'];
  var regionDescriptions = {
    "r1": "Urban",
    "r2": "Rural Mountainous",
    "r3": "SouthWest",
    "r4": "Coastal"
  };

  if (query === "help") {
    console.log("Please Choose a region between 1 and " + regionNumbers.length);
    console.table(regionDescriptions);
  } else if (query) {
    regionNumbers.forEach(function(r) {
      if (query.includes(r)) {
        window.location.pushState = window.location.href + "?" + r;
        writeCookie(query);
      }
    })
  } else if (document.cookie.includes("region") && !query) {
    var query = document.cookie.split("region=")[1];
        query = query.split(";")[0];
    console.log(query);
    window.location.href = window.location.href + "?" + query;
  }


  if ($('.hero')) {
    var heroPath = "images/demo/heros-" + query + "/";
    var heroImages = [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
    ];
    var heroPosition = [
      "center center / cover",
      "center center / cover",
      "center center / cover",
      "center center / cover"
    ];
    var r = Math.floor(Math.random() * heroImages.length);
    if (heroImages.length > 0) {
      $('.hero').css("background", "#111 url('"+heroPath+heroImages[r]+"') " + heroPosition[r]);
    }
  }


}
function writeCookie(query) {
  document.cookie = "region=" + query;
  
}

function checkCookieForRegionNumbers(rNumbers, returnAsBool) {
  regionNumbers.forEach(function(r) {
    if (document.cookie.includes(r)) {
      if (returnAsBool == true) {
        console.log(true)
        return true;
      } else {
        console.log(r)
        return r;
      }
    }
  })
}





var date = new Date();
var fYear = date.getFullYear();
var Y = document.getElementById('Y');
if (Y) {
  Y.innerHTML = fYear;
}

// Random Images
//   - add image to heroImages
//   - add custom style heroPosition

if ($('.hero') && !demo) {
  var heroPath = "images/heros/";
  var heroImages = [
    // "1.jpg",
    // "2.jpg",
    // "3.jpg",
    // "4.jpg",
  ];
  var heroPosition = [
    // "center center / cover",
    // "center top / cover",
    // "center top / cover",
    // "center bottom / cover"
  ];
  var r = Math.floor(Math.random() * heroImages.length);
  if (heroImages.length > 0) {
    $('.hero').css("background", "#111 url('"+heroPath+heroImages[r]+"') " + heroPosition[r]);
  }
}


// Navigation




  // MENU OVERLAY

  var ol = document.getElementById('overlay');
  var nav = document.getElementById('nav');

  function overlay() {
    if ($(ol).hasClass('')) {
      ol.className = "active";
      nav.classList.add('active');
      document.querySelector('#navBtn').classList.add("active");
    } else if ($(ol).hasClass('active')) {
      ol.className = '';
      nav.classList.remove('active');
      document.querySelector('#navBtn').classList.remove("active");
    }
  }
  navBtn.addEventListener("click", function() {
    overlay();
  });
  ol.addEventListener("click", function() {
    $(slideMenu).removeClass('active');
    active = false;
    overlay();
  });


// On scroll adds overlay to header 
$(window).on('scroll', function(x) {
  var sPos = $(window).scrollTop();
  var headerHeight = $('header').css('height');
      headerHeight = Number(headerHeight.split('px')[0]);
  var maHeight = $(window).height();
  var changeHeight = maHeight - headerHeight;
  if (sPos >= 97 && sPos <= changeHeight) {
    $('header').addClass('scrolling');
  } 
  else if (sPos >= changeHeight) {
    $('header').addClass('scrolling2');
  } 
  else {
    $('header').removeClass('scrolling');
    $('header').removeClass('scrolling2');
  }
});


// Adds extra tab features
function checkScrollPos() {
  if (location.hash) {
    $('header').addClass('scrolling', 'scrolling2')
  }
}

var tabCheck = document.getElementById('v-pills-tab');
if (tabCheck) {
  document.addEventListener('DOMContentLoaded', hashTabChange());
} else {
  checkScrollPos();
}
function hashTabChange() {
  var url = window.location.href;
  var lastPage = ['1', '2'];

  // Creates hash based off link id and changes url on tab clicks
  $('.nav-link').on('click', function() {
    var hashId = $(this).attr('id').split('-');
    var hashWords = hashId.length - 1;
    var newHash = '';
    for (x = 0; x < hashWords; x++) {
      if (x === 0) {
        newHash = hashId[x];
      } else {
        newHash = newHash + '-' + hashId[x];
      }
    }
    window.location.hash = newHash;
  });

  // finds links to tabs within the page (.text) that link to current page's tabs 
  // and reloads the browser page on tab clicks 
  // (may not be working on ie, test further before using)
  /*
  $('.text a').each(function() { 
    if ($(this).attr('href').charAt(0) == '#') {
      $(this).on('click', function() { location.reload() }); 
    }
  });
  */

  if (url.includes('#')) {
    var hashURL = url.split('#')[1];
    if ((hashURL != '') && ($('#'+hashURL+'-c'))) {
      var initials = [
          '.nav-link.active', 
          '.tab-pane.active.show'
        ]
          initials.forEach(function(i) {
            $(i).removeClass('active');
            $(i).removeClass('show');
          })
          $('#'+hashURL+'-c').addClass('active show');
          $('#'+hashURL+'-tab').addClass('active show');
    }
  }
}





//************ Cookies 
//**********
//******

var pageURL = window.location.pathname;
  pageURL = pageURL.split('/');
  pageURL = pageURL[pageURL.length - 1];

function setCookie(cname, cvalue, days) {
  var date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  var expires = "expires="+ date.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";pathe/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var cook = ca[i];
    while (cook.charAt(0) == ' ') {
        cook = cook.substring(1);
    }
    if (cook.indexOf(name) == 0) {
        return cook.substring(name.length, cook.length);
    }
  }
  return "";
}

/**
 * Add a new cookie ad here
 *   add name to array (this will also be used to call the function through adding a class).  
 *   add new '_int' variable
 */
var loanTypeArray = ['car', 'hol']; //Removed 'mor'
var car_int = Number(getCookie('car_int'));
// var mor_int = Number(getCookie('mor_int'));
var hol_int = Number(getCookie('hol_int'));

function countem(cookieName) {
  var vName = Number(getCookie(cookieName)) + 1;
    // GUI debugger lines
    // var countDisplay = cookieName + "_x";
    // document.getElementById(countDisplay).innerHTML = vName;
    // debugger ends
  return vName;
}


var type = document.getElementById('mpType');
var pic = document.getElementById('minipromo-wrapper');
var icon = document.getElementById('mpIcon');
var button = document.getElementById('mpBtn');


// var otherCookies = [];
// loanTypeArray.forEach(function(promo) {
//   var p = Number(getCookie(promo+"_int"));
//   otherCookies.push(p);
// });
// console.log('all others: ' +otherCookies)
// for (i=0; i < loanTypeArray.length; i++) {
//   console.log(otherCookies[i]);
// }

if (/*(car_int >= mor_int) &&*/ (car_int >= hol_int)) {
  // show car (default)
                  /******* HIDDEN FOR NOW **********/
                  // } else if ((mor_int >= car_int) && (mor_int >= hol_int)) {
                  //   type.innerHTML = 'Save more on your mortgage';
                  //   pic.style.background = '#111 url("images/house-sm.jpg") top';
                  //   pic.style.backgroundSize = 'cover';
                  //   icon.className = 'fas fa-home';
                  //   button.href = 'l_mortgage.html';
                  //   button.innerHTML = 'Get Pre-Approved';
                  /*****************/
} else if ((hol_int >= car_int) /*&& (hol_int >= mor_int)*/) {
  type.innerHTML = 'You deserve a break';
  pic.style.background = '#111 url("images/vacation-sm.jpg") center';
  pic.style.backgroundSize = 'cover';
  icon.className = 'far fa-map';
  button.href = 'r_lrates.html';
  button.innerHTML = 'Show me Vacation Rates';
}


function set(loanType) {
  var cookieName = loanType + "_int";
  setCookie(loanType + "_int", countem(cookieName), 84);  
}

loanTypeArray.forEach(function(type) {
  $("." + type).on('click', function() {
    set(type);
  });
});



/**************************************/
/*
/* default scripts
/* -link script
/* -alert script
/*
/**************************************/


function show3rdPartyDisclosure( link, title) {

  

  // ** Set the disclosure statement
  var Disclosure_Statement = "<div align='center'><img class='img-fluid' src='images/logo.png' alt='" + cu_name + " Logo'></div><br><ul><li>By continuing to this link, you will be leaving the " + cu_name + ". <li>Links to other websites found on the " + cu_name + " site are intended to provide assistance in locating information. " + cu_name + " does not endorse, guarantee, or attest to the accuracy of any information provided by these other sites. <li>The credit union is not responsible for the content of these other sites and these sites are in no way operated by " + cu_name + ". <li>The privacy and security policies of these linked sites may vary from those of the credit union; therefore, it is advised that you review the privacy information of each site visited.</ul>";

  if ($("#warning-modal").length === 0) {

    var modalDiv = ' <style>#warning-modal-footer-content { display: flex; width: 100%; align-items: center; justify-content: flex-end; } #warning-modal-footer-content a { margin: 0 10px; } @media (max-width: 576px) { #warning-modal-footer-content { flex-flow: column; } #warning-modal-footer-content a { margin: 10px 0 0 0; }}</style><div id="warning-modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"> ' +
                     ' <div class="modal-dialog modal-lg" role="document"> ' +
                       ' <div class="modal-content"> ' + 
                         ' <div class="modal-header"> ' +
                           ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                             ' <!-- <h4 class="modal-title"></h4> --> ' +
                         '  </div> ' +
                       ' <div class="modal-body"> ' +
                         ' <p id="warning-modal-body-content"></p> ' +
                       ' </div> ' + 
                       ' <div class="modal-footer"> ' +
                         ' <p id="warning-modal-footer-content"></p> ' +
                       ' </div> ' +
                     ' </div> ' +
                   ' </div> ';

    $("body").append(modalDiv);
  }

  if (link.length > 0 ) {

    var DisplayTitle = "Continue" + (title.length > 0 ? " to " + title : "");
    var xfooterContent =        '' +
                               ' <div class="col-xs-12 col-sm-6 "><a href="javasript:void(\'0\');" type="" class="" data-dismiss="modal" role="button">No Thanks</a></div>' +
                               ' <div class="col-xs-12 col-sm-6 "><a href="javascript:OpenRemoteLink(\'' + link + '\');" data-role="button" class="btn btn-primary">' + DisplayTitle + '</a></div> ';
    var footerContent =        '' +

' <a href="javascript:OpenRemoteLink(\'' + link + '\');" data-role="button" class="btn btn-info">' + DisplayTitle + '</a>' +
'<a href="javasript:void(\'0\');" type="" class="" data-dismiss="modal" role="button" style="">No Thanks</a>';
    $('#warning-modal-body-content').html(Disclosure_Statement);
    $('#warning-modal-footer-content').html(footerContent);

    $('#warning-modal').modal();
  }

}
function OpenRemoteLink(link) {

  window.open(link);
  $('#warning-modal').modal('hide');

}


/**
  LoadAlertMessage

  @param pageName - The html script where the content resides
  @param divContentId - A id name of the div content to load 
  @param modalTitle - (optional) title for the message
*/
function LoadModalMessage(pageName, divContentId, modalTitle) {

  /*
   *  Do nothing if the pageName is empty
   */

  try {
    if (pageName === '') {
      throw "Missing Page";
    }
  
    var contentData = '';
    var date = new Date();

    if ($) {
    // ** Check to see if there is an alertmessage to load
      var getPageId = (divContentId === '' ? '' : ' #' + divContentId);
      var getPageName = pageName + "?t=" + date.getTime() + getPageId;
      
      // $.get("homecuAlertMessage.html?t=" + date.getTime() + " #alertInclude", function(response, status, xhr) {
      $.get(getPageName, function(response, status, xhr) {
        try {

          // ** There is an alert message
          if (status === "success") {
  
            // ** Check if there is valid content to show 
            if (typeof response == 'string' || response instanceof String) {
              if (response.trim().length > 0) {
                // ** Add alert-modal to the dom
                if ($("#alert-modal").length === 0) {
      
                  var modalDiv = ' <div id="alert-modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"> ' +
                                 ' <div class="modal-dialog modal-lg" role="document"> ' +
                                     ' <div class="modal-content"> ' +
                                       ' <div class="modal-header"> ' +
                                         ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                                       '  </div> ' +
                                     ' <div class="modal-body"> ' +
                                       ' <p id="modal-body-content"></p> ' +
                                   ' </div> ' +
                                     ' <div class="modal-footer"> ' +
                                     ' <p id="modal-footer-content"></p> ' +
                                     ' </div> ' +
                                   ' </div> ' +
                                 ' </div> ';
              
                  $("body").append(modalDiv);
                }
       
                if (divContentId === '') {
                  contentData = response;
                } else {
                  // Get the content out of data -- surround with a parent div for search ability
                  response = "<div id='local-search-me'>" + response + "</div>";
                  contentData = $(response).find(divContentId).html();
  
                }
    
                if (contentData === undefined) {throw "No content";}
                if (contentData.trim().length > 0) { 
                  // * set the Modal Title -- Always set in case we go from one modal that has a title, to one that doesn't
                  $('#modal-header-title').html(modalTitle);
          
                  // ** Add the alert message to alert-modal
                  $('#modal-body-content').html(contentData);
          
                  $('#alert-modal').modal('show');
                }
              }  // else do nothing empty string
            } // else do nothing not a string
          }
        } catch (err) {
          return false;
        }
      });
    }
  } catch (err) {
    return false;
  }
}

try {
  var pageName = window.location.pathname;
  pageName = pageName.substring(pageName.lastIndexOf('/') + 1);
  if (pageName === '' || pageName === 'index.html') {
    /* ** DEFAULT ALERT MESSAGE ON SCREEN LOAD ** */
    LoadModalMessage('homecuAlertMessage.html', '#alertInclude', 'MEMBER NOTICE');
  }
} catch (err) {
}






