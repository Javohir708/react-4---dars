import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'sonner'
import maleImage from "../../assets/male.png"
import femaleImage from "../../assets/female.png"

const Hero = () => {
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const ageRef = useRef(null)
  const professionRef = useRef(null)
  const genderRef = useRef(null)
  const bioRef = useRef(null)

  const [data, setData] = useState([])
  const [edit, setEdit] = useState(null)

  const handleSubmit = (event) => {
      event.preventDefault()
      
      if (!firstNameRef.current.value || !lastNameRef.current.value || !ageRef.current.value || !professionRef.current.value || !genderRef.current.value || !bioRef.current.value) {
        return toast.warning("Barcha maydonlarni to'ldiring!")
      }
      
      
      if (edit) {
        console.log(firstNameRef.current.value)
        setData(prev => prev.map((item) =>
          item.id === edit.id
            ? {
                ...item,
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                age: ageRef.current.value,
                profession: professionRef.current.value,
                gender: genderRef.current.value.toLowerCase(),
                bio: bioRef.current.value,
            } : item
        ))
        setEdit(null)
      } else {
        const post = {
          id: uuidv4(),
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          age: ageRef.current.value,
          profession: professionRef.current.value,
          gender: genderRef.current.value.toLowerCase(),
          bio: bioRef.current.value,
        }
        setData(prev => ([...prev, post]))
      }
      firstNameRef.current.value = ""
        lastNameRef.current.value = ""
        ageRef.current.value = ""
        professionRef.current.value = ""
        genderRef.current.value = ""
        bioRef.current.value = ""
    }
    
    const handleDelete = (id) => {
        setData(prev => prev.filter((item) => item.id !== id))
    }
    
    const handleEdit = (item) => {
        firstNameRef.current.value = item.firstName
        lastNameRef.current.value = item.lastName
        ageRef.current.value = item.age
        professionRef.current.value = item.profession
        genderRef.current.value = item.gender
        bioRef.current.value = item.bio
        setEdit(item)
  }

  return (
    <>
      <aside className="w-64 bg-gray-500 text-gray-900 p-4 fixed top-0 left-0 h-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input ref={firstNameRef} type="text" placeholder="First Name" className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input ref={lastNameRef} type="text" placeholder="Last Name" className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input ref={ageRef} type="number" placeholder="Age" className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input ref={professionRef} type="text" placeholder="Profession" className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input ref={genderRef} type="text" placeholder="Gender: male or female" className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input ref={bioRef} type="text" placeholder="Bio" className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 duration-300">{edit ? "Save" : "Create"}</button>
        </form>
      </aside>

      <div className="ml-72 mt-3 grid grid-cols-4">
        {data?.map((item) => (
          <div key={item.id} className="w-72 p-3 shadow-md text-center rounded">
            <img src={item.gender === "male" ? maleImage : femaleImage} alt={item.gender} className="w-24 h-24 mx-auto rounded-full" />
            <h2 className="font-bold mt-1 mb-3">{item.firstName} {item.lastName}</h2>
            <h3 className="font-medium">Age: {item.age}</h3>
            <h3 className="font-medium">Profession: {item.profession}</h3>
            <p className="mt-3 mb-3"><i>{item.bio}</i></p>
            <div className="flex items-center justify-center gap-5">
              <button onClick={() => handleDelete(item.id)} className="p-1 bg-red-500 mt-2 rounded-md text-[#fff] text-[14px]">Delete</button>
              <button onClick={() => handleEdit(item)} className="p-1 bg-indigo-600 mt-2 rounded-md text-[#fff] text-[14px]">Edit</button>
            </div>
          </div>
        ))}
      </div>

      <Toaster />
    </>
  )
}

export default Hero
