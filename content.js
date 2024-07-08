chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'checkSecurity') {
      let result = 'Secure';
      if (window.location.protocol !== 'https:') {
        result = 'Insecure: Uses HTTP';
      } else {
        fetch('http://127.0.0.1:5000/check_phishing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: window.location.href })
        })
        .then(response => response.json())
        .then(data => {
          if (data.is_phishing) {
            result = 'Warning: This site may be a phishing site!';
          }
          sendResponse({ result: result });
        })
        .catch(error => {
          console.error('Error:', error);
          sendResponse({ result: 'Error checking phishing status.' });
        });
        return true;  // Will respond asynchronously.
      }
    }
  });
  