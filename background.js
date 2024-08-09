chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: 'shortenUrl',
    title: 'Shorten with Bitly',
    contexts: ['link'],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'shortenUrl') {
    shortenUrl(info.linkUrl);
  }
});

function shortenUrl(url) {
  const token = 'MY_TOKEN_ACCESS_SECRET_KEY';
  fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ long_url: url }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.link) {
        copyToClipboard(data.link);
        alert('Shortened URL: ' + data.link);
      } else {
        alert('Error shortening URL: ' + data.message);
      }
    });
}

function copyToClipboard(text) {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
