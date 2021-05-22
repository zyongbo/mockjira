import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ProjectScreen } from "./screens/project";

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
  // const { logout, user } = useAuth();
  // const value: any = undefined;
  return (
    <Container>
      {/*Error Boundaries for uncaught errors*/}
      {/*{value.noExist}*/}
      {/*<PageHeader>*/}
      {/*  <button onClick={logout}>登出</button>*/}
      {/*</PageHeader>*/}
      {/*<Nav>Nav</Nav>*/}
      {/*<Header>*/}
      {/*  <HeaderLeft gap={true}>*/}
      {/*    /!*<HeaderItem>logo</HeaderItem>*!/*/}
      {/*    /!*<HeaderItem>项目</HeaderItem>*!/*/}
      {/*    /!*<HeaderItem>用户</HeaderItem>*!/*/}
      {/*    /!*<img src={softwareLogo} />*!/*/}
      {/*    <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />*/}
      {/*    <h3>项目</h3>*/}
      {/*    <h3>用户</h3>*/}
      {/*  </HeaderLeft>*/}
      {/*  <HeaderRight>*/}
      {/*    /!*<button onClick={logout}>登出</button>*!/*/}
      {/*    <Dropdown*/}
      {/*      overlay={*/}
      {/*        <Menu>*/}
      {/*          <Menu.Item>*/}
      {/*            /!*if there's no link, then it will give out warnings*!/*/}
      {/*            /!*<a onClick={logout}>登出</a>*!/*/}
      {/*            <Button type={"link"} onClick={logout}>*/}
      {/*              登出*/}
      {/*            </Button>*/}
      {/*          </Menu.Item>*/}
      {/*        </Menu>*/}
      {/*      }*/}
      {/*    >*/}
      {/*      <Button type={"link"} onClick={(e) => e.preventDefault()}>*/}
      {/*        Hi, {user?.name}*/}
      {/*      </Button>*/}
      {/*    </Dropdown>*/}
      {/*  </HeaderRight>*/}
      {/*</Header>*/}
      <PageHeader />
      <Main>
        {/*<ProjectListScreen />*/}
        {/*all the routes under router will share the same context, so router is to provide the context*/}
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
      {/*<Aside>Aside</Aside>*/}
      {/*<Footer>Footer</Footer>*/}
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header>
      <HeaderLeft gap={true}>
        {/*<HeaderItem>logo</HeaderItem>*/}
        {/*<HeaderItem>项目</HeaderItem>*/}
        {/*<HeaderItem>用户</HeaderItem>*/}
        {/*<img src={softwareLogo} />*/}
        <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        {/*<button onClick={logout}>登出</button>*/}
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                {/*if there's no link, then it will give out warnings*/}
                {/*<a onClick={logout}>登出</a>*/}
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

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
    "main main main"
    "footer footer footer";
  height: 100vh;
  //grid-gap: 10rem;
`;
// grid-area是用来给grid子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

// const Header = styled(Row)`
//   //padding: 3.2rem;
//   //box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
//   //z-index: 1;
// `;

const HeaderLeft = styled(Row)``;

// const HeaderLeft = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
// const Nav = styled.nav`
//   grid-area: nav;
// `;
// const Aside = styled.aside`
//   grid-area: aside;
// `;
// const Footer = styled.footer`
//   grid-area: footer;
// `;
