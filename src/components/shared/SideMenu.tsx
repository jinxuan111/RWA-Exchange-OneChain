"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useColorMode,
  useDisclosure,
  VStack,
  Badge,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
// import { useOneChainWallet } from "@/hooks/useOneChainWallet";  // 👈 注释掉
// import { OneChainWalletButton } from "./OneChainWallet";       // 👈 注释掉

export function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();
  // const { 
  //   isConnected, 
  //   account, 
  //   disconnect 
  // } = useOneChainWallet();  // 👈 注释掉

  return (
    <>
      <Button
        display={{ lg: "none", base: "block" }}
        ref={btnRef}
        onClick={onOpen}
      >
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Button height="56px" w="56px" onClick={toggleColorMode} mr="10px">
              {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {/* 导航链接 - 包含 Create Property */}
              <Link href="/" _hover={{ textDecoration: "none" }} onClick={onClose}>
                <Button variant="ghost" w="full" justifyContent="flex-start">
                  Home
                </Button>
              </Link>
              
              <Link href="/collection" _hover={{ textDecoration: "none" }} onClick={onClose}>
                <Button variant="ghost" w="full" justifyContent="flex-start">
                  Marketplace
                </Button>
              </Link>
              
              {/* ✅ 添加 Create Property 链接 */}
              <Link href="/create-property" _hover={{ textDecoration: "none" }} onClick={onClose}>
                <Button variant="ghost" w="full" justifyContent="flex-start">
                  Create Property
                </Button>
              </Link>
              
              <Link href="/dashboard" _hover={{ textDecoration: "none" }} onClick={onClose}>
                <Button variant="ghost" w="full" justifyContent="flex-start">
                  Dashboard
                </Button>
              </Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            {/* Disconnect 按钮已移除 */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}