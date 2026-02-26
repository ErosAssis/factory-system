import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Products from "../Products";
import axios from "axios";

vi.mock("axios");

test("renderiza título Products", async () => {

  axios.get.mockResolvedValue({ data: [] });

  render(<Products />);

  expect(await screen.findByText(/Products/i)).toBeInTheDocument();
});