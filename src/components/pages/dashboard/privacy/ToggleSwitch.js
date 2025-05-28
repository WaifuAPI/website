// Reusable Toggle Switch Component
export default function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex justify-between items-center">
      <h6>
        {label} <br />
        <small className="text-gray-400">{description}</small>
      </h6>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-600 peer-focus:shadow-[0_0_10px_4px_rgb(59_130_246/0.7)] peer-checked:peer-focus:shadow-none transition-all rounded-full peer-checked:bg-blue-500 relative after:content-[''] after:absolute after:left-[2px] after:top-1/2 after:-translate-y-1/2 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
      </label>
    </div>
  );
}
