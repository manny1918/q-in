import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function NewService() {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit =(e)=>{
    e.preventDefault()
  }

  return (
    <>
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
            <input type='text' id='serviceName' name='serviceName' onChange={(e)=>setServiceName(e.target.value)} value={serviceName} className='form-control' required />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input type='text' id='description' name='description' onChange={(e)=>setDescription(e.target.value)} value={description} className='form-control' />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
