import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";

/**
 * grid and flex 各自的应用场景
 * 1. 要考虑，是以为布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      {/*<PageHeader>*/}
      {/*  <button onClick={logout}>登出</button>*/}
      {/*</PageHeader>*/}
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav>Nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>Aside</Aside>
      <Footer>Footer</Footer>
    </Container>
  );
};

// const PageHeader = styled.header`
//   background-color: gray;
//   height: 6rem;
// `

// const Main = styled.main`
//   height: (100vh - 6rem);
// `

// demo for grid
const Container = styled.div`
  // turn on grid
  display: grid;
  // header 6rem height, footer 6rem height, middle part is rest height
  grid-template-rows: 6rem 1fr 6rem;
  // left col width, right col width 20rem, rest is for middle
  grid-template-columns: 20rem 1fr 20rem;
  // header one row, footer one row
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;
// grid-area是用来给grid子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
