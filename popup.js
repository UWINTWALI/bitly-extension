document.getElementById('shorten').addEventListener('click', function () {
  const url = document.getElementById('url').value;
  shortenUrl(url);
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
        document.getElementById('result').innerHTML =
          '<span style="color: green">Shortened URL: </span>' + data.link;
      } else {
        document.getElementById('error').innerHTML =
          '<span style="color:red">Error: </span>' + data.message;
      }
    });
}
