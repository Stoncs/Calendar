import "@testing-library/jest-dom";
import "@testing-library/react";
import { render } from "@testing-library/react";
import "@testing-library/user-event";

import App from "./App";
describe('App component', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });
  test('it renders', () => {
    render(<App />);
  });
 })