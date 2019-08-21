/* email script */
function sendmail( whom ) {
    window.location.href = "mailto:"+ whom + "@wvngfcu.com";
}

var $ = jQuery.noConflict();

$.fn.inlineStyle = function (prop) {
  return this.prop("style")[$.camelCase(prop)];
};

$.fn.doOnce = function( func ) {
  this.length && func.apply( this );
  return this;
}

function show3rdPartyDisclosure( link, title) {

  var cuName = 'Redbrand Credit Union';

  // ** Set the disclosure statement
  var Disclosure_Statement = "<div align='center'><img class='img-responsive' src='images/logo.png' alt='Redbrand Credit Union Logo'></div><br><ul style='padding: 20px;'><li>By continuing to this link, you will be leaving the " + cuName + ".</li> <li>Links to other websites found on the " + cuName + " site are intended to provide assistance in locating information. " + cuName + " does not endorse, guarantee, or attest to the accuracy of any information provided by these other sites.</li> <li>The credit union is not responsible for the content of these other sites and these sites are in no way operated by " + cuName + ".</li> <li>The privacy and security policies of these linked sites may vary from those of the credit union; therefore, it is advised that you review the privacy information of each site visited.</li></ul>";

  if ($("#warning-modal").length === 0) {

    var modalDiv = ' <div id="warning-modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"> ' +
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
                               ' <div class="col-xs-12 col-sm-6 "><a href="javascript:OpenRemoteLink(\'' + link + '\');" data-role="button" class="btn btn-warning">' + DisplayTitle + '</a></div> ';
    var footerContent =        '' +
'<a href="javasript:void(\'0\');" type="" class="" data-dismiss="modal" role="button">No Thanks</a>' +
'&nbsp;&nbsp;<a href="javascript:OpenRemoteLink(\'' + link + '\');" data-role="button" class="btn btn-warning">' + DisplayTitle + '</a>';

    $('#warning-modal-body-content').html(Disclosure_Statement);
    $('#warning-modal-footer-content').html(footerContent);

    $('#warning-modal').modal();
  }

}
function OpenRemoteLink(link) {

  window.open(link);
  $('#warning-modal').modal('hide');

}


// search script
document.getElementById('search-i').addEventListener('focus', function() {
  $('#search-i').closest('.si-call').addClass('active');
});
document.getElementById('search-i').addEventListener('blur', function() {
  $('#search-i').closest('.si-call').removeClass('active');
});


// Random Images
//   - add image to heroImages
//   - add custom style heroPosition
if ($('.hero')) {
  var heroPath = "images/heros/";
  var heroImages = [
    "1.jpg",
    "2.jpg",
  ];
  var heroPosition = [
    "center center / cover",
    "center center / cover",
  ];
  var r = Math.floor(Math.random() * heroImages.length);
  $('.hero').css("background", "#111 url('"+heroPath+heroImages[r]+"') " + heroPosition[r]);
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

var copydateEl = document.getElementById('copydate')
if (copydateEl) {
  var copydate = new Date().getFullYear();
  copydateEl.innerHTML = copydate;

}

var lg = window.matchMedia("(min-width: 992px)");
function addSearchLink(lg) {
  if (lg.matches) {
    document.getElementById('search-button').removeAttribute("href");
  } else {
    document.getElementById('search-button').setAttribute("href", "search-results.html");
  }
}
addSearchLink(lg);
lg.addListener(addSearchLink)

