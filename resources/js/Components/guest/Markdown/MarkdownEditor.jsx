import React, { useCallback, useEffect, useRef, useState } from "react";

import { Edit3, Eye, Maximize2, Minimize2 } from "lucide-react";

import { debounce } from "@/utils";

import EditorContent from "./EditorContent";
import ToolbarItems from "./ToolbarItems";

export default function MarkdownEditor({ content, setContent }) {
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);
  const [activeFormats, setActiveFormats] = useState(new Set());
  const [editorContent, setEditorContent] = useState(content || "");

  const editorRef = useRef(null);

  // Update editor content when prop content changes
  useEffect(() => {
    if (content !== editorContent) {
      setEditorContent(content || "");
    }
  }, [content]);

  const debouncedSetContent = useCallback(
    debounce((html) => {
      setContent(html);
      setEditorContent(html);
    }, 10),
    [setContent]
  );

  const updateActiveFormats = () => {
    const formats = new Set();

    try {
      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      if (document.queryCommandState("insertUnorderedList"))
        formats.add("bulletList");
      if (document.queryCommandState("insertOrderedList"))
        formats.add("orderedList");

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let parentElement = range.commonAncestorContainer;

        // If it's a text node, get its parent element
        if (parentElement.nodeType === Node.TEXT_NODE) {
          parentElement = parentElement.parentElement;
        }

        // Check the parent element and its ancestors for formatting
        let current = parentElement;
        while (current && current !== editorRef.current) {
          const tagName = current.tagName?.toLowerCase();
          if (tagName === "h1") formats.add("heading1");
          if (tagName === "h2") formats.add("heading2");
          if (tagName === "blockquote") formats.add("blockquote");
          if (tagName === "p") formats.add("paragraph");
          if (tagName === "a") formats.add("link");
          current = current.parentElement;
        }
      }
    } catch (error) {
      // Silently handle errors
    }

    setActiveFormats(formats);
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current) {
        updateActiveFormats();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      const editor = editorRef.current;

      // Only handle shortcuts when editor is focused
      if (!editor || document.activeElement !== editor) {
        return;
      }

      if (!e.ctrlKey && !e.metaKey) return;

      switch (e.key.toLowerCase()) {
        case "a":
          e.preventDefault();
          const range = document.createRange();
          range.selectNodeContents(editor);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          break;
        case "b":
          e.preventDefault();
          executeCommand("bold");
          break;
        case "i":
          e.preventDefault();
          executeCommand("italic");
          break;
        case "u":
          if (e.shiftKey) {
            e.preventDefault();
            executeCommand("insertUnorderedList");
          } else {
            e.preventDefault();
            executeCommand("underline");
          }
          break;
        case "k":
          e.preventDefault();
          createLink();
          break;
        case "1":
          e.preventDefault();
          executeCommand("formatBlock", "h1");
          break;
        case "2":
          e.preventDefault();
          executeCommand("formatBlock", "h2");
          break;
        case "q":
          e.preventDefault();
          executeCommand("formatBlock", "blockquote");
          break;
        case "o":
          e.preventDefault();
          executeCommand("insertOrderedList");
          break;
        case "z":
          if (!e.shiftKey) {
            e.preventDefault();
            executeCommand("undo");
          }
          break;
        case "y":
          e.preventDefault();
          executeCommand("redo");
          break;
        // Let native copy/paste work
        case "c":
        case "v":
        case "x":
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const executeCommand = (command, value = null) => {
    const editor = editorRef.current;
    if (editor) {
      editor.focus();
      document.execCommand(command, false, value);
      updateActiveFormats();
      setTimeout(() => {
        debouncedSetContent(editor.innerHTML);
      }, 0);
    }
  };

  // Function to create links
  const createLink = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const selectedText = selection.toString();
    const url = prompt(
      "Enter URL:",
      selectedText.startsWith("http") ? selectedText : ""
    );

    if (url) {
      const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${
        selectedText || url
      }</a>`;
      document.execCommand("insertHTML", false, linkHtml);
      setTimeout(() => {
        debouncedSetContent(editorRef.current.innerHTML);
      }, 0);
    }
  };

  // Alternative paste handler - plain text only dengan line breaks yang bersih
  useEffect(() => {
    const handlePaste = (e) => {
      e.preventDefault();

      // Get clipboard data
      const clipboardData = e.clipboardData || window.clipboardData;

      // Prioritas: ambil plain text dulu
      let pastedData = clipboardData.getData("text/plain");

      if (!pastedData) {
        // Fallback ke HTML jika tidak ada plain text
        pastedData = clipboardData.getData("text/html");

        if (pastedData) {
          // Strip semua HTML tags, tinggalkan text saja
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = pastedData;
          pastedData = tempDiv.textContent || tempDiv.innerText || "";
        }
      }

      if (!pastedData) return;

      // Clean up whitespace
      pastedData = pastedData
        .replace(/\r\n/g, "\n") // Normalize line endings
        .replace(/\r/g, "\n") // Convert remaining \r to \n
        .replace(/\n{3,}/g, "\n\n") // Max 2 consecutive line breaks
        .replace(/[ \t]+/g, " ") // Replace multiple spaces/tabs with single space
        .replace(/[ \t]*\n[ \t]*/g, "\n") // Clean spaces around line breaks
        .trim(); // Remove leading/trailing whitespace

      // Convert line breaks to <br> tags untuk HTML editor
      const htmlContent = pastedData.replace(/\n/g, "<br>");

      // Insert cleaned content
      if (htmlContent) {
        document.execCommand("insertHTML", false, htmlContent);
        setTimeout(() => {
          debouncedSetContent(editorRef.current.innerHTML);
        }, 0);
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("paste", handlePaste);
      return () => editor.removeEventListener("paste", handlePaste);
    }
  }, [debouncedSetContent]);

  useEffect(() => {
    const editor = editorRef.current;

    const handleInput = () => {
      if (editor && editor.innerHTML === "") {
        document.execCommand("formatBlock", false, "p");
      }
    };

    if (editor) {
      editor.addEventListener("input", handleInput);
      return () => editor.removeEventListener("input", handleInput);
    }
  }, []);

  const togglePreviewFullscreen = () => {
    setIsPreviewFullscreen((v) => !v);
    if (isEditorFullscreen) setIsEditorFullscreen(false);
  };

  const toggleEditorFullscreen = () => {
    setIsEditorFullscreen((v) => !v);
    if (isPreviewFullscreen) setIsPreviewFullscreen(false);
  };

  return (
    <div className="min-h-auto">
      <div className="max-w-full mx-auto">
        <div className="bg-white rounded-t-lg shadow border-b sticky top-24 z-10">
          <div className="border-b bg-gray-50 p-3 flex justify-between items-center">
            <div className="flex gap-1 sticky top-0">
              <ToolbarItems
                onContentChange={debouncedSetContent}
                editorRef={editorRef}
                activeFormats={activeFormats}
                executeCommand={executeCommand}
                createLink={createLink}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleEditorFullscreen}
                title="Toggle Editor Fullscreen"
                type="button"
                className="p-2 rounded text-gray-600 hover:bg-gray-100 flex items-center gap-1"
              >
                <Edit3 className="h-4 w-4" />
                {isEditorFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={togglePreviewFullscreen}
                type="button"
                title="Toggle Preview Fullscreen"
                className="p-2 rounded text-gray-600 hover:bg-gray-100 flex items-center gap-1"
              >
                <Eye className="h-4 w-4" />
                {isPreviewFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`flex ${
            isPreviewFullscreen || isEditorFullscreen
              ? "h-full"
              : "min-h-[600px]"
          } bg-white rounded-b-lg shadow border-t-0`}
        >
          <div
            className={`${
              isPreviewFullscreen
                ? "hidden"
                : isEditorFullscreen
                ? "w-full"
                : "w-1/2"
            } border-r border-gray-200 flex flex-col`}
          >
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 font-secondary">
                Editor
              </h3>
            </div>
            <div className="flex-1">
              <EditorContent
                ref={editorRef}
                initialContent={editorContent}
                onContentChange={debouncedSetContent}
              />
            </div>
          </div>

          <div
            className={`${
              isEditorFullscreen
                ? "hidden"
                : isPreviewFullscreen
                ? "w-full"
                : "w-1/2"
            } flex flex-col`}
          >
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 font-secondary">
                Preview
              </h3>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: editorContent }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
