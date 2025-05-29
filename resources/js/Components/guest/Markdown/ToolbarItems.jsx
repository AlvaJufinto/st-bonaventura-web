import { useCallback } from 'react';

import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Play,
  Quote,
  Redo,
  Type,
  Underline,
  Undo,
} from 'lucide-react';

import ToolbarButton from './ToolbarButton';

const ToolbarItems = ({
  onContentChange,
  editorRef,
  activeFormats,
  executeCommand,
}) => {
  const addYouTubeEmbed = useCallback(() => {
    const url = prompt(
      "Enter YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID):"
    );
    if (!url) return;

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*)/,
      /youtube\.com\/v\/([^#&?]*)/,
      /youtube\.com\/user\/[^\/]*#.*\/([^#&?]*)/,
      /youtube\.com\/.*[?&]v=([^#&?]*)/,
    ];

    let videoId = null;
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1].length === 11) {
        videoId = match[1];
        break;
      }
    }

    if (videoId) {
      const embedHtml = `<div data-youtube-video style="margin: 2rem 0; position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 0.75rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);"><iframe src="https://www.youtube.com/embed/${videoId}?feature=oembed" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerpolicy="strict-origin-when-cross-origin" ></iframe></div>`;
      const editor = editorRef.current;
      if (editor) {
        editor.focus();
        document.execCommand("insertHTML", false, embedHtml);
        setTimeout(() => {
          onContentChange(editor.innerHTML);
        }, 0);
      }
    } else {
      alert(
        "Invalid YouTube URL. Please use a valid YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)"
      );
    }
  }, [onContentChange]);

  const addEmbedLink = () => {
    const editor = editorRef.current;

    if (editor) {
      editor.focus();

      const url = prompt("Masukkan URL tujuan:");
      if (!url) return;

      const linkText = prompt("Masukkan teks untuk tautan:");
      if (!linkText) return;

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.textContent = linkText;

      a.onclick = (e) => {
        e.preventDefault();
        window.open(a.href, "_blank");
      };

      a.style.color = "blue";
      a.style.textDecoration = "underline";
      a.style.cursor = "pointer";

      range.deleteContents();
      range.insertNode(a);

      range.setStartAfter(a);
      range.setEndAfter(a);
      selection.removeAllRanges();
      selection.addRange(range);

      onContentChange(editor.innerHTML);
    }
  };

  const toolbarItems = [
    {
      icon: <Type className="h-4 w-4" />,
      action: () => executeCommand("formatBlock", "p"),
      tooltip: "Paragraph",
      formatKey: "paragraph",
    },
    {
      icon: <div className="text-sm font-bold">H1</div>,
      action: () => executeCommand("formatBlock", "h1"),
      tooltip: "Heading 1",
      formatKey: "heading1",
    },
    {
      icon: <div className="text-sm font-semibold">H2</div>,
      action: () => executeCommand("formatBlock", "h2"),
      tooltip: "Heading 2",
      formatKey: "heading2",
    },
    {
      icon: <Bold className="h-4 w-4" />,
      action: () => executeCommand("bold"),
      tooltip: "Bold",
      formatKey: "bold",
    },
    {
      icon: <Italic className="h-4 w-4" />,
      action: () => executeCommand("italic"),
      tooltip: "Italic",
      formatKey: "italic",
    },
    {
      icon: <Underline className="h-4 w-4" />,
      action: () => executeCommand("underline"),
      tooltip: "Underline",
      formatKey: "underline",
    },
    {
      icon: <Quote className="h-4 w-4" />,
      action: () => executeCommand("formatBlock", "blockquote"),
      tooltip: "Quote",
      formatKey: "blockquote",
    },
    {
      icon: <List className="h-4 w-4" />,
      action: () => executeCommand("insertUnorderedList"),
      tooltip: "Bullet List",
      formatKey: "bulletList",
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      action: () => executeCommand("insertOrderedList"),
      tooltip: "Numbered List",
      formatKey: "orderedList",
    },
    {
      icon: <Undo className="h-4 w-4" />,
      action: () => executeCommand("undo"),
      tooltip: "Undo",
    },
    {
      icon: <Redo className="h-4 w-4" />,
      action: () => executeCommand("redo"),
      tooltip: "Redo",
    },
    {
      icon: <Play className="h-4 w-4" />,
      action: addYouTubeEmbed,
      tooltip: "Embed YouTube Video",
    },
    {
      icon: <Link className="h-4 w-4" />,
      action: addEmbedLink,
      tooltip: "Embed External Link",
    },
  ];

  return toolbarItems.map((item, index) => (
    <ToolbarButton key={index} activeFormats={activeFormats} {...item} />
  ));
};

export default ToolbarItems;
