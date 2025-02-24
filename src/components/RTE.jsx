import {Controller} from 'react-hook-form'
import {Editor } from '@tinymce/tinymce-react';
import React from 'react'

export default function RTE({name , control, label, defaultvalue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name={name || "content"}
        control={control}
        render={({field:{onChange}})=>(
          <Editor
          // apiKey="5bazciplbqrjobirgkobjkwdht0htb33plyvms9j9xxlcb1p"  // Add API key here
          apiKey='5bazciplbqrjobirgkobjkwdht0htb33plyvms9j9xxlcb1p'
          initialValue={defaultvalue}
          init={{
            initialValue: defaultvalue,
            height: 500,
            menubar: false,
            plugins: [
              "image", "advlist", "autolink", "lists", "link", "image", "charmap", 
              "preview", "anchor", "searchreplace", "visualblocks", "code", 
              "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "anchor",
            ],
            toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
          }}
          onEditorStateChange={onChange}
        />
        
        )}
        />
    </div>
  )
}
