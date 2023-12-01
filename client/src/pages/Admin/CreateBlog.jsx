import React, { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../redux/slices/blogSlice';
import Spinner from '../../components/Spinner';
import AdminLayout from '../../components/AdminLayout';

function CreateBlog() {
  // title, category, description, content, author
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state) => state.auth);
  // console.log(data._id);
  const dispatch = useDispatch();
  const [previwImage, setPreviewImage] = useState('');
  const [userInput, setUserInput] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    // author: data._id,
    image: '',
  });

  const inputUser = (e) => {
    const { value, name } = e.target;

    setUserInput((prev) => ({
      ...prev,
      [name]: value
    }));

  }

  const imageUpload = (e) => {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setUserInput((prev) => ({
        ...prev,
        image: uploadImage
      }));

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);

      fileReader.addEventListener('load', function () {
        setPreviewImage(this.result);
      })

    }
  }

  const descriptionContent = (data) => {
    setUserInput((prev) => ({
      ...prev,
      description: data
    }));
  }

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();

      formData.append("title", userInput.title);
      formData.append("category", userInput.category);
      formData.append("description", userInput.description);
      formData.append("content", userInput.content);
      formData.append("author", userInput.author);
      formData.append("image", userInput.image);

      const res = await dispatch(createBlog(formData));

      if (res?.payload?.success) {
        setUserInput({
          title: '',
          category: '',
          description: '',
          content: '',
          author: '',
          image: '',
        })

        setPreviewImage('');
      }

      setLoading(false);

    } catch (Error) {
      console.log(Error);
    }
  }

  return (
    <AdminLayout>
      <div className='flex items-center justify-center min-h-screen'>
        {
          loading
            ?
            (
              <Spinner />
            )
            :
            (
              <form onSubmit={onFormSubmit} className=''>
                <h2 className='text-3xl border-b-2 border-[#7f1657] text-[#7f1657] pb-2'>Create Blog</h2>
                <div className='grid lg:grid-cols-2 gap-3'>
                  <div className='col-span-1'>
                    <div className='my-3 flex flex-col gap-2'>
                      <label htmlFor='title'>Title<sup className='text-pink-400'>*</sup></label>
                      <input
                        type='text'
                        name='title'
                        id='title'
                        className='w-full py-3 px-3 rounded border outline-0'
                        value={userInput.title}
                        placeholder='Enter Blog Title'
                        onChange={inputUser}
                      />
                    </div>
                    <div className='my-3 flex flex-col gap-2'>
                      <label htmlFor='category'>Category<sup className='text-pink-400'>*</sup></label>
                      <input
                        type='text'
                        name='category'
                        id='category'
                        className='w-full py-3 px-3 rounded border outline-0'
                        value={userInput.category}
                        placeholder='Enter Blog Category'
                        onChange={inputUser}
                      />
                    </div>

                    <div className='my-3 flex flex-col gap-2'>
                      <label htmlFor='content'>Content<sup className='text-pink-400'>*</sup></label>
                      <input
                        type='text'
                        name='content'
                        id='content'
                        className='w-full py-3 px-3 rounded border outline-0'
                        value={userInput.content}
                        placeholder='Enter Blog Content'
                        onChange={inputUser}
                      />
                    </div>
                  </div>
                  <div className=''>
                    <div className='my-3 flex flex-col gap-2'>
                      <label htmlFor='description'>Description<sup className='text-pink-400'>*</sup></label>
                      <JoditEditor
                        type='text'
                        name='description'
                        id='description'
                        className='w-full py-3 px-3 rounded border outline-0 h-[200px] resize-none'
                        value={userInput.description}
                        placeholder='Enter Blog Description'
                        onChange={(data) => descriptionContent(data)}
                      />
                    </div>
                  </div>
                  {/* <div className='my-3 flex flex-col gap-2'>
            <label htmlFor='author'>Author<sup className='text-pink-400'>*</sup></label>
            <input
              type='text'
              name='author'
              id='author'
              className='w-full py-3 px-3 rounded border outline-0'
              value={userInput.author}
              placeholder='Enter Blog Author'
              onChange={inputUser}
            />
          </div> */}
                  <div className='w-full'>
                    {
                      previwImage ? (
                        <div className='w-full h-[200px] border-4 border-dotted'>
                          <img src={previwImage} className='w-full h-full object-contain' alt='Blog-Imgae' />
                        </div>
                      )
                        :
                        (
                          <>
                            <label htmlFor='image' className='inline-block border-dotted border-2 w-full h-[200px] cursor-pointer' >
                              <p className='flex items-center justify-center text-5xl w-full h-full'>
                                Image
                              </p>
                            </label>

                            <input
                              type="file"
                              id='image'
                              onChange={imageUpload}
                              className='hidden'
                            /></>
                        )
                    }
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='bg-red-400 text-xl w-[140px] inline-block text-white rounded h-[40px] mt-3 hover:bg-red-500 hover:scale-110 duration-300 ease-in-out transition-all'
                  >
                    Create Blog
                  </button>
                </div>
              </form>
            )
        }
      </div >
    </AdminLayout >
  )
}

export default CreateBlog