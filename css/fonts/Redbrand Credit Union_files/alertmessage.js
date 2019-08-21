
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
    var d = new Date();
  
    if ($) {
    // ** Check to see if there is an alertmessage to load
      var getPageId = (divContentId === '' ? '' : ' #' + divContentId);
      var getPageName = pageName + "?t=" + d.getTime() + getPageId;
      // $.get("homecuAlertMessage.html?t=" + d.getTime() + " #alertInclude", function(response, status, xhr) {
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
                                           ' <h4 id="modal-header-title" class="modal-title"></h4> ' +
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
    LoadModalMessage('homecuAlertMessage.html', '#alertInclude', '');
  }
} catch (err) {
}

