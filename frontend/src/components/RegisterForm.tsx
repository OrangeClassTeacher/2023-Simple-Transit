import React, { useState, useContext } from 'react'
import axios from "axios"
import Utils from '@/utils/utils'
import { useRouter } from 'next/router'
import { Context } from '@/utils/Context'

export default function RegisterForm(): JSX.Element {
    const { selectedLocation } = useContext(Context)
    const route = useRouter()
    const [name, setName] = useState<any>("")
    const [email, setEmail] = useState<any>("")
    const [password, setPassword] = useState<any>("")
    const [password2, setPassword2] = useState<any>("")
    const [image, setImage] = useState<any>("")
    // const [passwordRequirements, setPasswordRequirements] = useState([
    //     {
    //         title: "Хамгийн багадаа 8 тэмдэгттэй байх",
    //         state: false,
    //         regex: new RegExp("(?=.{8,})"),
    //     },
    //     {
    //         title: "Дор хаяж 1 том үсэг орсон байх",
    //         state: false,
    //         regex: new RegExp("(?=.*[A-Z])"),
    //     },
    //     {
    //         title: "Дор хаяж 1 жижиг үсэг орсон байх",
    //         state: false,
    //         regex: new RegExp("(?=.*[a-z])"),
    //     },
    //     {
    //         title: "Дор хаяж 1 тоо орсон байх",
    //         state: false,
    //         regex: new RegExp("(?=.*[0-9])"),
    //     },
    //     {
    //         title: "Дор хаяж 1 тусгай тэмдэгт орсон байх",
    //         state: false,
    //         regex: new RegExp("(?=.*[^A-Za-z0-9])"),
    //     },
    // ]);
    function handleSignup(): any {
        if (name == "" || password == "" || password2 == "" || email == "") {
            alert("Утга оруулна уу!")
            return
        }
        {
            if (selectedLocation && password == password2) {

                axios.post(`${Utils.API_URL}/user/signup`, { name: name, password: password, email: email, image: image, location: selectedLocation })
                    .then(res => {
                        if (res.data.status == true && image != "") {
                            alert("Бүртгэл амжилттай")
                            route.push("/page1")
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert("Бүртгүүлэхэд алдаа гарлаа")
                    })
            } else {
                alert("Бүртгүүлэхэд алдаа гарлаа")
            }
        }


    }

    return (
        <div className='flex'>
            <div className='regContainer self-center'>
                <div className='mainItem'>
                    <div className='regForm'>

                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">И-мэйл хаяг</label>
                            <input
                                value={email}
                                onChange={(e): any => setEmail(e.target.value)}
                                type="email"
                                name="floating_email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="И-мэйл хаягаа оруулна уу." required />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Нууц үг</label>
                            <input
                                value={password}
                                onChange={(e): any => setPassword(e.target.value)}
                                type="password" name="floating_password" id="floating_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Нууц үгээ оруулна уу." required />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Нууц үг баталгаажуулалт</label>
                            <input
                                value={password2}
                                onChange={(e): any => setPassword2(e.target.value)}
                                type="password" name="repeat_password" id="floating_repeat_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Нууц үгээ дахин оруулна уу" required />
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Хэрэглэгчийн нэр</label>
                                <input
                                    value={name}
                                    onChange={(e): any => setName(e.target.value)}
                                    type="text" name="floating_first_name" id="floating_first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Хэрэглэгчийн нэр" required />
                            </div>
                            {/* <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div> */}
                        </div>
                        {/* <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                    </div>
                </div> */}
                        <div>
                            <label>Зураг оруулна уу </label>
                            <input onChange={(e: any): any => {
                                console.log(e.target.value);
                                const url = "https://api.cloudinary.com/v1_1/dlwizyzqi/upload"

                                const formData = new FormData()
                                let file = e.target.files[0]
                                formData.append("file", file)
                                formData.append("api_key", "796678243292196")
                                formData.append("folder", "project")
                                formData.append("upload_preset", "sdvojfor")

                                axios.post(url, formData)
                                    .then((res) => {
                                        console.log(res);
                                        setImage(res.data.secure_url)

                                    }
                                    )
                            }}
                                type="file"
                            />
                        </div>
                        <button
                            onClick={(): any => handleSignup()}
                            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Бүртгүүлэx</button>

                        <button onClick={() => route.push("/page1")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Буцаx
                        </button>
                    </div>

                </div>
                <div className='adItem'>
                    <div className='sideAd rounded-bl-2xl flex flex-col'>
                        <img className='logoImg' src="/logo.png" alt="logo" />
                        <h1 className='text-white logText'>Easy ways to drive</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
