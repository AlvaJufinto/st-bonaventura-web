import React from "react";

const EditorContent = React.forwardRef(({ onContentChange }, ref) => {
  const sanitizeHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;

    const allowedTags = [
      "p",
      "h1",
      "h2",
      "b",
      "strong",
      "i",
      "em",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "div",
      "iframe",
      "br",
    ];
    const allowedAttributes = [
      "href",
      "data-youtube-video",
      "src",
      "style",
      "allow",
      "allowfullscreen",
    ];
    const dangerousTags = ["script", "style", "object", "embed"];

    dangerousTags.forEach((tag) => {
      const elements = div.getElementsByTagName(tag);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    });

    const elements = Array.from(div.getElementsByTagName("*"));
    elements.forEach((el) => {
      const tagName = el.tagName.toLowerCase();
      if (!allowedTags.includes(tagName)) {
        const parent = el.parentNode;
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
        return;
      }
      for (let attr of Array.from(el.attributes)) {
        if (!allowedAttributes.includes(attr.name)) {
          el.removeAttribute(attr.name);
        } else if (attr.name === "src" && tagName === "iframe") {
          if (
            !attr.value.match(/^(?:https?:)?\/\/www\.youtube\.com\/embed\//)
          ) {
            el.removeAttribute(attr.name);
          }
        }
      }
    });

    return div.innerHTML;
  };

  const handleInput = () => {
    if (ref.current) {
      onContentChange(ref.current.innerHTML);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");

    let content;
    if (html) {
      content = sanitizeHtml(html);
    } else if (text) {
      // Convert plain text to HTML, preserving line breaks
      content = text.replace(/\n/g, "<br>");
    } else {
      return;
    }

    // Insert content at cursor position
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();

      // Create a temporary div to parse the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;

      // Insert each node from the temp div
      const fragment = document.createDocumentFragment();
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }

      range.insertNode(fragment);

      // Move cursor to end of inserted content
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // Trigger content change
    setTimeout(() => {
      if (ref.current) {
        onContentChange(ref.current.innerHTML);
      }
    }, 0);
  };

  return (
    <div
      ref={ref}
      className="markdown font-secondary min-h-[600px] p-6 focus:outline-none"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyUp={handleInput}
      onPaste={handlePaste}
      aria-label="Markdown editor"
    />
  );
});

export default EditorContent;
