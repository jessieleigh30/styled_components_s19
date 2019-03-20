import React from 'react';
import { Button, Segment, Card, Icon, Grid } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
import axios from 'axios';


class App extends React.Component {
  state = { repos: [], };

  componentDidMount() {
    //API rate limits and hot reloading do not mix
    //this.getRepos()  
  }

  getRepos = () => {
    axios.get('https://api.github.com/users/jessieleigh30/repos?sort=created')
      .then(res => this.setState({ repos: res.data }))
  }

  render() {
    return (
      <AppContainer>
        <Button onClick={this.getRepos}>Get Repos</Button>
        <HeaderText fsize="large">My Portfolio</HeaderText>
        <Segment as={Transparent}>
          <HeaderText>My Projects</HeaderText>
          <Grid>
            <Grid.Row>
              {this.state.repos.map(r =>
                <Grid.Column key={r.id} width={4}>
                  <StyledCard>
                    <Card.Content>
                      <Card.Header>
                        <Truncated>
                          {r.full_name}
                        </Truncated>
                      </Card.Header>
                      <Card.Meta>
                        {r.description}
                      </Card.Meta>
                      {r.stargazers_count > 0 &&
                        <Star>
                          <Icon name="star" />
                        </Star>
                      }
                    </Card.Content>
                    <Card.Content extra>

                      <ButtonLink href={r.html_url} target="_blank" rel="noopener norefferer">
                        View
                        </ButtonLink>

                    </Card.Content>
                  </StyledCard>
                </Grid.Column>
              )
              }
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment as={Transparent}>
          <HeaderText>Contact</HeaderText>
        </Segment>
      </AppContainer>
    )
  }
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`
const ButtonLink = styled.a`
  float: right;
  padding: 10px 30px;
  border-radius: 10px;
  color: ${ props => props.theme.fg} !important;
  background-color: ${ props => props.theme.bg};
`
const StyledCard = styled(Card)`
  height: 200px;`

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px 1px;
  animation: ${rotate360} 2s linear infinite;
`

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, black);
`
const Transparent = styled.div`
  background: transparent !important;
`
const HeaderText = styled.h1`
  color: white !important;
  text-align: center;
  font-size: ${props => fontSize(props.fSize)} !important;
`;
const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledButton = styled.div`
  display: flex;
  background: #312d2d;
  color: white;
  padding: 15px 25px;
  justify-content: center;
  transition: background 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: #606060;
    transition: background 0.2s ease;
  }
`;

const fontSize = (size) => {
  switch (size) {
    case 'large':
      return '40px';
    case 'small':
      return '25px';
    default:
      return '20px';
  }
}

export default App;
