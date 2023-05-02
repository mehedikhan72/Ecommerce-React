import React from 'react'

export default function Confirmation(props) {

  const message = props.message;

  const yesClicked = () => {
    props.yesClicked();
  }

  const noClicked = () => {
    props.noClicked();
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center flex-col z-50'>
      <div className='h-auto py-2 px-4 bg-white text-black border border-gray-300 rounded-lg text-center max-w-[300px] md:max-w-[400px]'>
        <p className='small-headings'>{message}</p>
        <div className='flex justify-center items-center my-5'>
          <button onClick={noClicked} className='my-btns m-2'>No, Go Back.</button>
          <button onClick={yesClicked} className='my-btns m-2'>Yes, Continue.</button>
        </div>
      </div>
    </div>
  )
}
