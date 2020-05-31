var scraper = document.createElement("div")
scraper.style.width = "300px"
scraper.style.height = "200px"
scraper.style.border = "3px solid #333"
scraper.style.background = "#fff"
scraper.style.borderRadius = "6px"
scraper.style.display = "none"
scraper.style.position = "absolute"
scraper.style.overflow = "auto"
scraper.style.top = "50px"
scraper.style.left = "50px"

document.body.appendChild(scraper)

document.body.addEventListener("mousemove", event => {
    y=event.clientY
    x=event.clientX
    scraper.style.left=(x+5)+"px"
    scraper.style.top=(y+5)+"px"
  })

document.body.addEventListener("mouseover", event => {
  scraper.style.display = "none"

  const onlyLinks = event.path.filter(e => e.nodeName == "A");
  if (onlyLinks.length == 0) return false;
  
  const url = new URL(onlyLinks[0]);
  const hostname = new URL(onlyLinks[0]).hostname;
  const chost = new URL(window.location.href).hostname;
  if (!scrapers[hostname]) return false
  if (chost == hostname) return false

  scraper.style.display = "block"
  
  fetch("https://api.allorigins.win/get?url=" + url.href)
	  .then(e => e.json())
	  .then(html => {
		  dom = new DOMParser().parseFromString(html.contents, "text/html")
		  const code = scrapers[hostname](dom, url.href)
		  if(code != false) { scraper.innerHTML = code }
		  else { scraper.style.display = "none" }
  })
})
