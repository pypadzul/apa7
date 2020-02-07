function updateUserProgress(data) {
  var host = getQueryStringParam('h');
  var msg = {
      lti: data
  };

  // if a host is defined then that means it's an LTI user.  We persist their current progress to sessionStorage and relay the status to parent window
  if (host) {
      persistToSessionStorage(data);
      window.top.postMessage(msg, host)
  }
}

function getQueryStringParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getCurrentProgressFromStorage() {
  var result = null;
  var sourcedId = getQueryStringParam('sourcedId');

  if (sourcedId) {
      var currentProgress = sessionStorage.getItem('progress-'+sourcedId);

      if (currentProgress) {
          result= JSON.parse(currentProgress);
      }
  }

  return result;
}

function persistToSessionStorage(data) {
  var sourcedId = getQueryStringParam('sourcedId');

  if (sourcedId) {
      sessionStorage.setItem('progress-'+sourcedId, JSON.stringify(data));
  }
}
