import React, { useEffect } from 'react'

export default function Confirmation(props) {

  const message = props.message;
  const event = props.event;

  const yesClicked = () => {
    props.yesClicked();
  }

  const noClicked = () => {
    props.noClicked();
  }

  useEffect(() => {
    document.body.classList.add('disabled-scroll');
    return () => {
      document.body.classList.remove('disabled-scroll');
    };
  }, [])

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center flex-col z-[999]'>
      <div className='h-auto py-2 px-4 bg-white text-black border border-gray-300 rounded-lg text-center max-w-[300px] md:max-w-[400px]'>
        {event === 'logout' && <i className='text-6xl bx bx-log-out pr-3 mt-5'></i>}
        {(event === 'remove-moderators' || event === 'delete-product') && <i className='text-6xl bx bx-trash mt-5'></i>}
        {event === 'add-moderators' && <i className='text-6xl bx bx-message-alt-add mt-5'></i>}
        <p className='small-headings'>{message}</p>
        <div className='flex justify-center items-center my-5'>
          <button onClick={noClicked} className='my-btns m-2'>No, Go Back.</button>
          <button onClick={yesClicked} className='my-btns m-2'>Yes, Continue.</button>
        </div>
      </div>
    </div>
  )
}
