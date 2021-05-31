import './index.css'

import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveToken } from '../../store/actions/sessionActions'
import { updateUser } from '../../store/actions/userActions'

import { login } from '../../services/auth'

import IconInput from '../../components/iconInput'
import Button from '../../components/button'
import Modal from '../../components/modal'

import { ReactComponent as UserIcon } from '../../assets/icons/user.svg'
import { ReactComponent as LockIcon } from '../../assets/icons/lock.svg'
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import Logo from '../../assets/img/logo.png'

export default function Login() {

  const history = useHistory()
  const dispatch = useDispatch()

  var [showPassword, setShowPassword] = useState(false)
  var [email, setEmail] = useState('')
  var [password, setPassword] = useState('')
  
  const [showModal, setShowModal] = useState()
  const [modalInfo, setModalInfo] = useState({})
  // const [loading, setLoading] = useState()
  
  const displayAlert = (content, title = 'Atenção', onConfirmation) => {
    setModalInfo({ title, content, onConfirmation })
    setShowModal(true)
    return
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onModalClose = () => {
    setShowModal(false)
  }

  const userLogin = async event => {
    event.preventDefault()
    console.log(email, password)
    const result = await login(email, password)
    if (!result) return displayAlert('Ocorreu algo inesperado. Tente novamente mais tarde.', 'Erro')

    if (result.success) {
      dispatch(saveToken(result.data.token))
      dispatch(updateUser(result.data.user))
      history.push('/user')
    } else {
      return displayAlert(result.feedback, 'Erro')
    }
  }

  return <div className="login-page">
    <div className="login-wrapper">
      <a href="/">
        <img className="login-logo" src={Logo} alt="logo" height={100}></img>
      </a>
      <form className="login-form" onSubmit={userLogin}>
        <div className="login-field">
          <IconInput type="text" 
            centralize
            textAlign="center"
            placeholder="Email" 
            value={email} onChange={e => setEmail(e.target.value)}
            left={<UserIcon width={20} color="#333"/>}>
          </IconInput>
        </div>
        <div className="login-field">
          <IconInput type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            centralize
            textAlign="center"
            value={password} onChange={e => setPassword(e.target.value)}
            left={<LockIcon width={20} color="#333"/>}
            right={
              <button className="button-simple" type="button" onClick={toggleShowPassword}>
                <EyeIcon width={20} color={showPassword ? '#333' : '#aaa'}/>
              </button>
            }>
          </IconInput>
        </div>
        <div className="login-field">
          <Button type='submit' title="ENTRAR" full></Button>
        </div>
        <div className="login-field">
          <div className="login-alternative">
            <Link to="/forgotten-password" className="login-alternative-link">Esqueceu a senha?</Link>
            <Link to="/signUp/0" className="login-alternative-link">Cadastre-se →</Link>
          </div>
        </div>
      </form>
    </div>
    <Modal active={showModal} onClose={onModalClose} onConfirmation={modalInfo.onConfirmation} title={modalInfo.title}>
      {modalInfo.content}
    </Modal>
  </div>
}