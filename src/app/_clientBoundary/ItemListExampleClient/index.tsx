"use client";

import { faker } from "@faker-js/faker";

const ITEM_COUNT = 10000;

const randomNumber = (min: number, max: number) =>
  faker.number.int({ min, max });

const sentences = new Array(ITEM_COUNT)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)));

export const ItemListExampleClient = () => {
  return (
    <>
      {sentences.map((sentence, index) => (
        <div key={index}>
          <hr />
          <strong>Row {index}</strong>
          <span>{sentence}</span>
        </div>
      ))}
    </>
  );
};
