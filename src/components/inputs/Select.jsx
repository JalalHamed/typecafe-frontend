// Libraries
import Select from "react-select";

const CustomSelect = ({
  label,
  id,
  error,
  isMulti,
  isSearchable,
  closeMenuOnSelect,
  styles,
  options,
  placeholder,
  name,
  onChange,
  defaultValue,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`label no-select ${error ? "label-error" : ""}`}
      >
        {label}
      </label>
      <Select
        inputProps={{ id }}
        isMulti={isMulti}
        isSearchable={isSearchable}
        closeMenuOnSelect={closeMenuOnSelect}
        components={{
          IndicatorSeparator: () => null, // removes the seperator bar
        }}
        styles={styles}
        name={name}
        options={options}
        placeholder={placeholder}
        theme={theme => ({
          ...theme,
          borderRadius: "5px",
          colors: {
            ...theme.colors,
            neutral20: "#1c3987",
            neutral30: "#1c3987",
            primary75: "#1c3987",
            primary: "#1c3987",
            neutral60: "#1c3987",
            neutral80: "#000",
          },
        })}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default CustomSelect;
