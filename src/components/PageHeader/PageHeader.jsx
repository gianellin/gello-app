import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

function PageHeader({ loggedUser, handleLogout, login,  }) {
  return (
    <Segment clearing>
      <Header as="h3" floated="right">
        <Link to="/">
          <Icon name="home" color="teal"></Icon>
        </Link>
        <Link to="" onClick={handleLogout} class="ui teal header" >
          Logout
        </Link>
        
      </Header>
      <Header as="h3" floated="left">
        <Link to={`/${loggedUser?.username}`}>
          <Image
            src={
              loggedUser?.photoUrl
                ? loggedUser?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
      </Header>
    </Segment>
  );
}

export default PageHeader;
