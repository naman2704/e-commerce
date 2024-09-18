import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createCategories,
  /* createCategories, */
  getAllCategories,
} from "../Redux/slices/categorySlice";
import TagsInput from "./TagsInput";
import { toast } from "react-toastify";
/* import { toast } from "react-toastify"; */

const EditCategories = () => {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  const saveTagsData = () => {
    dispatch(createCategories(tags))
      .unwrap()
      .then((res) => {
        console.log(res);
        const { status, message } = res;
        if (status === 1) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      });
  };
  const clearTagsData = () => {
    dispatch(createCategories([]))
      .unwrap()
      .then((res) => {
        if (res?.status === 1) {
        }
      });
  };
  useEffect(() => {
    dispatch(getAllCategories())
      .unwrap()
      .then((res) => {
        if (res?.status === 1 && res?.categories[0]?.categories?.length > 0) {
          setTags(res?.categories[0]?.categories);
          console.log("res.categories: ", res?.categories[0]?.categories);
        }
      });
  }, []);
  return (
    <section>
      <div className="flex flex-col items-center justify-center mt-20">
        <header className="text-2xl font-bold text-center my-6">
          Categories
        </header>
        <TagsInput
          tags={tags}
          setTags={setTags}
          addTag={addTag}
          removeTag={removeTag}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSaveTagsData={saveTagsData}
        />
      </div>
    </section>
  );
};

export default EditCategories;
