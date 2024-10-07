import React, { memo, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Image from '@editorjs/image';
import CodeTool from '@editorjs/code';
import Header from '@editorjs/header';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';

const EditorBlock = ({ data, onChange, holder }) => {
  const TOOLS = {
    header: Header,
    code: CodeTool,
    warning: Warning,
    marker: Marker,
    image: {
      class: Image,
      config: {
        uploader: {
          uploadByFile(file) {
            console.log(file);
          },
        },
      },
    },
    quote: Quote,
    inlineCode: InlineCode,
  };
  //add a reference to editor
  const ref = useRef();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: TOOLS,
        data,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} />;
};

export default memo(EditorBlock);
