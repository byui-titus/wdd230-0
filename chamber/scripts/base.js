let oLastModif = new Date(document.lastModified);
document.querySelector("#lastModified").textContent = oLastModif;

const options = {
	year: "numeric"
  };
  document.querySelector("#yearDate").innerHTML =  new Date().toLocaleDateString("en-US", options);
  
document.addEventListener('DOMContentLoaded', function () {
	const hamburgerBtn = document.getElementById('menu');
	const mainMenu = document.querySelector('.navigation');
  
	hamburgerBtn.addEventListener('click', function () {
		mainMenu.style.display = 
		(mainMenu.style.display === 'none' || mainMenu.style.display === 'block') ? 
		'' : 'block';
	});
  });

const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#fig1");

const url = `https://api.openweathermap.org/data/2.5/weather?lat=0.4004382776169058&lon=32.47878626329907&appid=0782fecc58388e8fce1d91ab43807e18&units=metric`;
const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=0.4004382776169058&lon=32.47878626329907&appid=0782fecc58388e8fce1d91ab43807e18&units=metric`;

async function weatherapiFetch() {
	try {
	  const response = await fetch(url);
	  if (response.ok) {
		const data = await response.json();
		console.log(data); //Testing only
		displayResults(data); // uncomment when ready
	  } else {
		throw Error(await response.text());
	  }
	} catch (error) {
	  console.log(error);
	}
  }
  
  function displayResults(data) {
	currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;
	const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
	let desc = data.weather[0].description;
	weatherIcon.setAttribute("src", iconsrc);
	weatherIcon.setAttribute("alt", "weather icon");
	captionDesc.textContent = `${desc}`;
  }
  
  async function forecastapiFetch() {
	try {
	  const response = await fetch(url1);
	  if (response.ok) {
		const data = await response.json();
		console.log(data); //Testing only
		displayForecast(data); // uncomment when ready
	  } else {
		throw Error(await response.text());
	  }
	} catch (error) {
	  console.log(error);
	}
  }

  weatherapiFetch();
forecastapiFetch();
forecastdates();

/*>>> It first selects all the images with the class lazy. 

>>>It then checks if the IntersectionObserver API is supported. If it is, it creates an 
observer that will observe each lazy image. When an image enters the viewport 
(i.e., intersects with the viewport), it replaces the data-src and data-srcset attributes 
with src and srcset, respectively, effectively loading the image.

>>>If the browser does not support IntersectionObserver, it just loads all images immediately*/
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // For browsers that don't support IntersectionObserver
        // You can load all images immediately
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");
        });
    }
});
/* DISCOVER - LAST VISIT */
document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const lastVisit = localStorage.getItem('lastVisit');
    const messageElement = document.getElementById('lastVisitP');

    if (!lastVisit) {
      messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysBetween = Math.floor((now - new Date(lastVisit)) / (1000 * 60 * 60 * 24));
      if (daysBetween === 0) {
        messageElement.textContent = "Back so soon! Awesome!";
      } else {
        const message = daysBetween === 1 ? `You last visited 1 day ago.` : `You last visited ${daysBetween} days ago.`;
        messageElement.textContent = message;
      }
    }

    localStorage.setItem('lastVisit', now);
  });


