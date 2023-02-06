import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { useNavigate } from "react-router-dom";
// Since we want to make a request as a user about a user
// we need to import the userService
import userService from "../../utils/userService";

export default function SignUpPage({handleSignUpOrLogin}) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  const [error, setError] = useState("");


  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser from submitting the form, we will use fetch. We are using a SPA (single, page, app, no page reloads)


    // we have to convert our data into formData!
    // because a file/photo is being sent to the SERVER
    const formData = new FormData();
    formData.append("photo", selectedFile);

    // formData.append('username', state.username)
    // formData.append('email', state.email)
    for (let key in state) {
      formData.append(key, state[key]);
    }

	  // if you console.log(formData, ' <this won't yield anything useful')
    // to view the formData you need to loop over the object
    console.log(formData.forEach((item) => console.log(item)));

	try {
		
		await userService.signup(formData); 
		handleSignUpOrLogin(); 
		navigate('/')

	} catch(err){
		console.log(err.message, ' this is the error in signup')
		setError('Check your terminal, there was an error signing up')
	}

  
  }

  function handleChange(e) {
    setState({...state,[e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    // e.target.files is an array, we just want the first file uploaded to set in state
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid  textAlign="center" style={{ height: "100vh" }}
    verticalAlign="middle" >
      
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="https://imgur.com/Tmzpkdd.jpg" /> <br></br><br></br>
          Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              value={state.bio}
              placeholder="Tell us more about your dogs..."
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}


