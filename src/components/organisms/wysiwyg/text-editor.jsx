import { Editor } from "./imports";
import { TextLabel } from "@/components/atoms/typographies/label";
// import { twMerge } from "tailwind-merge";

const TextEditor = ({
  name= "",
  onInit,
  initialValue,
  handleImageUpload,
  className,
  titleClassName,
  onDrop,
  isDisabled,
  formState,
  ...props
}) => {
  const { init, ...rest } = props;

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={titleClassName}>
          {props.title} {!!formState.errors?.[name] && (
            <small className="text-red-500">*{formState.errors?.[name]?.message}</small>
          )}
        </TextLabel>
      ) : null}
      <Editor
        onInit={onInit}
        id={props.id ?? "webapp-text-editor"}
        initialValue={initialValue}
        onDrop={onDrop}
        disabled={isDisabled}
        clasName="col-span-2"
        init={{
          selector: `#${props.id ?? "webapp-text-editor"}`,
          placeholder: init?.placeholder ?? "",
          license_key: "gpl",
          skin_url: `${process.env.NEXT_PUBLIC_BASE_PATH}/tinymce/skins/ui/oxide`,
          menubar: false,
          branding: false,
          promotion: false,
          elementpath: false,
          plugins: [
            "lists",
            "advlist",
            "anchor",
            "autolink",
            "help",
            "image",
            "link",
            "searchreplace",
            "table",
            "wordcount",
            "emoticons",
          ],
          toolbar:
          "image | cut copy paste | " +
          "bold italic underline strikethrough alignleft aligncenter " +
          "alignright alignjustify blocks fontsize | numlist bullist table emoticons | " +
          "help",
          image_title: true,
          images_replace_blob_uris: true,
          images_upload_base_path: "/",
          image_prepend_url: init?.prefixUrl ?? "",
          file_picker_types: "image",
          paste_data_images: true,
          automatic_uploads: true,
          content_style: "body { font-family:Inter }",
          file_picker_callback: handleImageUpload,
          ...init,
        }}
        scriptLoading={{ async: true }}
        {...rest}
      />
    </div>
  );
};

export default TextEditor;