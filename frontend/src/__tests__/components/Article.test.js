// @flow
import React from "react";
import Enzyme, { ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { wrapComponent } from "../../helpers/wrapper";
import type { NewParamsType } from "../../helpers/wrapper";
import Article from "../../libs/componentsOld/Article";

Enzyme.configure({ adapter: new Adapter() });

const props = {
  article: {
    date: "123",
    author: "123",
    title: "123",
    service: "123",
    isFavourite: "123"
  }
};

const setupArticleComponent = (newParams: NewParamsType = {}): ReactWrapper => {
  return wrapComponent(Article, newParams);
};

describe("Article", () => {
  it("Component renders properly", () => {
    expect(setupArticleComponent({ props: props }).length).toEqual(1);
  });

  it("Click on bookmark", () => {
    setupArticleComponent({ props: props })
      .childAt(1)
      .simulate("click");
  });
});
