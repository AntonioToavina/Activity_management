import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const SoftEditor = ({ setValue, value, field }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data=""
      onChange={(event, editor) => {
        const data = editor.getData();
        setValue({ ...value, [field]: data });
      }}
    />
  );
};

export default SoftEditor;
