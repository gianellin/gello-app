import { set } from "mongoose";
import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

function AddMovieForm({handleAddMovie}) {

  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null)

  function handleChange(e){
	setTitle(e.target.value)
  }

  function handleFileInput(e){
	setPhoto(e.target.files[0])
  }

  function handleSubmit(event){
	event.preventDefault();

	// we have to make form data because we are sending over a photo
	// to our express server
	const formData = new FormData()
	formData.append('title', title);
	formData.append('photo', photo)
	handleAddMovie(formData)
  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="title"
          value={title}
          placeholder="What is the movie title?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          type="file"
          name="photo"
          placeholder="movie poster"
          onChange={handleFileInput}
        />
        <Button type="submit" className="btn">
          ADD MOVIE
        </Button>
      </Form>
    </Segment>
  );
}

export default AddMovieForm;
