const TagsInput = ({
  tags,
  setTags,
  inputValue,
  setInputValue,
  addTag,
  removeTag,
  handleSaveTagsData,
  handleClearTags,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex flex-wrap items-center border border-gray-300 p-2 rounded-md">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2 mb-2"
          >
            <span className="text-sm">{tag}</span>
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTag}
          placeholder="Add a tag and press Enter"
          className="flex-grow py-1 px-2 focus:outline-none"
        />
      </div>
      <button
        type="button"
        disabled={tags.length > 0}
        className="mt-2 flex float-right cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 text-white bg-gray-500 hover:bg-gray-500"
        onClick={handleClearTags}
      >
        Clear
      </button>
      <button
        type="button"
        className="mt-2 flex float-right cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 text-white bg-blue-500 hover:bg-blue-500"
        onClick={handleSaveTagsData}
      >
        Save
      </button>
    </div>
  );
};

export default TagsInput;
