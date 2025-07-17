// components/EditorTexto.jsx
import { Editor } from '@tinymce/tinymce-react';

const EditorTexto = ({ id, label, value, onChange }) => {
    return (
        <div className="col-md-12 mb-3">
            {label && (
                <label htmlFor={id} className="fw-medium">
                    {label}
                </label>
            )}
            <Editor
                id={id}
                apiKey="6maqvdl4g22mglpoc2y9hdz2uwgwhdtkm791sag5z9l1ofoz"
                value={value}
                onEditorChange={onChange}
                init={{
                    height: 300,
                    menubar: true,
                    language: 'pt_BR',
                    language_url: '/langs/pt_BR.js',
                    plugins: 'lists link image code',
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic underline strikethrough | forecolor backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | link image media table emoticons | ' +
                        'charmap insertdatetime | fullscreen preview code | help',
                    content_style:
                        'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
                }}
            />
        </div>
    );
};

export default EditorTexto;