import React from 'react'
import '../globals.css'
import Swal from 'sweetalert2'

const Contact = () => {
  
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "8ee2a40f-2f49-4fc8-a506-016b92d4c558");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Message sent!",
        icon: "success"
      });
    }
  };
  
  return (
    <section className="contact">
        <form onSubmit={onSubmit}>
            <h2>Contact Me!</h2>
            <div className="input-box">
                <label>Full Name</label>
                <input type='text' className='field' placeholder='Enter your name' name='name' required />
            </div>
            <div className="input-box">
                <label>Email Address</label>
                <input type='email' className='field' placeholder='Enter your email' name='email' required />
            </div>
            <div className="input-box">
                <label>Your Message</label>
                <textarea name="message" className='field mess' placeholder='Enter your message' required></textarea>
            </div>
            <button type='submit'>Send Message</button>
        </form>
    </section>
  )
}

export default Contact