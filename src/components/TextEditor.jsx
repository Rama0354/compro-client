import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({value,onChange}) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image','code-block','video'],
            ['clean']
        ],
    }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image','code-block','video'
    ]
    return (
        <>
            <ReactQuill className='h-96 w-full mb-16' theme="snow" modules={modules} formats={formats} value={value} onChange={onChange} />
        </>
    )
}

export default TextEditor