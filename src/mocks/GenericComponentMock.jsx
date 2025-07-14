import { vi } from "vitest";
/**@module  GenericComponentMock */

/**
 * GenericComponentMock is mock that simulate a generic react component
 * @returns {JSX.Element}
 */
const GenericComponentMock = vi.fn(() => {
  return <div></div>;
});

export default GenericComponentMock;
