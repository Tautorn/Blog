import React, { useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { FormStyled } from './style'
import { getFirstLastName } from '../../utils/string'

const initialValues = {
  name: '',
  email: ''
}

const NewsLetter = () => {

  const [form, setForm] = useState(initialValues)
  const [registered, setRegistered] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const name = getFirstLastName(form.name)
    
    addToMailchimp(form.email, { FNAME: name.first, LNAME: name.last })
      .then(() => setRegistered(true))
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const renderSigningUpMessage = (
    <div>
      <span className="title">{form.name}, obrigado por se inscrever!</span>
      <p className="subtitle">Você receberá meus artigos em sua caixa de entrada.</p>
    </div>
  )

  const renderForm = (
    <>
      <div>
        <label>Nome:</label>
        <input
          placeholder="Nome"
          name="name"
          type="text"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <label>E-mail:</label>
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Inscrever</button>
      </div>
    </>
  )

  return (
    <FormStyled
      onSubmit={handleSubmit}
    >
      <div className="Wrapper">
        <div className="row">
          <span className="title">Assine a NewsLetter</span>
          <p className="subtitle">Receba artigos como este na sua caixa de entrada.</p>
        </div>
        <div className="row">
          {!registered ? renderForm : renderSigningUpMessage}
        </div>
      </div>
    </FormStyled>
  )
}

export default NewsLetter