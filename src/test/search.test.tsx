import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "../components/home/SearchBar";

const mockUseSearch = vi.fn();

vi.mock("../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

vi.mock("../hooks/useSearch", () => ({
  useSearch: () => mockUseSearch(),
}));

vi.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Search Logic Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("should navigate to search page with search query when form is submitted", async () => {
    renderWithRouter(<SearchBar />);

    const searchInput = screen.getByPlaceholderText("Search for developers...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "Adrian Berisha" } });

    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/search?search=Adrian%20Berisha"
    );
  });

  it("should navigate to search page without search parameter when query is empty", async () => {
    renderWithRouter(<SearchBar />);

    const searchButton = screen.getByText("Search");

    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/search");
  });

  it("should trim whitespace from search query before navigation", async () => {
    renderWithRouter(<SearchBar />);

    const searchInput = screen.getByPlaceholderText("Search for developers...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, {
      target: { value: "  Adrian Berisha  " },
    });

    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/search?search=Adrian%20Berisha"
    );
  });

  it("should properly encode special characters in search query", async () => {
    renderWithRouter(<SearchBar />);

    const searchInput = screen.getByPlaceholderText("Search for developers...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "C# & .NET Developer" } });

    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/search?search=C%23%20%26%20.NET%20Developer"
    );
  });
});
