
  const ACCESS_KEY = '28IjIWtHGNJu7vKtcrkRYm3jJ0WkdVhKApvGkGd33Bs'; 
  const BASE = 'https://api.unsplash.com/search/photos';


  function renderPhotos(photos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    if (!photos || photos.length === 0) {
      gallery.innerHTML = '<p id="status">No results found.</p>';
      return;
    }
    photos.forEach(photo => {
      const img = document.createElement('img');
      img.src   = photo.urls.regular;
      img.alt   = photo.alt_description || photo.user.name;
      img.title = photo.user.name;
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => window.open(photo.links.html, '_blank'));
      gallery.appendChild(img);
    });
  }

  function showError(msg) {
    document.getElementById('gallery').innerHTML =
      `<p id="status" style="color:red;">${msg}</p>`;
  }

  function doSearch(method) {
    const query = document.getElementById('query').value.trim();
    if (!query) { alert('Enter a search term.'); return; }
    if (ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') { alert('Paste your Unsplash Access Key in the script.'); return; }
    document.getElementById('gallery').innerHTML = '<p id="status">Loading…</p>';
    if      (method === 'xhr')   searchXHR(query);
    else if (method === 'fetch') searchFetch(query);
    else                         searchAsync(query);
  }

 // Method 1
  function searchXHR(query) {
    const url = `${BASE}?query=${encodeURIComponent(query)}&per_page=12`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Client-ID ${ACCESS_KEY}`);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        renderPhotos(data.results);
      } else {
        showError(`Error ${xhr.status}: ${xhr.statusText}`);
      }
    };
    xhr.onerror = () => showError('Network error.');
    xhr.send();
  }

//Method 2
  function searchFetch(query) {
    const url = `${BASE}?query=${encodeURIComponent(query)}&per_page=12`;
    fetch(url, { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } })
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(data => renderPhotos(data.results))
      .catch(err => showError(err.message));
  }

  //Method 3
  async function searchAsync(query) {
    const url = `${BASE}?query=${encodeURIComponent(query)}&per_page=12`;
    try {
      const res  = await fetch(url, { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      renderPhotos(data.results);
    } catch (err) {
      showError(err.message);
    }
  }
