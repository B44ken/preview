/* individual scrapers */
const scrapers = {}

scrapers.push([/youtube\.com\/watch\?v=[A-z1-9]+/, (dom, url) => {
	const videoID = url.split("watch?v=")
	return `<iframe src="https://youtube.com/embed/${videoID[1]}/?autoplay=1"></iframe>`
}])
scrapers.push([/en\.wikipedia\.org\/wiki\/[A-z1-9_]+/, (dom) => {
    const title = dom.querySelector("#firstHeading").innerText
    const contents = dom.querySelector("#toc").innerText.replace(/(\r\n|\n|\r)/gm,"<br>")

	return `
	<h1>${title}</h1>
	<p>${contents}</p>
	`
}])
scrapers.push([/github\.com\/[A-z1-9]+\/[A-z1-9]+$/, (dom) => {
    const author = dom.querySelector(".url.fn").innerText
    const title = dom.querySelector(".mr-2.flex-self-stretch").innerHTML
	const desc = dom.querySelector(".text-gray-dark.mr-2").innerText
	
	return `
	<h1><b>${title}</b></h1>
	<h2>from ${author}</h2>
	<p>${desc}</p>
	`
}])