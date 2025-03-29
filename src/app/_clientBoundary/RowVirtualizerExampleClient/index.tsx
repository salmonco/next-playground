"use client";

import { faker } from "@faker-js/faker";

import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

const ITEM_COUNT = 10000;
const ITEM_HEIGHT = 35;

const randomNumber = (min: number, max: number) =>
  faker.number.int({ min, max });

const sentences = new Array(ITEM_COUNT)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)));

export const RowVirtualizerExampleClient = () => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: ITEM_COUNT,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    initialRect: { width: 375, height: ITEM_HEIGHT * ITEM_COUNT },
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div ref={listRef}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${
              (items[0]?.start ?? 0) - virtualizer.options.scrollMargin
            }px)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
            >
              <hr />
              <strong>Row {item.index}</strong>
              <span>{sentences[item.index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
