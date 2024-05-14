import React from "react";

interface ElementComponentProps {
  label: string;
  url: string;
}

export function ElementComponent({ label, url }: ElementComponentProps) {
  return (
    <>
      <span>
        <a href={url}>{label}</a>
      </span>
    </>
  );
}
