import React, { useState } from "react";
import { Skeleton } from "antd";

const CardSkeletion = (props) => {
  const [active, setActive] = useState(false);
  const [size, setSize] = useState("small");
  const [buttonShape, setButtonShape] = useState("round");
  const [avatarShape, setAvatarShape] = useState("circle");
  const handleActiveChange = (checked) => {
    setActive(checked);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleAvatarShape = (e) => {
    setAvatarShape(e.target.value);
  };
  return Array(props.boxNumber)
    .fill(0)
    .map((item, id) => {
      return (
        <div key={id}>
          <div className="btns">
            <button>
              <Skeleton.Avatar active size={size} shape={avatarShape} />
            </button>
            <button>
              <Skeleton.Avatar active size={size} shape={avatarShape} />
            </button>
          </div>
          <div className="loader order_item">
            <div className="top">
              <p className="badge">
                <Skeleton.Input active size={size} />
              </p>
              <span className="orderId">
                <Skeleton.Input active size={size} />
              </span>
              <span>
                <Skeleton.Input active size={size} />
              </span>
            </div>
            <div className="bottom">
              <ul>
                <li>
                  <i>
                    <Skeleton.Button active size={size} shape={buttonShape} />
                  </i>
                </li>
                <li>
                  <i>
                    <Skeleton.Button active size={size} shape={buttonShape} />
                  </i>
                </li>
                <li>
                  <i>
                    <Skeleton.Button active size={size} shape={buttonShape} />
                  </i>
                </li>
                <li>
                  <i>
                    <Skeleton.Button active size={size} shape={buttonShape} />
                  </i>
                </li>
                <li>
                  <i>
                    <Skeleton.Button active size={size} shape={buttonShape} />
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    });
};
export default CardSkeletion;
