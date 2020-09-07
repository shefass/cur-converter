import React, { useState } from "react";
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Index = ({
  leftInvalid,
  rightInvalid,
  leftButton,
  rightButton,
  leftValue,
  rightValue,
  leftHendler,
  rightHendler,
  leftDropdownHandler,
  rightDropdownHandler,
  leftButtonName,
  rightButtonName,
  currencies,
}) => {
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);
  const [splitButtonOpen2, setSplitButtonOpen2] = useState(false);

  const toggleSplit2 = () => setSplitButtonOpen2(!splitButtonOpen2);
  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to currencies converter!</p>
        <div className="Converter">
          <InputGroup>
            <InputGroupButtonDropdown
              addonType="prepend"
              isOpen={splitButtonOpen}
              toggle={toggleSplit}
            >
              <Button color="secondary">{leftButton}</Button>
              <DropdownToggle split color="secondary" />
              <DropdownMenu
                modifiers={{
                  setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                      return {
                        ...data,
                        styles: {
                          ...data.styles,
                          overflow: "auto",
                          maxHeight: "200px",
                        },
                      };
                    },
                  },
                }}
              >
                <DropdownItem header>Select currency</DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  value="EUR"
                  onClick={(value) => leftDropdownHandler(value)}
                >
                  EUR
                </DropdownItem>
                {currencies !== ""
                  ? currencies.map((a) => (
                      <DropdownItem
                        key={a.ticker}
                        value={a.ticker}
                        onClick={(value) => leftDropdownHandler(value)}
                      >
                        {a.ticker}
                      </DropdownItem>
                    ))
                  : null}
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input
              placeholder={"Enter here" + (leftButtonName ? ", " + leftButtonName : "")}
              value={leftValue}
              onChange={(value) => leftHendler(value)}
              invalid={leftInvalid}
            />
            <Input
              placeholder={"Enter here" + (rightButtonName ? ", " + rightButtonName : "")}
              value={rightValue}
              onChange={(value) => rightHendler(value)}
              invalid={rightInvalid}
            />
            <InputGroupButtonDropdown
              addonType="append"
              isOpen={splitButtonOpen2}
              toggle={toggleSplit2}
            >
              <Button color="secondary">{rightButton}</Button>
              <DropdownToggle split color="secondary" />
              <DropdownMenu
                modifiers={{
                  setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                      return {
                        ...data,
                        styles: {
                          ...data.styles,
                          overflow: "auto",
                          maxHeight: "200px",
                        },
                      };
                    },
                  },
                }}
              >
                <DropdownItem header>Select currency</DropdownItem>
                <DropdownItem divider />
                {currencies !== ""
                  ? currencies.map((a) => (
                      <DropdownItem
                        key={a.ticker}
                        value={a.ticker}
                        onClick={(value) => rightDropdownHandler(value)}
                      >
                        {a.ticker}
                      </DropdownItem>
                    ))
                  : null}
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </InputGroup>
        </div>
      </header>
    </div>
  );
};

export default Index;
