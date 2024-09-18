const Button = ({ label, bgColor }) => {
  console.log("bgColor: ", bgColor);
  return (
    <div
      className={`ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 text-white ${
        bgColor + " hover:" + bgColor + "-600" || "bg-gray hover:bg-gray-100"
      }`}
    >
      <span className="text-sm font-medium">{label || "Button"}</span>
    </div>
  );
};

export default Button;
