import React from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
const Contact = () => {
 function sub(e) {
  e.preventDefault();
  alert("Thanks for contacting us.We will get back to you soon.");
  e.target.reset();
 }
  
  return (
       <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.629971364227!2d72.78262877510917!3d21.167119180516988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423b99085d26d1f9!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1717292038295!5m2!1sen!2sin"
  width="600"
  height="450"
  className="border-0 w-100"
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Sardar Vallabhbhai National Institute of Technology Location"
></iframe>

          </div>
          <div className="col-12 mt-5" class="wida1">
            <div className="contact-inner-wrapper d-flex justify-content-between " class="wida1" >
              <div>
          <br></br>
                <h3 className="contact-title mb-4">Contact</h3>
                <form action="" className="d-flex flex-column gap-15" onSubmit={sub}>
                  <div>
                    <input
                      type="text"
                      className="form-control my-1"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control my-1"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      className="form-control my-1"
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control my-1"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div>
                    <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 my-1' >Submit</button>
                  </div>
                </form>
              </div>
              <br></br>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center ">
                      <AiOutlineHome className="fs-5 mr-2" />
                      <address className="mb-0">
                        SVNIT,
                        Surat.
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5 mr-2" />
                      <a href="tel:+91 8340605194">+91 8340605194</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5 mr-2" />
                      <a href="mailto:ankit2022svnit@gmail.com">
                        ankit2022svnit@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5 mr-2" />
                      <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
    )
}

export default Contact
