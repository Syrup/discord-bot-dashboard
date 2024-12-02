import React, { useCallback, useState } from "react";
import { Drawer, Navbar, Menu, Button } from "react-daisyui";

function MenuItem({ side }: { side?: boolean } = { side: false }) {
  const Item = (
    <>
      <Menu.Item>
        <a href="/" className="text-white">
          Home
        </a>
      </Menu.Item>
    </>
  );
  if (side) {
    return <Menu className="bg-base-200 min-h-full w-80 p-4">{Item}</Menu>;
  } else {
    <Menu horizontal>{Item}</Menu>;
  }
}

function PrimitiveNav({ content }: { content: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleOverlay = useCallback(
    () => setIsDrawerOpen(!isDrawerOpen),
    [isDrawerOpen]
  );

  return (
    <Drawer
      open={isDrawerOpen}
      onClickOverlay={toggleOverlay}
      // className="z-50"
      side={<MenuItem side />}
    >
      <div className="drawer-content flex flex-col">
        <Navbar className="bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <Button
              shape="square"
              color="ghost"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
          <Navbar.Start className="mx-2 flex-1 px-2">Navbar Title</Navbar.Start>
          <Navbar.End className="hidden lg:block">
            <MenuItem />
          </Navbar.End>
        </Navbar>
      </div>
      {content}
    </Drawer>
  );
}

export default PrimitiveNav;
