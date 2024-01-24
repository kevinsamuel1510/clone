import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const params = useParams();
  const { id } = params;

  const [values, setValues] = useState({
    name: '',
    description: '',
    category: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    fetch(`http://localhost:4000/api/hello/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setValues(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/api/hello/${id}`, values)
      .then(() => {
        navigate('/summary');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };
  const Navigatec = useNavigate()
    const handleCancel =() =>{Navigatec('/Summary')}

  return (
    <form className="create" onSubmit={handleSubmit}>
      <label>Product Name:</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={values.name}
      />
      <br />

      <label>Description:</label>
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={values.description}
      />
      <br />

      <label>Category:</label>
      <input
        type="text"
        name="category"
        onChange={handleChange}
        value={values.category}
      />
      <br />

      <label>Quantity:</label>
      <input
        type="number"
        name="quantity"
        onChange={handleChange}
        value={values.quantity}
      />
      <br />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        onChange={handleChange}
        value={values.price}
      />

      <button>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default Update;
