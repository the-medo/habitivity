import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';
import styled from 'styled-components';

const StyledList = styled.ul`
  li {
    display: inline-block;
    line-height: 30px;
    position: relative;

    &:before {
      content: ' ';
      height: 0;
      width: 0;
      position: absolute;
      left: -2px;
      border-style: solid;
      border-width: 15px 0 15px 15px;
      border-color: transparent transparent transparent #fff;
      z-index: 0;
    }

    &:first-child:before {
      border-color: transparent;
    }
  }

  a:after {
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    right: -15px;
    border-style: solid;
    border-width: 15px 0 15px 15px;
    border-color: transparent transparent transparent #ccc;
    z-index: 10;
  }

  .active a {
    background: orange;
    z-index: 100;

    &:after {
      border-left-color: orange;
    }
  }

  a {
    display: block;
    background: #ccc;
    padding: 0 20px;
  }

  a:hover {
    background: pink;
  }

  a:hover:after {
    border-color: transparent transparent transparent pink;
  }
`;

const Test = styled.div`
  background: grey;
  display: flex;
  flex-direction: column;
  line-height: 30px;
  width: 100px;
  position: relative;
  border-radius: 0.5rem;

  &:after {
    content: ' ';
    background: grey;
    height: calc(21px + 0.414rem);
    width: calc(21px + 0.414rem);
    position: absolute;
    right: calc(-6px);
    top: 0.15rem;
    border-style: solid;
    //border-top-right-radius: 0.5rem;
    //border-top-left-radius: 0.5rem;
    //border-bottom-right-radius: 0.5rem;
    border-radius: 0.5rem;
    transform: rotate(45deg);
    //border-color: transparent transparent transparent grey;
    z-index: 10;
  }
`;

const DashboardOverview: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSubpage(DashboardSubpage.OVERVIEW));
  }, [dispatch]);

  return (
    <div>
      DashboardOverview
      <Test>Test</Test>
      <StyledList>
        <li>
          <a href="#">Foobar</a>
        </li>
        <li className="active">
          <a href="#">Foobar</a>
        </li>
        <li>
          <a href="#">Foobar</a>
        </li>
        <li>
          <a href="#">Foobar</a>
        </li>
        <li>
          <a href="#">Foobar</a>
        </li>
      </StyledList>
    </div>
  );
};

export default DashboardOverview;
