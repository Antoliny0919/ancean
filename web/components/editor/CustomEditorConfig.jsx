import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import { forcedChangeValue } from './modules/editor';
import { uploadImage } from '../../api/image';
import { createReactEditorJS } from 'react-editor-js';
import Image from '@editorjs/image';
import CodeTool from '@editorjs/code';
import Header from '@editorjs/header';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';

const EditorJS = createReactEditorJS();

export default function CustomEditorConfig({ imageUploader, content }) {
  const dispatch = useDispatch();

  const { instance } = useSelector(({ editor }) => editor);

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
            return imageUploader(file, uploadImage, false);
          },
        },
      },
    },
    quote: Quote,
    inlineCode: InlineCode,
  };

  const handleInitialize = useCallback((instance) => {
    dispatch(forcedChangeValue({ name: 'instance', value: instance }));
  }, []);

  useEffect(() => {
    if (instance && content.length !== 0) {
      instance.render({ blocks: content });
    }
    return () => {
      instance && instance.destroy;
    };
  }, [content, instance]);

  return (
    <EditorJS
      onInitialize={handleInitialize}
      tools={TOOLS}
      placeholder={'포스트 작성...'}
    />
  );
}
