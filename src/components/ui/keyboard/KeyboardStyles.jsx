import React from "react";

export default function KeyboardStyles() {
  return (
    <style>{`
      .keycap {
        position: relative;
        display: inline-flex;
        border-radius: 6px;
        height: 40px;
        box-shadow:
          inset -2px 0 2px rgba(0, 0, 0, 0.2),
          inset 0 -3px 3px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(0, 0, 0, 0.7),
          2px 5px 8px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        transition: transform 0.05s ease-in-out, box-shadow 0.05s ease-in-out;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      .keycap::before {
        content: "";
        position: absolute;
        top: 2px;
        left: 3px;
        bottom: 8px;
        right: 6px;
        border-radius: 4px;
        box-shadow:
          -2px -2px 3px rgba(255, 255, 255, 0.05),
          2px 2px 3px rgba(0, 0, 0, 0.1);
        border-left: 1px solid rgba(255, 255, 255, 0.08);
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        border-top: 1px solid rgba(255, 255, 255, 0.15);
        transition: all 0.05s ease-in-out;
      }
      .key-white {
        background: #E4D7D7;
      }
      .key-white::before {
        background: #E4D7D7;
      }
      .key-white .keycap-label {
        color: #4a4a4b;
      }
      .key-dark-red {
        background-color : #9b72ff;
      }
      .key-dark-red::before {
         background-color : #9b72ff;
      }
      .key-dark-red .keycap-label {
        color: #f0f0f0;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      }
      .key-bright-red {
        background: #9b72ff;
      }
      .key-bright-red::before {
        background: #9b72ff;
      }
      .key-bright-red .keycap-label {
        color: #ffffff;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
      }
      .keycap-label {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
        font-size: 10px;
        font-weight: 500;
        line-height: 1.15;
        white-space: pre-wrap;
        transition: transform 0.05s ease-in-out;
        pointer-events: none;
      }
      .align-tl {
        align-items: flex-start;
        justify-content: flex-start;
        padding: 5px 7px;
        text-align: left;
      }
      .align-c {
        align-items: center;
        justify-content: center;
        padding: 4px;
        text-align: center;
      }
      .keycap-icon {
        margin-bottom: 2px;
      }
      .fkey-label {
        transform: translateY(-2px);
      }
      .keycap.pressed {
        transform: translateY(2px);
        box-shadow:
          inset -1px 0 1px rgba(0, 0, 0, 0.1),
          inset 0 -2px 2px rgba(0, 0, 0, 0.2),
          0 0 0 1px rgba(0, 0, 0, 0.7),
          1px 2px 4px rgba(0, 0, 0, 0.3);
      }
      .keycap.pressed::before {
        top: 3px;
        bottom: 6px;
      }
      .keycap.pressed .keycap-label {
        transform: translateY(1px);
      }
      .keycap.pressed .fkey-label {
        transform: translateY(-1px);
      }
    `}</style>
  );
}
