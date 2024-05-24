import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const LoadingSpinner = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: #3498db;
  animation: ${spin} 2s linear infinite;

  &:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: #2ecc71;
    animation: ${spin} 1.5s linear infinite reverse;
  }
`;

const LoadingComponent = ({ isLoading }) => {
  return isLoading ? (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  ) : null;
};

export default LoadingComponent;
