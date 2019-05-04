// Include another html file in current file.
// Recognises <div embed-file="filename.html"></div>
embedFile = () => {
  const z = Array.from(document.body.getElementsByTagName("*"));

  z.map((element) => {
    const fileName = element.getAttribute("embed-file");
    if (fileName) {
      // Get the file to embed.
      fetch(fileName)
      .then(res => {return res.text()})
      .then((html) => {
        const parser = new DOMParser();
        const includeDocument = parser.parseFromString(html, "text/html");

        // Extract head and embed in head of parent.
        const includeHead = Array.from(includeDocument.head.childNodes);
        includeHead.map(e => {
          if (!_headContainsElement(e)) {
            if (e.tagName === "SCRIPT") {
              let myScript = document.createElement('script');
              myScript.src = e.getAttribute('src');
              document.head.appendChild(myScript);
            } else {
              document.head.appendChild(e);
            }
          }
        });

        // Extract body from file and embed in parent.
        element.innerHTML = includeDocument.body.innerHTML;
        element.removeAttribute("embed-file");
      });
    }
  });
}

// Checks if an element already exists in header.
_headContainsElement = (element) => {
  const headerElements = document.head.childNodes;

  for (i = 0; i < headerElements.length; i++) {
    if (headerElements[i].isEqualNode(element)) {
      return true;
    }
  }

  return false;
}