import React from 'react'
import Navbar from './Navbar'
import Link from "next/link"

// export interface Modal {
//     modal: boolean
// }

export default function UserModal({ modal }: { modal: boolean }): JSX.Element {
    const dn = modal ? "block" : "hidden"
    return (

        <div id='dropdownModal' className={`hidden mx-auto right-0 mt-2 w-60 z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark: bg-gray-700 dark: divide-gray-600`} aria-labelledby='dropBtn'>
            <div className="bg-white rounded overflow-hidden shadow-lg">
                <div className="text-center p-6 bg-gray-800 border-b">
                    <img src="profileImage.png" alt="Profile Icon" className="rounded-full object-cover h-full settingPro mx-auto" width={50} height={50} />
                    <p className="pt-2 text-lg font-semibold text-gray-50">Tamir Khuderbaatar</p>
                    <p className="text-sm text-gray-100">htamir80@gmail.com</p>
                    <div className="mt-5">
                        <a className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 cursor-pointer">
                            Manage your Account
                        </a>
                    </div>
                </div>
                <div className='border-b'>
                    <ul>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Chat</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Friends</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Privace and Policy</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Help center</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Settings</a>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <button className="w-full px-4 py-2 pb-4 bg-red-700 hover:bg-red-500 flex">
                        <p className="text-lg font-medium text-white leading-none mx-auto ps-auto"> Logout
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}
