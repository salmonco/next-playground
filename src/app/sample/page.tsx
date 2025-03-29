// import { ItemListExampleClient } from "../_clientBoundary/ItemListExampleClient";
import { RowVirtualizerExampleClient } from "../_clientBoundary/RowVirtualizerExampleClient";

export default function Sample() {
  return (
    <>
      <p>
        {`In many cases, when implementing a virtualizer with a window as the
  scrolling element, developers often find the need to specify a
  "scrollMargin." The scroll margin is a crucial setting that defines the
  space or gap between the start of the page and the edges of the list.`}
      </p>
      <br />
      <br />
      <h3>Window scroller</h3>
      {/* <ItemListExampleClient /> */}
      <RowVirtualizerExampleClient />
      <br />
      <br />
      {process.env.NODE_ENV === "development" ? (
        <p>
          <strong>Notice:</strong> You are currently running React in
          development mode. Rendering performance will be slightly degraded
          until this application is built for production.
        </p>
      ) : null}
    </>
  );
}
