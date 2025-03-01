import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

export default function RTE({ name, control, label, defaultvalue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="ndtnwezczdj7q7fbcc0ymue993yzbw2fgg3614acvtrt6t5m" 
            initialValue={defaultvalue}
            init={{
              selector: 'textarea',  
              height: 500,
              menubar: false,
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks", "code",
                "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
              ],
              toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              branding: false,  
            }}
            onEditorChange={(content) => onChange(content)}
          />
        )}
      />
    </div>
  );
}
