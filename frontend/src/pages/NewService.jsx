import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, createService } from '../features/service/serviceSlice';
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton';

export default function NewService() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.service)

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/services')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createService({ serviceName, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Service</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>User name</label>
          <input type='text' id='name' name='name' value={name} className='form-control' disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' name='email' value={email} className='form-control' disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='serviceName'>Service Name</label>
            <input type='text' id='serviceName' name='serviceName' onChange={(e) => setServiceName(e.target.value)} value={serviceName} className='form-control' required />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input type='text' id='description' name='description' onChange={(e) => setDescription(e.target.value)} value={description} className='form-control' />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
