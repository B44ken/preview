var widget = document.createElement("div")
widget.style.width = "300px"
widget.style.height = "200px"
widget.style.border = "3px solid #333"
widget.style.background = "#fff"
widget.style.borderRadius = "6px"
widget.style.display = "none"
widget.style.position = "absolute"
widget.style.overflow = "hidden"
widget.style.top = "50px"
widget.style.left = "50px"

document.body.appendChild(widget)

document.body.addEventListener("mousemove", event => {
	y=event.clientY
    x=event.clientX
    widget.style.left=(x+5)+"px"
    widget.style.top=(y+5)+"px"
})

document.body.addEventListener("mouseover", event => {
	
	widget.style.display = "none"
	
	const onlyLinks = event.path.filter(e => e.nodeName == "A");
	if (onlyLinks.length == 0) return false;
	
	const url = new URL(onlyLinks[0]);
	const hostname = new URL(onlyLinks[0]).hostname;
	const chost = new URL(window.location.href).hostname;
	if (chost == hostname) return false

	var validScraper = false
	for(i in scrapers) {
		console.log(scrapers)
		if(scrapers[i][0].test(url.href)) validScraper = scrapers[i][1]
	}
	if(validScraper == false) return false
	
	widget.style.display = "block"
	
	console.log("help")
	fetch("https://api.allorigins.win/get?url=" + url.href)
	.then(e => e.json())
	.then(html => {
		dom = new DOMParser().parseFromString(html.contents, "text/html")
		var code = false
		code = validScraper(dom, url.href)
		if(code != false) widget.innerHTML = code
		if(code == false) widget.style.display = "none"
	})
})
