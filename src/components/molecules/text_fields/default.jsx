import { TextLabel } from "@/components/atoms/typographies/label";
import { InputAdornment, TextField } from "@mui/material";
import { useController } from "react-hook-form";
// import { IconInfo } from "@/components/atoms/icons/info";
import IconInfo from '@mui/icons-material/Info';
// import { twMerge } from "tailwind-merge";

export const TextFieldDefault = ({
  name = "",
  control = null,
  defaultValue,
  className,
  titleClassName,
  maxLength,
  showLength,
  isNumericOnly,
  isAlphaNumericOnly,
  isAlphaOnly,
  allowedSpecialCharacters = "",
  dontAllowedSpecialCharacters = "",
  isAlphaNumericWithUnderscore,
  isDisabled,
  isCantPaste,
  ...props
}) => {
  const { field, formState } = useController({ control, name, defaultValue });

  if (!control) {
    return <TextField id="outlined-basic" variant="outlined" {...props} />;
  }

  const getAllowedPattern = () => {
    let allowedPattern = "a-zA-Z0-9";

    if (allowedSpecialCharacters) {
      allowedPattern += allowedSpecialCharacters.replace(
        /[-/\\^$*+?.()|%[\]{}]/g,
        "\\$&"
      );
    }

    if (dontAllowedSpecialCharacters) {
      const disallowedChars = dontAllowedSpecialCharacters.replace(
        /[-/\\^$*+?.()|%[\]{}]/g,
        "\\$&"
      );
      allowedPattern = allowedPattern.replace(
        new RegExp(`[${disallowedChars}\\s]`, "g"),
        ""
      );
    }

    return new RegExp(`^[${allowedPattern}\\s]+$`);
  };

  const handleKeyDown = (e) => {
    let allowedPattern;
    const allowedKeys = [
      "Tab",
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
    ];
    const alphanumericWithUnderscorePattern = /^[a-zA-Z0-9_]+$/;
    if (props.noSpaceAllowed && e.code === "Space") {
      e.preventDefault();
    }
    if (isNumericOnly) {
      allowedPattern = /^[0-9]+$/;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (isAlphaNumericOnly) {
      allowedPattern = /^[a-zA-Z0-9]+$/;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (isAlphaOnly) {
      allowedPattern = /^[a-zA-Z\s]+$/;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (allowedSpecialCharacters) {
      allowedPattern = getAllowedPattern();
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (isAlphaNumericWithUnderscore) {
      allowedPattern = alphanumericWithUnderscorePattern;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (dontAllowedSpecialCharacters) {
      const disallowedChars = dontAllowedSpecialCharacters.replace(
        /[-/\\^$*+?.()|%[\]{}]/g,
        "\\$&"
      );
      const pattern = new RegExp(`[${disallowedChars}\\s]`, "g");
      if (!allowedKeys.includes(e.key) && pattern.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
    let sanitizedData = pastedData;

    if (isCantPaste) {
      e.preventDefault();
      return;
    }

    if (props.noSpaceAllowed) {
      sanitizedData = sanitizedData.replace(/\s+/g, "");
    }

    if (allowedSpecialCharacters) {
      const specialChars = allowedSpecialCharacters
        ? allowedSpecialCharacters.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
        : "";
      const pattern = new RegExp(`[^a-zA-Z0-9${specialChars}\\s]`, "g");
      sanitizedData = pastedData.replace(pattern, "");
    }

    if (dontAllowedSpecialCharacters) {
      const dontAllowedChars = dontAllowedSpecialCharacters
        ? dontAllowedSpecialCharacters.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
        : "";
      const pattern = new RegExp(`[^a-zA-Z0-9${dontAllowedChars}\\s]`, "g");
      sanitizedData = pastedData.replace(pattern, "");
    }

    if (isAlphaOnly) {
      sanitizedData = sanitizedData.replace(/[^a-zA-Z\s]/g, "");
    }

    const { selectionStart, selectionEnd } = e.target;
    const value = e.target.value;
    
    // Check maxLength before creating newValue
    if (maxLength && (value.length - (selectionEnd - selectionStart) + sanitizedData.length) > maxLength) {
      sanitizedData = sanitizedData.substring(0, maxLength - (value.length - (selectionEnd - selectionStart)));
    }

    const newValue =
      value.substring(0, selectionStart) +
      sanitizedData +
      value.substring(selectionEnd);

    e.target.value = newValue;

    const newPosition = selectionStart + sanitizedData.length;
    e.target.setSelectionRange(newPosition, newPosition);

    field.onChange(e);
    e.preventDefault();
  };

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={titleClassName}>
          {props.title}
        </TextLabel>
      ) : null}
      <TextField
        id="outlined-basic"
        variant="outlined"
        error={!!formState.errors?.[name]}
        helperText={
          formState.errors?.[name]?.message ||
          (maxLength && showLength ? `Maksimal ${maxLength} Karakter` : "")
        }
        FormHelperTextProps={{
          style: {
            fontSize: "16px",
            marginLeft: 0,
          },
        }}
        size="small"
        className={"w-full " + className}
        disabled={isDisabled}
        onKeyDown={
          props.noSpaceAllowed ||
          isAlphaOnly ||
          isNumericOnly ||
          isAlphaNumericOnly ||
          isAlphaNumericWithUnderscore ||
          allowedSpecialCharacters ||
          dontAllowedSpecialCharacters
            ? handleKeyDown
            : null
        }
        onPaste={
          props.noSpaceAllowed ||
          isAlphaOnly ||
          isCantPaste ||
          allowedSpecialCharacters ||
          dontAllowedSpecialCharacters
            ? handlePaste
            : null
        }
        inputProps={{
          maxLength: maxLength,
        }}
        InputProps={{
          style: {
            borderRadius: "10px",
            backgroundColor: isDisabled ? "#FAFAFA" : "#FFFFFF",
          },
          endAdornment: !!formState.errors?.[name] && (
            <InputAdornment position="end" sx={{ paddingTop: "5px" }}>
              <span className="text-white">
                <IconInfo color="#E84040" isSmall />
              </span>
            </InputAdornment>
          ),
        }}
        {...props}
        {...field}
      />
    </div>
  );
};